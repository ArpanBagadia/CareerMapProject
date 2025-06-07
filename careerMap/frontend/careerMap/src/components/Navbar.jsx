import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#e9fbff] border-b">
      {/* Logo Section */}
      <Link to="/" className="flex items-center space-x-2">
        <img
          src="/image.png"
          alt="CareerMap Logo"
          className="h-10 w-10 object-contain"
        />
        <span className="text-xl font-bold text-gray-900">CareerMap</span>
      </Link>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <div className="flex items-center space-x-2">
              <img
                src={user.user.imageUrl || "/default-avatar.png"}
                alt="User Avatar"
                className="w-9 h-9 rounded-full object-cover border border-gray-300"
              />
              <span className="text-sm font-medium text-gray-800">
                {user.user.name}
              </span>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-full bg-red-500 text-white text-sm hover:bg-red-600 transition"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="text-sm text-gray-700 hover:text-gray-900 transition">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition">
                Create Account
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
