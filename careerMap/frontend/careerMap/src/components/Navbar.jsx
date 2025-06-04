import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-4 px-8 flex items-center justify-between">
      {/* Brand */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        careerMap
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8 text-gray-700 text-sm font-medium">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <Link to="/features" className="hover:text-blue-600">Features</Link>
        <Link to="/pricing" className="hover:text-blue-600">Pricing</Link>
        <Link to="/about" className="hover:text-blue-600">About</Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-3">
        <Link to="/login">
          <button className="border border-gray-300 text-gray-700 px-4 py-1.5 rounded-md hover:bg-gray-100">
            Log In
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
