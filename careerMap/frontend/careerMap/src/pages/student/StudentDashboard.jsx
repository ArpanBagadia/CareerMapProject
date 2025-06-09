import { useEffect, useState } from "react";
import axios from "axios";
import { toast,ToastContainer  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentDashboard = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/all-courses")
            .then(res => {
                setCourses(res.data.courses);
            })
            .catch(err => {
                console.error("Error fetching courses", err);
            });
    }, []);

    const handleEnroll = (courseId) => {
        const token = localStorage.getItem("token");
        console.log(token)
        if (!token) {
            toast.error("Please log in to enroll.");
            return
        }
        // Placeholder logic, you can replace it with API call later
        console.log("Enrolling in course ID:", courseId);
        toast.success("Enrollment initiated! (Demo)");
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Available Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                    <div key={course._id} className="bg-white rounded-lg shadow-md p-4">
                        <img
                            src={course.imageUrl}
                            alt={course.title}
                            className="w-full h-40 object-cover rounded mb-3"
                        />
                        <h3 className="text-xl font-semibold">{course.title}</h3>
                        <p className="text-gray-600">{course.subtitle}</p>
                        <p className="text-sm text-gray-500 mt-1">{course.level}</p>
                        <p className="mt-2 font-bold text-green-600">₹{course.price}</p>

                        <button
                            onClick={() => handleEnroll(course._id)}
                            className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Enroll Now
                        </button>
                        <ToastContainer/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentDashboard;
