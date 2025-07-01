import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/all-courses")
      .then(res => setCourses(res.data.courses))
      .catch(err => console.error("Error fetching courses", err));
  }, []);

  const handleCardClick = (courseId) => {
    navigate(`/student/course/${courseId}`);
  };
  
  return (
    <div className="p-8 bg-[#e9fbff] min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {courses.map(course => (
          <div
            key={course._id}
            onClick={() => handleCardClick(course._id)}
            className="bg-white rounded-lg shadow-2xl hover:shadow-lg cursor-pointer transition-all duration-300"
          >
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-44 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
              <p className="text-sm text-gray-500">
                Course by {course.tutorId?.name || 'Unknown'}
              </p>
              <p className="text-md font-bold text-gray-700 mt-1">₹{course.price}</p>

              {/* Rating Section */}
              <div className="flex items-center mt-2">
                <div className="text-yellow-400 text-sm mr-2">
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i}>{i < Math.round(course.averageRating) ? '★' : '☆'}</span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({course.averageRating.toFixed(1)})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
