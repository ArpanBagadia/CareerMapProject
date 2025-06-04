import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { X } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleManualSignup = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "student", // default role
      });
      login(res.data);
      navigate(`/${res.data.user.role}/dashboard`);
    } catch (err) {
      alert("Signup failed");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const res = await axios.post("http://localhost:5000/api/google-login", {
        idToken,
      });

      login(res.data);
      if (!res.data.user.role) navigate("/select-role");
      else navigate(`/${res.data.user.role}/dashboard`);
    } catch (err) {
      console.error("Google signup error", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

        <div className="space-y-4">
          <div className="flex items-center border rounded px-3 py-2">
            <FiUser className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full outline-none"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="flex items-center border rounded px-3 py-2">
            <FiMail className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="flex items-center border rounded px-3 py-2">
            <FiLock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="flex items-center border rounded px-3 py-2">
            <FiLock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full outline-none"
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
          </div>

          <button
            onClick={handleManualSignup}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 w-full"
          >
            Sign Up
          </button>

          <div className="flex items-center justify-center my-2">
            <hr className="w-1/3 border-gray-300" />
            <span className="mx-2 text-sm text-gray-500">
              or continue with
            </span>
            <hr className="w-1/3 border-gray-300" />
          </div>

          <button
            onClick={handleGoogleSignup}
            className="border border-gray-300 rounded px-4 py-2 w-full flex items-center justify-center space-x-2 hover:bg-gray-100"
          >
            <FcGoogle size={20} />
            <span>Sign up with Google</span>
          </button>

          <div className="text-sm text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
