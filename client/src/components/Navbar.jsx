import React, { useState } from "react";
import { useGetProfileQuery, useGetSearchItemsQuery } from "../services/api/api";
import Loading from "./ui/Loading";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const [user, setUser] = useState({
    name: "Raj",
    image: "https://i.pravatar.cc/40",
  });

  const [open, setOpen] = useState(false);
  const [searchItems, setSearchItems] = useState("");

  const navigate = useNavigate();

  const { data, isLoading } = useGetProfileQuery();

  // Search API
  const { data: searchData } = useGetSearchItemsQuery(searchItems, {
    skip: !searchItems, // don't call API if empty
  });
  if (isLoading) return <Loading />;

  const results = searchData?.data || [];
// Handle submit (Enter key)
  const handleSearch = () => {
    if (!searchItems.trim()) return;
    navigate(`/search?blog=${searchItems}`);
    setSearchItems("");
  };
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        {/* LOGO */}
        <h1 className="text-xl font-bold">BlogForge</h1>

        {/* SEARCH */}
        <div className="hidden md:block relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchItems}
            onChange={(e) => setSearchItems(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* SEARCH DROPDOWN */}
          {searchItems && (
            <div className="absolute top-12 left-0 w-full bg-white border rounded-xl shadow-lg max-h-60 overflow-y-auto z-50">
              {results.length > 0 ? (
                results.map((item) => (
                  <Link
                    key={item._id}
                    to={`/search/${item.title}`}
                    onClick={() => {
                      setSearchItems("");
                      setIsFocused(false);
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
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
        <div className="hidden md:flex gap-6 text-sm">
          <Link to="/">Home</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/about">About</Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative">
          {!data?.data?.user ? (
            <Link to={"/login"} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Login
            </Link>
          ):
            <div className="relative">
              <img
                src={data?.data?.user?.avatar}
                alt="user"
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500"
              />

              {open && (
                <div className="absolute right-0 mt-3 w-48 bg-white border rounded-xl shadow-lg p-2">
                  <p className="px-3 py-2 text-sm font-semibold">{user.name}</p>

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
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;