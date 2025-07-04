import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import SelectRole from "./pages/auth/SelectRole";
import StudentDashboard from "./pages/student/Dashboard";
import TutorDashboard from "./pages/tutor/TutorDashboard";
import CompanyDashboard from "./pages/company/CompanyDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TutorCourse from "./pages/tutor/TutorCourse";
import ShowCourses from "./pages/tutor/ShowCourses";
import EditCourses from "./pages/tutor/EditCourses";
import CourseDetails from "./pages/student/CourseDetails"
import StudentCourses from "./pages/student/StudentCourses";
import TutorEnrollments from "./pages/tutor/TutorEnrollments";
import Success from "./pages/Success";
import CoursePlayer from "./pages/student/CoursePlayer";
import AllCourses from "./pages/student/AllCourses";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute role="student"><Hero /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/select-role" element={<SelectRole />} />
        <Route path="/success" element={<Success />} />
        <Route path="/student/player/:courseId" element={<CoursePlayer />} />
        <Route
          path="/student/dashboard"
          element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>}
        />
        <Route path="/all-courses" element={<ProtectedRoute role="student"><AllCourses /></ProtectedRoute>} />
        <Route path="/student/course/:id" element={<CourseDetails />} />
        <Route path="/student/enrolled" element={<ProtectedRoute role="student"><StudentCourses /></ProtectedRoute>} />
        <Route path="/tutor/enrollments" element={<ProtectedRoute role="tutor"><TutorEnrollments /></ProtectedRoute>} />
        <Route
          path="/tutor/dashboard"
          element={<ProtectedRoute role="tutor"><TutorDashboard /></ProtectedRoute>}
        />
        <Route
          path="/tutor/addcourse"
          element={<ProtectedRoute role="tutor"><TutorCourse /></ProtectedRoute>}
        />
        <Route
          path="/tutor/showcourses"
          element={<ProtectedRoute role="tutor"><ShowCourses /></ProtectedRoute>}
        />
        <Route
          path="/tutor/edit-course/:courseId"
          element={<ProtectedRoute role="tutor"><EditCourses /></ProtectedRoute>}
        />
        <Route
          path="/company/dashboard"
          element={<ProtectedRoute role="company"><CompanyDashboard /></ProtectedRoute>}
        />
      </Routes>
    </>
  );
}

export default App;
