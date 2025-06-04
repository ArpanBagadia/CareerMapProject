import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  console.log(user)

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        CareerMap
      </Link>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <div className="flex items-center space-x-2">
              <img
                src={user.user.imageUrl || "/default-avatar.png"} // Default image if no photo is provided
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-gray-800 font-semibold">{user.user.name}</span>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">
                Log In
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
