import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/all-courses")
      .then(res => {
        setCourses(res.data.courses);
      })
      .catch(err => {
        console.error("Error fetching courses", err);
      });
  }, []);

  const handleCardClick = (courseId) => {
    navigate(`student/course/${courseId}`);
  };

  return (
    <div className="p-8">
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
            <div className="p-4 text-left">
              <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
              <p className="text-sm text-gray-500">GreatStack</p>
              <p className="text-md font-bold text-gray-800 mt-1">₹{course.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
