import React, { useRef } from "react";
import { FiEdit, FiMail, FiUser, FiCalendar } from "react-icons/fi";
import {
  useGetProfileQuery,
  useGetSingleBlogByAuthorIdQuery,
  useUpdateProfileMutation,
} from "../../services/api/api";
import Loading from "../../components/ui/Loading";
import { useState } from "react";
import { Link, Navigate } from "react-router";
import moment from "moment";
import showMsg from "../../utils/getMessage";
const Profile = () => {
  const { data, isLoading } = useGetProfileQuery();
  const [limit, setLimit] = useState(3);
  const { data: getSingleBlogData } = useGetSingleBlogByAuthorIdQuery({ limit, page: 1 });
  const user = data?.data?.user;
  console.log(user,'user');
  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();
  
  const [editOpen, setEditOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: ""
  });
  const [backendImg, setBackendImg] = useState("");
  const [frontendImg, setFrontendImg] = useState("");
  const ref = useRef();
    // handle edit open
  const handleEditOpen = () => {
    setFormData({
      fullName: user?.fullName || "",
      phone: user?.phone || ""
    });
    setEditOpen(true);
  };

  // handle img change
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    const imgUrl = URL.createObjectURL(file);
    setFrontendImg(imgUrl);
    setBackendImg(file);
  };

  // handle update
  const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    const formField = new FormData();

    formField.append("fullName", formData.fullName);
    formField.append("phone", formData.phone);
    formField.append("avatar", backendImg);
    
    const res = await updateProfile(formField).unwrap();

    showMsg.success(res?.data?.message);

    setEditOpen(false);
  } catch (e) {
    console.log(e);
    showMsg.error(e?.data?.message || "Something went wrong");
  }
};
  if (isLoading) return <Loading />;
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      {/* CONTAINER */}
      <div className="max-w-5xl mx-auto">
        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-10">
          {/* TOP SECTION */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* AVATAR */}
            <div className="relative">
              <img
                src={frontendImg || user?.avatar || "https://via.placeholder.com/150"}
                alt="avatar"
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-100"
              />
              <button onClick={handleEditOpen} className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow">
                <FiEdit size={14} />
              </button>
            </div>

            {/* USER INFO */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold">{user?.fullName || "User Name"}</h2>
              <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2 mt-1">
                <FiMail /> {user?.email}
              </p>

              <p className="text-gray-400 text-sm mt-2 flex items-center justify-center md:justify-start gap-2">
                <FiCalendar /> Joined {moment(user?.createdAt).format("MMMM YYYY")}
              </p>

              {/* BUTTON */}
              <button
                onClick={handleEditOpen}
                className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 text-center">
            {/* Blogs */}
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow transition">
              <h3 className="text-lg md:text-xl font-semibold">
                {getSingleBlogData?.data?.pagination?.totalItems || 0}
              </h3>
              <p className="text-sm text-gray-500">Blogs</p>
            </div>

            {/* Role */}
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow transition">
              <h3 className="text-lg md:text-xl font-semibold">Role</h3>
              <p className="text-sm text-gray-500">{user?.role || "User"}</p>
            </div>

            {/* Email */}
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow transition break-all">
              <h3 className="text-lg md:text-xl font-semibold">Email</h3>
              <p className="text-sm text-gray-500">{user?.email || "user@example.com"}</p>
            </div>
          </div>
        </div>

        {/* BLOG SECTION */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">My Blogs</h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* BLOG CARD */}
            {getSingleBlogData?.data?.data.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
              >
                <img
                  src={item.thumbnail || "https://via.placeholder.com/400"}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg"
                />

                <h4 className="mt-3 font-semibold text-sm">{item.title}</h4>

                <p className="text-xs text-gray-500 mt-1">{item.content}</p>

                <Link
                  to={`/blog-details/${item?.slug}`}
                  className="mt-3 text-blue-600 text-sm hover:underline"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {editOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form onSubmit={handleUpdate} className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Update Profile</h2>

            {/* NAME */}
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              name="fullName"
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full mb-3 px-4 py-2 border rounded-lg"
            />

            {/* PHONE */}
            <input
              type="phone"
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full mb-3 px-4 py-2 border rounded-lg"
            />

            {/* AVATAR */}
            <div className="flex items-center gap-3 mb-4" onClick={() => ref.current.click()}>
              <img
                src={
                  frontendImg
                }
                alt="avatar"
                className="w-16 h-16 rounded-full object-cover border-4 border-blue-100 cursor-pointer"
              />
              <span className="text-blue-600 cursor-pointer">Change Avatar</span>
              <input
                type="file"
                ref={ref}
                onChange={handleImgChange}
                hidden
                className="w-full mb-4 px-4 py-2 border rounded-lg"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={updating}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                {updating ? "Updating..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
