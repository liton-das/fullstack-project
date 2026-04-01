import React from 'react'
import { useGetUserListsQuery } from '../../services/api/api';
import Loading from '../../components/ui/Loading';

const Users = () => {
    const{data,isLoading} = useGetUserListsQuery()
    console.log(data?.data?.data)
    if(isLoading) return <Loading/>
    let i=1
  return (
    <div>
      <div className="bg-white p-6 rounded-2xl shadow space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Users</h1>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700">
          + Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">

        <input
          type="text"
          placeholder="Search user..."
          className="border px-4 py-2 rounded-lg w-72"
        />

        <select className="border px-4 py-2 rounded-lg">
          <option>All Roles</option>
          <option>Admin</option>
          <option>Author</option>
          <option>User</option>
        </select>

        <select className="border px-4 py-2 rounded-lg">
          <option>Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">

          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>

            {data?.data?.data?.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">

                {/* User Info */}
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={user.avatar}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-400">
                      #{i++}
                    </p>
                  </div>
                </td>

                <td className="p-3">{user.email}</td>

                {/* Role */}
                <td className="p-3">
                  <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600">
                    {user.role}
                  </span>
                </td>

                {/* Status */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      user.status !== "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    Actve
                  </span>
                </td>

                {/* Actions */}
                <td className="p-3 text-right space-x-2">

                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Edit
                  </button>

                  <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600">
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>

      {/* Pagination UI */}
      <div className="flex justify-between items-center pt-4">

        <p className="text-sm text-gray-500">
          Showing 1–10 of 30 users
        </p>

        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded-lg">
            Prev
          </button>

          <button className="px-3 py-1 bg-blue-600 text-white rounded-lg">
            1
          </button>

          <button className="px-3 py-1 border rounded-lg">
            2
          </button>

          <button className="px-3 py-1 border rounded-lg">
            Next
          </button>
        </div>

      </div>

    </div>
    </div>
  )
}

export default Users
