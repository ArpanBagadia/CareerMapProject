// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const SelectRole = () => {
//   const { user, login } = useAuth();
//   const navigate = useNavigate();

//   const setRole = async (role) => {
//     const res = await axios.post("http://localhost:5000/api/set-role", {
//       userId: user.user.id,
//       role,
//     });

//     login({ ...user, user: { ...user.user, role } }); // update role in context
//     navigate(`/${role}/dashboard`);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen space-y-4">
//       <h2 className="text-xl font-semibold">Select Your Role</h2>
//       <div className="space-x-4">
//         {["student", "tutor", "company"].map((r) => (
//           <button
//             key={r}
//             className="bg-gray-800 text-white px-4 py-2 rounded-md"
//             onClick={() => setRole(r)}
//           >
//             {r.charAt(0).toUpperCase() + r.slice(1)}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SelectRole;

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const roles = [
  {
    id: "student",
    label: "Student",
    description: "Enroll in courses, learn, and build your career.",
  },
  {
    id: "tutor",
    label: "Tutor",
    description: "Create and manage courses for students.",
  },
  {
    id: "company",
    label: "Company",
    description: "Find qualified candidates and share job offers.",
  },
];

const SelectRole = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const setRole = async (role) => {
    const res = await axios.post("http://localhost:5000/api/set-role", {
      userId: user.user.id,
      role,
    });

    login({ ...user, user: { ...user.user, role } });
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-3xl w-full text-center">
        <h2 className="text-3xl font-bold mb-8">Select Your Role</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setRole(role.id)}
              className="bg-white border border-gray-200 hover:border-blue-500 shadow-sm hover:shadow-md rounded-lg p-6 transition-all duration-200 text-left"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {role.label}
              </h3>
              <p className="text-gray-600 text-sm">{role.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectRole;
