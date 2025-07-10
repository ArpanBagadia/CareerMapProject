import { useState } from "react";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { X } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleManualLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      login(res.data);
      navigate(`/${res.data.user.role}/dashboard`);
    } catch (err) {
      alert("Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const res = await axios.post("http://localhost:5000/api/google-login", {
        idToken,
      });

      login(res.data);
      if (!res.data.user.role) navigate("/select-role");
      else {
        if (res.data.user.role === "student") {
          navigate(`/`)
        }
        else {
          navigate(`/${res.data.user.role}/dashboard`);
        }
      }
    } catch (err) {
      console.error("Google login error", err);
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

        <h2 className="text-2xl font-semibold mb-6 text-center">Log In</h2>

        <div className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded px-4 py-2 w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded px-4 py-2 w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleManualLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 w-full"
          >
            Log In
          </button>

          <div className="flex items-center justify-center my-2">
            <hr className="w-1/3 border-gray-300" />
            <span className="mx-2 text-sm text-gray-500">or continue with</span>
            <hr className="w-1/3 border-gray-300" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="border border-gray-300 rounded px-4 py-2 w-full flex items-center justify-center space-x-2 hover:bg-gray-100"
          >
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </button>

          <div className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
