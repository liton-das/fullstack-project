import React from "react";
import { useGetUserListsQuery } from "../../services/api/api";
import Loading from "../../components/ui/Loading";

const Users = () => {
  const { data, isLoading } = useGetUserListsQuery();

  if (isLoading) return <Loading />;

  let i = 1;
  const users = data?.data?.data || [];

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6">

      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow space-y-6">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-bold">All Users</h1>

          <button className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700">
            + Add User
          </button>
        </div>

        {/* ================= FILTERS ================= */}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">

          <input
            type="text"
            placeholder="Search user..."
            className="w-full sm:w-72 border px-4 py-2 rounded-lg"
          />

          <select className="w-full sm:w-auto border px-4 py-2 rounded-lg">
            <option>All Roles</option>
            <option>Admin</option>
            <option>Author</option>
            <option>User</option>
          </select>

          <select className="w-full sm:w-auto border px-4 py-2 rounded-lg">
            <option>Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

        </div>

        {/* ================= MOBILE VIEW ================= */}
        <div className="sm:hidden space-y-4">
          {users.map((user) => (
            <div key={user._id} className="bg-white p-4 rounded-xl shadow space-y-3">

              {/* User Info */}
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">{user.name}</p>
                  <p className="text-xs text-gray-400">#{i++}</p>
                </div>
              </div>

              {/* Details */}
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-medium">Email:</span> {user.email}</p>
                <p><span className="font-medium">Role:</span> {user.role}</p>
              </div>

              {/* Status */}
              <span
                className={`inline-block px-3 py-1 text-xs rounded-full ${
                  user.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {user.status}
              </span>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm">
                  Edit
                </button>

                <button className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm">
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">

            <thead>
              <tr className="text-left text-gray-500 border-b text-sm">
                <th className="p-3">User</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">

                  {/* User */}
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={user.avatar}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-400">#{i++}</p>
                    </div>
                  </td>

                  <td className="p-3">{user.email}</td>

                  <td className="p-3">
                    <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600">
                      {user.role}
                    </span>
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="p-3 text-right space-x-2">
                    <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg">
                      Edit
                    </button>

                    <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg">
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* ================= PAGINATION ================= */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-4">

          <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
            Showing 1–10 of {users.length} users
          </p>

          <div className="flex flex-wrap justify-center sm:justify-end gap-2">
            <button className="px-3 py-1 border rounded-lg text-sm">Prev</button>

            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">
              1
            </button>

            <button className="px-3 py-1 border rounded-lg text-sm">2</button>

            <button className="px-3 py-1 border rounded-lg text-sm">Next</button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Users;