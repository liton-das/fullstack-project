import React from "react";
// Icons
import { FiHome, FiFileText, FiInfo, FiUser } from "react-icons/fi";
import { Link } from "react-router";
const MobaileNav = () => {
  return (
    <>
      {/* ================= MOBILE BOTTOM NAVBAR ================= */}
      <div className="fixed bottom-3 left-0 right-0 z-50 flex justify-center md:hidden">
        <div
          className="flex items-center gap-8 px-6 py-3 rounded-2xl 
                bg-white/80 backdrop-blur-xl shadow-lg border"
        >
          {/* Home */}
          <Link to="/" className="flex flex-col items-center">
            <FiHome
              className={`text-xl ${location.pathname === "/" ? "text-blue-600" : "text-gray-500"}`}
            />
            <span className="text-xs">Home</span>
          </Link>

          {/* Blogs */}
          <Link to="/blogs" className="flex flex-col items-center">
            <FiFileText
              className={`text-xl ${
                location.pathname === "/blogs" ? "text-blue-600" : "text-gray-500"
              }`}
            />
            <span className="text-xs">Blogs</span>
          </Link>

          {/* About */}
          <Link to="/about" className="flex flex-col items-center">
            <FiInfo
              className={`text-xl ${
                location.pathname === "/about" ? "text-blue-600" : "text-gray-500"
              }`}
            />
            <span className="text-xs">About</span>
          </Link>

          {/* Profile */}
          <Link to="/profile" className="flex flex-col items-center">
            <FiUser
              className={`text-xl ${
                location.pathname === "/profile" ? "text-blue-600" : "text-gray-500"
              }`}
            />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobaileNav;
