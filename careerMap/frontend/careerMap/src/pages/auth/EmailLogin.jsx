import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EmailLogin = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", data);
      login(res.data);
      navigate(`/${res.data.user.role}/dashboard`);
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("email")} placeholder="Email" className="input" />
        <input type="password" {...register("password")} placeholder="Password" className="input" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default EmailLogin;
