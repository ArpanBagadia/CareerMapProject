import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { toast } from 'react-toastify';

function TutorCourse() {
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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !video) {
      toast.error("Please upload both image and video!");
      return;
    }

    try {
      const tutorId = localStorage.getItem('tutorId');
      const data = new FormData();
      data.append('tutorId', tutorId);
      data.append('title', formData.title);
      data.append('subtitle', formData.subtitle);
      data.append('category', formData.category);
      data.append('level', formData.level);
      data.append('price', formData.price);
      data.append('description', formData.description);
      data.append('image', image);
      data.append('video', video);

      const res = await axios.post('http://localhost:5000/api/upload-course', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success("Course added successfully!");
      console.log(res.data);

      // ✅ Reset form fields
      setFormData({
        title: '',
        subtitle: '',
        category: '',
        level: '',
        price: '',
        description: ''
      });
      setImage(null);
      setVideo(null);
      document.getElementById('imageInput').value = '';
      document.getElementById('videoInput').value = '';
    } catch (err) {
      toast.error("Error uploading course.");
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Add New Course</h1>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
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
            <label className="block text-gray-700 font-medium">Price (in ₹)</label>
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
            <label className="block text-gray-700 font-medium">Upload Thumbnail Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border p-2 rounded"
              required
              id="imageInput"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Upload Course Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              className="w-full border p-2 rounded"
              required
              id="videoInput"
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
          >
            Add Course
          </button>
        </form>
      </main>
    </div>
  );
}

export default TutorCourse;
