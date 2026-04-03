import React, { useState } from "react";
import { useGetProfileQuery } from "../services/api/api";
import Loading from "./ui/Loading";
import { Link } from "react-router";

const Navbar = () => {
  // 🔥 fake auth state (replace later with Redux / context / API)
  const [user, setUser] = useState({
    name: "Raj",
    image: "https://i.pravatar.cc/40",
  });
  
  const [open, setOpen] = useState(false);
  const {data,isLoading} = useGetProfileQuery()
  if(isLoading) return <Loading/>
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <h1 className="text-xl font-bold">BlogForge</h1>

        {/* MENU */}
        <div className="hidden md:flex gap-6 text-sm">
          <a href="/">Home</a>
          <a href="/blogs">Blogs</a>
          <a href="/about">About</a>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative">

          {/* ❌ NOT LOGGED IN */}
          {!user && (
            <Link to={'/login'} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Login
            </Link>
          )}

          {/* ✅ LOGGED IN */}
          {user && (
            <div className="relative">
              
              {/* Avatar */}
              <img
                src={data?.data?.user?.avatar}
                alt="user"
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500"
              />

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-3 w-48 bg-white border rounded-xl shadow-lg p-2">
                  
                  <p className="px-3 py-2 text-sm font-semibold">
                    {user.name}
                  </p>

                  <hr />

                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-lg">
                    Dashboard
                  </button>

                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-lg">
                    My Blogs
                  </button>

                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-lg">
                    Settings
                  </button>

                  <hr />

                  <button
                    onClick={() => setUser(null)}
                    className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;