import React, { useState } from "react";
import { useGetProfileQuery, useGetSearchItemsQuery } from "../services/api/api";
import Loading from "./ui/Loading";
import { Link, useNavigate, useLocation } from "react-router";
import Logo from "/Logo.png";
// react icons plus icons
import { FiHome, FiFileText, FiInfo, FiUser, FiPlus } from "react-icons/fi";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchItems, setSearchItems] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading } = useGetProfileQuery();

  const { data: searchData } = useGetSearchItemsQuery(searchItems, {
    skip: !searchItems,
  });

  const results = searchData?.data || [];

  const handleSearch = () => {
    if (!searchItems.trim()) return;
    navigate(`/search?blog=${searchItems}`);
    setSearchItems("");
  };

  if (isLoading) return <Loading />;
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
              {/* Create Blog */}
              {
                data?.data?.user && (
                <Link to="/create-blog" className="flex flex-col items-center">
                  <FiPlus
                    className={`text-xl ${
                      location.pathname === "/create-blog" ? "text-blue-600" : "text-gray-500"
                    }`}
                  />
                  <span className="text-xs">Create Blog</span>
                </Link>
                )
              }
    
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
      {/* ================= TOP NAVBAR ================= */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="Logo" className="w-8 h-8 rounded" />
            <span className="text-xl font-bold">BlogForge</span>
          </Link>

          {/* SEARCH */}
          <div className="hidden md:block relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchItems}
              onChange={(e) => setSearchItems(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full border px-4 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            {searchItems && (
              <div className="absolute top-12 left-0 w-full bg-white border rounded-xl shadow-lg max-h-60 overflow-y-auto z-50">
                {results.length > 0 ? (
                  results.map((item) => (
                    <Link
                      key={item._id}
                      to={`/search/${item.title}`}
                      onClick={() => setSearchItems("")}
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      {item.title}
                    </Link>
                  ))
                ) : (
                  <p className="px-4 py-2 text-sm text-gray-500">No results found</p>
                )}
              </div>
            )}
          </div>

          {/* MENU */}
          <div className="hidden md:flex gap-6 text-sm items-center">
            <Link to="/">Home</Link>
            <Link to="/blogs">Blogs</Link>
            <Link to="/about">About</Link>
            <Link to="/profile">Profile</Link>
            {/* create blog button */}
            {data?.data?.user && (
              <Link
                to="/create-blog"
                className="bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center gap-1"
              >
                <FiPlus size={16} />
                <span>Create Blog</span>
              </Link>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="relative">
            {!data?.data?.user ? (
              <Link to={"/login"} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Login
              </Link>
            ) : (
              <div className="relative">
                <img
                  src={data?.data?.user?.avatar || "https://i.pravatar.cc/40"}
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                  onClick={() => setOpen(!open)}
                />

                {open && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border rounded-xl shadow-lg p-2">
                    <p className="px-3 py-2 text-sm font-semibold">{data?.data?.user?.fullName}</p>
                    {/* create blog button */}
                    {data?.data?.user && (
                      <Link
                        to="/create-blog"
                        className="bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center gap-1"
                      >
                        <FiPlus size={16} />
                        <span>Create Blog</span>
                      </Link>
                    )}
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-lg"
                    >
                      Dashboard
                    </Link>

                    <Link
                      to={"/profile"}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-lg"
                    >
                      My Blogs
                    </Link>

                    <button className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
