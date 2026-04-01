import Loading from "../components/ui/Loading";
import { useGetProfileQuery } from "../services/api/api";

const Navbar = () => {
  const {data:profileData,isError,isLoading} = useGetProfileQuery()
  if(isLoading) return <Loading/>
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">

      <input
        type="text"
        placeholder="Search posts..."
        className="border px-4 py-2 rounded w-72"
      />

      <div className="flex items-center gap-4">
        <button className="text-gray-600">🔔</button>

        <div className="flex items-center gap-2">
          <img
            src={`${profileData?.data?.user?.avatar ? profileData?.data?.user?.avatar : "https://i.pravatar.cc/40"}`}
            alt="Profile_image"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium">{profileData?.data?.user?.fullName.split(' ').shift()}</span>
        </div>
      </div>

    </div>
  );
};

export default Navbar;