const Footer = () => {
    return (
        <footer className="bg-[#0F172A] text-white py-10 px-6 md:px-20">
            <div className="flex flex-col md:flex-row justify-between space-y-10 md:space-y-0">
                {/* Brand + Description */}
                <div className="max-w-md">
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="p-2 rounded-full">
                            <img src="/image.png" alt="logo" className="w-10 h-10 object-contain" />
                        </div>
                        <h2 className="text-xl font-semibold">CareerMap</h2>
                    </div>
                    <p className="text-gray-400">
                        CareerMap is an online learning platform empowering students to learn new skills, prepare for careers, and connect with top tutors and companies.
                    </p>
                </div>

                {/* Company Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Company</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="/" className="hover:text-white">Home</a></li>
                        <li><a href="#" className="hover:text-white">About Us</a></li>
                        <li><a href="#" className="hover:text-white">Contact</a></li>
                        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="max-w-sm">
                    <h3 className="text-lg font-semibold mb-3">Subscribe to our newsletter</h3>
                    <p className="text-gray-400 mb-4">
                        Get the latest updates, new courses, and job opportunities directly to your inbox.
                    </p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-4 py-2 rounded-l-md bg-gray-800 text-white border border-gray-600 focus:outline-none"
                        />
                        <button className="px-4 py-2 bg-blue-600 rounded-r-md hover:bg-blue-700">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom copyright */}
            <hr className="my-6 border-gray-700" />
            <p className="text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Edemy. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
