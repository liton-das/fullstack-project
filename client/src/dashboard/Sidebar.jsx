import { NavLink } from "react-router";
import { useLogOutMutation } from "../services/api/api";
import Loading from "../components/ui/Loading";

const Sidebar = () => {
  const [logOut,{isLoading}] = useLogOutMutation()
  if(isLoading) return <Loading/>
  const menus = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "All Blogs", path: "all-blogs" },
    { name: "Create Post", path: "/dashboard/create-blog" },
    { name: "Comments", path: "comments" },
    { name: "Users", path: "users" },
  ];
 const handleLogout = async()=>{
    try {
      await logOut().unwrap()
    } catch (e) {
      console.log(e)
    }
  }

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
        <button onClick={handleLogout} className={'p-2 rounded hover:bg-gray-700 text-red-500 '}>
          Logout
        </button>
      </nav>

    </div>
  );
};

export default Sidebar;