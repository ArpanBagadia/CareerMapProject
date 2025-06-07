import React from 'react';

const courses = [
  {
    id: 1,
    title: "Build Text to image SaaS App in React JS",
    tag: "FULL STACK",
    subtitle: "Text to Image SAAS App",
    instructor: "Richard James",
    rating: 4.5,
    reviews: 122,
    price: "$10.99",
    image: "/course1.png",
  },
  {
    id: 2,
    title: "Build AI BG Removal SaaS App in React JS",
    tag: "FULL STACK",
    subtitle: "AI BG Removal SAAS App",
    instructor: "Richard James",
    rating: 4.5,
    reviews: 122,
    price: "$10.99",
    image: "/course2.png",
  },
  {
    id: 3,
    title: "React Router Complete Course in One Video",
    tag: "React Router",
    subtitle: "In Depth",
    instructor: "Richard James",
    rating: 4.5,
    reviews: 122,
    price: "$10.99",
    image: "/course3.png",
  },
  {
    id: 4,
    title: "Build Full Stack E-Commerce App in React JS",
    tag: "2024",
    subtitle: "E-Commerce MERN app",
    instructor: "Richard James",
    rating: 4.5,
    reviews: 122,
    price: "$10.99",
    image: "/course4.png",
  },
];

function Hero() {
  return (
    <div>
      {/* Hero Section */}
      <div className="pt-16 pb-10 bg-gradient-to-b from-[#e9fbff] to-white">
        <div className="flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl sm:text-4xl font-bold max-w-3xl">
            Empower your future with the <br />
            courses designed to{" "}
            <span className="text-blue-600 relative inline-block">
              fit your choice.
              <img src="/sktech.svg" alt="underline" className="mx-auto mt-1" />
            </span>
          </h1>

          <p className="mt-5 text-gray-600 max-w-xl">
            We bring together world-class instructors, interactive content, and a supportive
            community to help you achieve your personal and professional goals.
          </p>

          {/* Search Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center w-full max-w-2xl rounded-lg shadow-md bg-white p-2">
            <input
              type="text"
              placeholder="Search for courses"
              className="flex-grow w-full px-4 py-2 text-gray-700 outline-none mb-2 sm:mb-0 sm:mr-2"
            />
            <button className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="pt-10 pb-14 px-4 max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Learn from the best</h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Discover our top-rated courses across various categories. From coding and design to
          business and wellness, our courses are crafted to deliver results.
        </p>

        {/* Grid of Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition bg-white"
            >
              <div className="relative h-40 w-full bg-gray-100">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-left">
                <p className="text-sm font-semibold text-green-600">{course.tag}</p>
                <h3 className="text-lg font-bold leading-tight mt-1">
                  {course.subtitle}
                </h3>
                <p className="mt-1 font-medium text-sm">{course.title}</p>
                <p className="text-sm text-gray-500 mt-1">{course.instructor}</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-sm font-medium">{course.rating}</span>
                  <span className="text-red-500 text-sm">★ ★ ★ ★ ☆</span>
                  <span className="text-sm text-gray-500">({course.reviews})</span>
                </div>
                <p className="mt-2 font-semibold text-black">{course.price}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-10 px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
          Show all courses
        </button>
      </div>
    </div>
  );
}

export default Hero;
