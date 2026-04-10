import { NavLink } from "react-router";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useLogOutMutation } from "../services/api/api";
import Loading from "../components/ui/Loading";
import showMsg from "../utils/getMessage";

const Sidebar = () => {
  const [logOut, { isLoading }] = useLogOutMutation();
  const [open, setOpen] = useState(false);

  if (isLoading) return <Loading />;

  const menus = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "All Blogs", path: "/dashboard/all-blogs" },
    { name: "Create Post", path: "/dashboard/create-blog" },
    { name: "Comments", path: "/dashboard/comments" },
    { name: "Users", path: "/dashboard/users" },
  ];

  const handleLogout = async () => {
    try {
      const res = await logOut().unwrap();
      window.location.href="https://fullstack-project-green.vercel.app/"
      showMsg.success(res?.message)
    } catch (e) {
      showMsg.error(e?.data?.message)
    }
  };

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden  bg-gray-900 text-white p-4">
        <button className="" onClick={() => setOpen(true)}>
          <FiMenu size={24} />
        </button>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden min-h-screen"
        />
      )}

      {/*  SIDEBAR */}
      <div
        className={`fixed md:static top-0 left-0 min-h-screen w-64 bg-gray-900 text-white p-5 z-50 transform transition-transform duration-300
        ${open ? "translate-x-0 " : "-translate-x-full"} 
        md:translate-x-0`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">BlogForge</h1>

          {/* CLOSE BUTTON (MOBILE) */}
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <FiX size={22} />
          </button>
        </div>

        {/* MENU */}
        <nav className=" min-h-screen flex flex-col gap-3">
          {menus.map((menu) => (
            <NavLink
              key={menu.name}
              to={menu.path}
              onClick={() => setOpen(false)} // close on click mobile
              className={({ isActive }) =>
                `p-2 rounded transition ${
                  isActive ? "bg-blue-600" : "hover:bg-gray-700"
                }`
              }
            >
              {menu.name}
            </NavLink>
          ))}

          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="p-2 rounded hover:bg-gray-700 text-red-400 text-left"
          >
            {isLoading ? 'Loging Out....':'Logout'}
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;