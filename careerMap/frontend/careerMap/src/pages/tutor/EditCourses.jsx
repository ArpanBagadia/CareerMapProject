import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { toast } from 'react-toastify';

function EditCourses() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: '',
    level: '',
    price: '',
    description: ''
  });

  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [previewVideo, setPreviewVideo] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/get-course/${courseId}`);
        const course = res.data.course;
        setFormData({
          title: course.title,
          subtitle: course.subtitle,
          category: course.category,
          level: course.level,
          price: course.price,
          description: course.description
        });
        setPreviewImage(course.imageUrl);
        setPreviewVideo(course.videoUrl);
      } catch (err) {
        toast.error("Failed to load course");
        console.error(err);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleDescriptionChange = (value) => {
    setFormData(prev => ({ ...prev, description: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); 

      const tutorId = localStorage.getItem('tutorId');
      const data = new FormData();
      data.append('tutorId', tutorId);
      data.append('title', formData.title);
      data.append('subtitle', formData.subtitle);
      data.append('category', formData.category);
      data.append('level', formData.level);
      data.append('price', formData.price);
      data.append('description', formData.description);
      if (image) data.append('image', image);
      if (video) data.append('video', video);

      await axios.put(`http://localhost:5000/api/update-course/${courseId}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success("Course updated successfully!");
      navigate('/tutor/showcourses');
    } catch (err) {
      toast.error("Error updating course.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex">
      <Sidebar />
      {loading && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white px-6 py-4 rounded-lg shadow-lg text-center">
            <div className="loader mb-3 mx-auto border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
            <p className="text-gray-700 font-medium">Updating Course...</p>
          </div>
        </div>
      )}
      <main className="flex-1 p-6 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Edit Course</h1>
        <form onSubmit={handleUpdate} className="space-y-4 max-w-3xl">

          <div>
            <label className="block text-gray-700 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Level</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Course Image</label>
            {previewImage && <img src={previewImage} alt="Current" className="w-40 h-24 object-cover mb-2" />}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Course Video</label>
            {previewVideo && (
              <video controls className="w-60 mb-2">
                <source src={previewVideo} type="video/mp4" />
              </video>
            )}
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <ReactQuill
              value={formData.description}
              onChange={handleDescriptionChange}
              theme="snow"
              className="bg-white text-black"
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
          >
            Update Course
          </button>
        </form>
      </main>
    </div>
  );
}

export default EditCourses;
