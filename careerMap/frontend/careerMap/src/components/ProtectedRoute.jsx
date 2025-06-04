import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ role, children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (user.user.role !== role) return <Navigate to={`/${user.user.role}/dashboard`} />;

  return children;
};

export default ProtectedRoute;
