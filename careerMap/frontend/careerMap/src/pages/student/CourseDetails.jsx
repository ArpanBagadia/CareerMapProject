import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CourseDetail = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get-course/${id}`)
            .then(res => setCourse(res.data.course))
            .catch(err => console.error("Course fetch error:", err));
    }, [id]);

    const handleEnroll = async () => {
        if (!user) {
            alert("Please login first to enroll.");
            navigate('/login');
            return;
        }
        console.log(user.user.id)
        try {
            const response = await axios.post('http://localhost:5000/api/enroll', {
                studentId: user.user.id,
                courseId: course?._id,
                tutorId: course?.tutorId, // make sure `course.tutorId` is available
            });
            if (!user || !course || !course._id || !course.tutorId) {
                alert("Missing required data to enroll. Please try again later.");
                return;
            }
            alert(response.data.msg);
            navigate('/student/enrolled'); // or wherever you show enrolled courses
        } catch (err) {
            alert(err.response?.data?.msg || "Something went wrong");
        }
    };

    const calculateTotalDuration = (structure) => {
        let totalMinutes = 0;

        structure.forEach(mod => {
            const durationStr = mod.duration.toLowerCase();
            const hoursMatch = durationStr.match(/(\d+)\s*hour/);
            const minsMatch = durationStr.match(/(\d+)\s*minute/);

            const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
            const minutes = minsMatch ? parseInt(minsMatch[1]) : 0;

            totalMinutes += hours * 60 + minutes;
        });

        const finalHours = Math.floor(totalMinutes / 60);
        const finalMinutes = totalMinutes % 60;

        return `${finalHours} hours${finalMinutes > 0 ? `, ${finalMinutes} minutes` : ''}`;
    };

    if (!course) return <p className="text-center mt-10">Loading...</p>;

    const totalDuration = course?.structure ? calculateTotalDuration(course.structure) : "";
    const totalLectures = course?.structure
        ? course.structure.reduce((sum, mod) => sum + (parseInt(mod.lectures) || 0), 0)
        : 0;

    return (
        <div className="p-6 min-h-screen bg-gradient-to-b from-[#e9f1fc] to-white">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Content */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-3xl font-bold">{course.title}</h2>
                    <p className="text-gray-600">{course.subtitle}</p>
                    <p className="text-sm text-gray-500 mt-1">
                        Course by <span className="text-blue-600 font-semibold">GreatStack</span>
                    </p>
                    <p className="mt-2 text-yellow-600">⭐⭐⭐⭐⭐ (1 rating)</p>
                    <p className="text-sm text-gray-500">2 students enrolled</p>

                    <h3 className="text-xl font-semibold mt-6">Course Structure</h3>
                    {Array.isArray(course.structure) &&
                        course.structure.map((mod, idx) => (
                            <details key={idx} className="border p-3 rounded bg-white">
                                <summary className="font-medium cursor-pointer">
                                    {mod.title} - {mod.lectures} lectures - {mod.duration}
                                </summary>
                                <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
                                    {Array.isArray(mod.topics) &&
                                        mod.topics.map((t, i) => <li key={i}>{t}</li>)}
                                </ul>
                            </details>
                        ))}

                    <h3 className="text-xl font-semibold mt-6">Course Description</h3>
                    <p className="text-gray-700">{course.description}</p>
                </div>

                {/* Right Sidebar */}
                <div className="bg-white rounded-lg shadow-md p-4">
                    <img src={course.imageUrl} className="rounded-lg mb-4" alt={course.title} />
                    <p className="text-red-500 text-sm mb-1">⏳ 5 days left at this price!</p>
                    <div className="text-2xl font-bold text-green-600">
                        ₹{course.price}{' '}
                        <span className="line-through text-gray-400 text-base">₹{course.originalPrice}</span>{' '}
                        <span className="text-red-600 text-base">20% off</span>
                    </div>
                    <p className="mt-2">
                        ⭐ {course.rating || 5} | 🕒 {course.createdAt} | 📚 {course.level} lessons
                    </p>
                    <button
                        onClick={handleEnroll}
                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Enroll Now
                    </button>


                    <div className="mt-6">
                        <h4 className="font-semibold text-md mb-1">What's in the course?</h4>
                        <ul className="text-sm text-gray-700 list-disc list-inside">
                            <li>Lifetime access with free updates</li>
                            <li>Hands-on project guidance</li>
                            <li>Downloadable resources</li>
                            <li>Quizzes and certificate</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
