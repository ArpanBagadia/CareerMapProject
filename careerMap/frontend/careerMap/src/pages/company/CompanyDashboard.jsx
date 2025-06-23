// src/pages/company/QualifiedStudents.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const CompanyDashboard = () => {
  const { user } = useAuth();      
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (!user || user.user.role !== 'company') return;

    axios.get(`http://localhost:5000/api/qualified-students`)
      .then(res => setStudents(res.data))
      .catch(err => console.error('Error fetching qualified students:', err));
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">🎓 Qualified Students</h2>

      {students.length === 0 ? (
        <div className="text-center mt-10 text-gray-500 text-lg">No qualified students yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((enroll) => {
    

            return (
              <div
                key={enroll._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 flex flex-col items-center text-center"
              >
                {/* <img
                  src={enroll.studentId.imageUrl || 'https://via.placeholder.com/150'}
                  alt={enroll.studentId.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 mb-4"
                /> */}
                {/* <h3 className="text-xl font-semibold text-gray-800">{enroll.studentId.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{enroll.studentId.email}</p> */}
                <p className="text-sm text-gray-700 mb-1 font-medium">📘 {enroll.courseId.title}</p>
                <p className="text-xs text-green-600 mb-3">📅 Enrolled: {new Date(enroll.enrolledAt).toLocaleDateString()}</p>
                <button
                  className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition"
                  // onClick={() => alert(`Request sent to ${enroll.studentId.name}`)}
                >
                  📩 Invite for Job
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
