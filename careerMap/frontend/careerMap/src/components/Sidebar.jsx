import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen,Monitor } from "lucide-react";

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { name: "Dashboard", path: "/tutor/dashboard", icon: <LayoutDashboard size={18} /> },
        { name: "Add Courses", path: "/tutor/addcourse", icon: <BookOpen size={18} /> },
        { name: "Show Courses", path: "/tutor/showcourses", icon: <Monitor size={18} /> }
    ];

    return (
        <div className="w-64 h-screen bg-[#f8fafc] border-r border-gray-200 shadow-sm p-5">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Tutor Panel</h2>

            <div className="space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center px-4 py-2 rounded-lg transition ${location.pathname === item.path
                                ? "bg-blue-100 text-blue-600 font-semibold"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        <span className="mr-3">{item.icon}</span>
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
