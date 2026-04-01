import { NavLink } from "react-router";

const Sidebar = () => {
  const menus = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "All Blogs", path: "all-blogs" },
    { name: "Create Post", path: "/create-post" },
    { name: "Comments", path: "comments" },
    { name: "Users", path: "users" },
    { name: "Settings", path: "/settings" },
  ];
 
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-5 ">

      <h1 className="text-2xl font-bold mb-8">BlogForge</h1>

      <nav className="flex flex-col gap-3">
        {menus.map((menu) => (
          <NavLink
            key={menu.name}
            to={menu.path}
            className="p-2 rounded hover:bg-gray-700"
          >
            {menu.name}
          </NavLink>
        ))}
        <NavLink to={'auth/v1/logout'} className={'p-2 rounded hover:bg-gray-700 text-red-500 '}>
          Logout
        </NavLink>
      </nav>

    </div>
  );
};

export default Sidebar;