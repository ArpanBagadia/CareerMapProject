import Footer from './Footer';
import StudentDashboard from '../pages/student/StudentDashboard';

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
       <StudentDashboard/>
      </div>
      <Footer />
    </div>
  );
}

export default Hero;
