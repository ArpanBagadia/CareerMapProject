import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const StudentCourses = () => {
    const { user } = useAuth();
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        if (!user || !user.user.id) {
            console.log("user is not ready:", user);
            return;
        }

        console.log("Fetching enrollments for:", user.user.id);

        axios.get(`http://localhost:5000/api/student-enrollments/${user.user.id}`)
            .then(res => setEnrollments(res.data))
            .catch(err => console.error('Failed to fetch enrollments:', err));
    }, [user]);

    return (
        <div className="min-h-screen bg-[#e9fbff] p-6">
            <h2 className="text-2xl font-bold mb-4">My Enrolled Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {enrollments.map((enroll) => (
                    <Link to={`/student/player/${enroll.courseId._id}`}>
                        <div className="bg-white p-4 shadow rounded cursor-pointer hover:shadow-md">
                            <img src={enroll.courseId.imageUrl} alt={enroll.courseId.title} className="h-40 w-full object-cover rounded mb-2" />
                            <h3 className="text-lg font-semibold">{enroll.courseId.title}</h3>
                            <p className="text-sm text-gray-500">{enroll.courseId.subtitle}</p>
                            <p className="text-sm text-green-600 mt-1">
                                Enrolled on: {new Date(enroll.enrolledAt).toLocaleDateString()}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default StudentCourses;
