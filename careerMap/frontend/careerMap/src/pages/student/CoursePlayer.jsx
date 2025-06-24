// src/pages/student/CoursePlayer.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CoursePlayer = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [playbackRate, setPlaybackRate] = useState(1);

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

  if (!course) return <p className="p-6 text-gray-500">Loading course...</p>;

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col md:flex-row">
      
      {/* Left: Course Info */}
      <div className="w-full md:w-1/2 p-6 space-y-6 border-r border-gray-300">
        <h1 className="text-3xl font-bold text-blue-800">{course.title}</h1>
        <p className="text-md text-gray-600">{course.subtitle}</p>
        <p className="text-sm text-gray-500">Category: {course.category}</p>
        <p className="text-sm text-gray-500">Level: {course.level}</p>

        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Course Details</h2>
          <div className="bg-gray-100 rounded shadow divide-y divide-gray-200">
            <details className="p-4 cursor-pointer">
              <summary className="font-medium">Description</summary>
              <p className="mt-2 text-sm text-gray-600">{course.description}</p>
            </details>
          </div>
        </div>
      </div>

      {/* Right: Video Player */}
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
