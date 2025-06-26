import Sidebar from '../../components/Sidebar'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useState, useEffect } from 'react';


function TutorDashboard() {
  const { user } = useAuth(); // tutor data
  const [enrollments, setEnrollments] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [enrollment, setEnrollment] = useState([]);
  const [courses, setCourses] = useState([]);


  useEffect(() => {
    if (!user || !user.user?.id) return;
    axios.get(`http://localhost:5000/api/tutor-enrollments/${user.user.id}`)
      .then(res => {
        setEnrollments(res.data)
        const total = res.data.reduce((acc, curr) => {
          return acc + (curr.courseId?.price || 0);
        }, 0);
        setRevenue(total);
      })
      .catch(err => console.error("Error fetching tutor enrollments:", err));
    axios.get(`http://localhost:5000/api/by-tutor/${user.user.id}`)
      .then(res => {
        setEnrollment(res.data.enrollment); // if needed
        setCourses(res.data.courses); // 👈 NEW
      })
      .catch(err => console.error("Error:", err));
  }, [user]);
  const chartData = courses.map(course => ({
    courseTitle: course.title,
    price: course.price
  }));
  console.log(chartData)
  return (
    <div className='flex'>
      <Sidebar />
      <main className="flex-1 p-6 bg-white min-h-screen">
        <div className="p-6 bg-white min-h-screen w-full">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">Dashboard Overview</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Total Sales</p>
              <h2 className="text-3xl font-bold text-blue-700">{enrollments.length}</h2>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <h2 className="text-3xl font-bold text-green-700">{revenue}</h2>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Course Prices</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="courseTitle" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value}`} />
                <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TutorDashboard