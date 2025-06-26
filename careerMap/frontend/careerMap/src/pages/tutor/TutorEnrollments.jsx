import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar';

const TutorEnrollments = () => {
    const { user } = useAuth(); // tutor data
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        if (!user || !user.user?.id) return;

        axios.get(`http://localhost:5000/api/tutor-enrollments/${user.user.id}`)
            .then(res => {
                setEnrollments(res.data)
                console.log(enrollments)
            })
            .catch(err => console.error("Error fetching tutor enrollments:", err));
    }, [user]);

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6 bg-white min-h-screen">
                <h2 className="text-2xl font-bold mb-4">Student Enrollments in Your Courses</h2>

                {enrollments.length === 0 ? (
                    <p className="text-gray-500">No enrollments yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {enrollments.map((enroll) => (
                            <div key={enroll._id} className="bg-white p-4 shadow rounded">
                                <h3 className="font-semibold text-lg">{enroll.courseId.title}</h3>
                                <p className="text-sm text-gray-600">Subtitle: {enroll.courseId.subtitle}</p>
                                <hr className="my-2" />
                                <p className="text-sm"><strong>Student:</strong> {enroll.studentId.name}</p>
                                <p className="text-sm"><strong>Email:</strong> {enroll.studentId.email}</p>
                                <p className="text-sm text-green-600 mt-1">
                                    Enrolled on: {new Date(enroll.enrolledAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default TutorEnrollments;
