import React from 'react'
import { useGetCommentListsQuery } from '../../services/api/api';
import Loading from '../../components/ui/Loading';
import moment from 'moment';
import { Link, useParams } from 'react-router';

const AllComments = () => {
    const {data,isLoading} = useGetCommentListsQuery()
    if(isLoading) return <Loading/>
    console.log(data?.data?.data)
  return (
    <div>
      <div className="bg-white p-6 rounded-2xl shadow space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">All Comments</h1>

          <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700">
            Manage Settings
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search comment..."
            className="border px-4 py-2 rounded-lg w-72"
          />

          <select className="border px-4 py-2 rounded-lg">
            <option>Status</option>
            <option>Approved</option>
            <option>Pending</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="p-3">User</th>
                <th className="p-3">Comment</th>
                <th className="p-3">Blog</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data?.data?.data?.map((comment) => (
                <tr key={comment.id} className="border-b hover:bg-gray-50">
                  {/* User */}
                  <td className="p-3 flex items-center gap-3">
                    <img src={comment?.author?.avatar} className="w-10 h-10 rounded-full" />
                    <span className="font-medium">{comment?.author?.fullName}</span>
                  </td>

                  {/* Comment Text */}
                  <td className="p-3 max-w-xs">
                    <p className="truncate">{comment?.comment_body}</p>
                  </td>

                  {/* Blog */}
                  <td>
                    <Link
                      to={`read-blog/${comment?.blogId?.slug}`}
                      className="p-3 text-blue-600 cursor-pointer hover:underline"
                    >
                      {comment?.blogId?.slug}
                    </Link>
                  </td>

                  {/* Status */}
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        comment.status === "Approved"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {comment.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="p-3 text-gray-500">{moment(comment?.createdAt).fromNow()}</td>

                  {/* Actions */}
                  <td className="p-3 text-right space-x-2">
                    <button className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600">
                      Approve
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

        {/* Pagination */}
        <div className="flex justify-between items-center pt-4">
          <p className="text-sm text-gray-500">Showing 1–10 of 45 comments</p>

          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-lg">Prev</button>

            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg">1</button>

            <button className="px-3 py-1 border rounded-lg">2</button>

            <button className="px-3 py-1 border rounded-lg">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllComments
