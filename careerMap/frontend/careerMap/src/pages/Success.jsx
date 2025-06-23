import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Success = () => {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const sessionId = query.get("session_id");

    useEffect(() => {
        const enrollAfterPayment = async () => {
            if (!user || !sessionId) return;

            try {
                const res = await axios.post("http://localhost:5000/api/enroll-after-payment", {
                    sessionId,
                    studentId: user.user.id,
                });

                alert("Enrollment successful!");
            } catch (err) {
                console.error(err);
                alert("Failed to enroll after payment");
            }
        };

        enrollAfterPayment();
    }, [sessionId, user]);

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h2>
                <p>We are enrolling you into the course...</p>
                <button
                    onClick={() => navigate("/student/enrolled")}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Show Enrollments
                </button>
            </div>
        </div>
    );
};

export default Success;
