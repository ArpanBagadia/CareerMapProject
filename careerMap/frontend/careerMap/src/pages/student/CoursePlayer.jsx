import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // get logged-in user ID

const CoursePlayer = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [selectedRating, setSelectedRating] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/get-course/${courseId}`)
      .then(res => setCourse(res.data.course))
      .catch(err => console.error("Error fetching course:", err));
  }, [courseId]);

  const handleSpeedChange = (e) => {
    const video = document.getElementById("courseVideo");
    const speed = parseFloat(e.target.value);
    video.playbackRate = speed;
    setPlaybackRate(speed);
  };

  const handleRatingSubmit = () => {
    if (!user?.user?.id) return alert("You must be logged in");

    axios.post(`http://localhost:5000/api/rate-course/${courseId}`, {
      userId: user.user.id,
      rating: selectedRating
    })
      .then(res => {
        alert("Rating submitted!");
        setCourse(prev => ({ ...prev, averageRating: res.data.averageRating }));
      })
      .catch(err => console.error("Rating error:", err));
  };

  if (!course) return <p className="p-6 text-gray-500">Loading course...</p>;

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-1/2 p-6 space-y-6 border-r border-gray-300">
        <h1 className="text-3xl font-bold text-blue-800">{course.title}</h1>
        <p className="text-md text-gray-600">{course.subtitle}</p>
        <p className="text-sm text-gray-500">Category: {course.category}</p>
        <p className="text-sm text-gray-500">Level: {course.level}</p>
        <p className="text-sm text-yellow-600">
          Average Rating: ⭐ {course.averageRating?.toFixed(1) || "N/A"}
        </p>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Course Details</h2>
          <div className="bg-gray-100 rounded shadow divide-y divide-gray-200">
            <details className="p-4 cursor-pointer">
              <summary className="font-medium">Description</summary>
              <div
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: course.description }}
              />
            </details>
          </div>
        </div>

        {/* Rating */}
        <div className="mt-4">
          <h3 className="font-medium text-gray-700 mb-1">Rate this course:</h3>
          <div className="flex space-x-1 text-yellow-400 text-2xl">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setSelectedRating(num)}
                className={selectedRating >= num ? 'text-yellow-400' : 'text-gray-300'}
              >
                ★
              </button>
            ))}
          </div>
          <button
            onClick={handleRatingSubmit}
            className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Submit Rating
          </button>
        </div>
      </div>

      {/* Right: Video */}
      <div className="w-full md:w-1/2 p-6 flex flex-col items-center justify-center">
        <video
          id="courseVideo"
          src={course.videoUrl}
          controls
          className="rounded-xl shadow-xl w-full max-h-[75vh] object-contain"
        />
        <div className="mt-4">
          <label className="text-black text-sm mr-2">Playback Speed:</label>
          <select
            value={playbackRate}
            onChange={handleSpeedChange}
            className="px-2 py-1 rounded text-sm bg-white text-black"
          >
            <option value="0.5">0.5x</option>
            <option value="1">1x (Normal)</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
