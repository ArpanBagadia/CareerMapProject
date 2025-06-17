import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 cursor-pointer"
      onClick={() => navigate(`/student/course/${course._id}`)}
    >
      <img
        src={course.image || "/default-course.jpg"}
        alt={course.title}
        className="w-full h-40 object-cover rounded"
      />
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-2">By {course.tutorName || "Unknown"}</p>
        <p className="text-gray-800 font-bold">₹{course.price}</p>
        <div className="text-yellow-500 text-sm">⭐ {course.rating || 0}</div>
      </div>
    </div>
  );
};

export default CourseCard;
