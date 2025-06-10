import { Routes, Route } from "react-router-dom";
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


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/select-role" element={<SelectRole />} />
        <Route
          path="/student/dashboard"
          element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>}
        />
        <Route
          path="/tutor/dashboard"
          element={<ProtectedRoute role="tutor"><TutorDashboard /></ProtectedRoute>}
        />
        <Route
          path="/tutor/addcourse"
          element={<ProtectedRoute role="tutor"><TutorCourse /></ProtectedRoute>}
        />
        <Route
          path="/company/dashboard"
          element={<ProtectedRoute role="company"><CompanyDashboard /></ProtectedRoute>}
        />
        <Route
          path="/tutor/showcourses"
          element={<ProtectedRoute role="tutor"><ShowCourses /></ProtectedRoute>}
        />
      </Routes>
    </>
  );
}

export default App;
