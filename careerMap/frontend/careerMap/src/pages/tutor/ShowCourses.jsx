import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ShowCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const handlePublish = async (courseId, currentStatus) => {
    const newStatus = !currentStatus;

    setCourses(prev =>
      prev.map(course =>
        course._id === courseId ? { ...course, status: newStatus } : course
      )
    );

    try {
      await axios.put(`http://localhost:5000/api/update-course-status/${courseId}`, {
        status: newStatus
      });

      toast.success(`Course ${newStatus ? "published" : "unpublished"} successfully`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update publish status");

      setCourses(prev =>
        prev.map(course =>
          course._id === courseId ? { ...course, status: currentStatus } : course
        )
      );
    }
  };

  const fetchCourses = async () => {
    try {
      const tutorId = localStorage.getItem("tutorId");
      const res = await axios.get(`http://localhost:5000/api/courses?tutorId=${tutorId}`);
      setCourses(res.data.courses);
    } catch (error) {
      toast.error("Failed to fetch courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const tutorId = localStorage.getItem("tutorId");
      await axios.delete(`http://localhost:5000/api/delete/${id}/${tutorId}`);
      toast.success("Course deleted successfully");
      fetchCourses();
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to delete course");
    }
  };

  const handleEdit = (id) => {
    navigate(`/tutor/edit-course/${id}`);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-white min-h-screen">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Your Courses</h1>
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-white uppercase bg-blue-600">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Price (₹)</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{course.title}</td>
                  <td className="px-6 py-4">₹{course.price}</td>
                  <td className="px-6 py-4">
                    {course.status ? (
                      <button
                        onClick={() => handlePublish(course._id, course.status)}
                        className="px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-700"
                      >
                        Unpublish
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePublish(course._id, course.status)}
                        className="px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-700"
                      >
                        Publish
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button onClick={() => handleEdit(course._id)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(course._id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ShowCourses;
