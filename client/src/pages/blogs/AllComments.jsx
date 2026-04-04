import React from "react";
import { useGetCommentListsQuery } from "../../services/api/api";
import Loading from "../../components/ui/Loading";
import moment from "moment";
import { Link } from "react-router";

const AllComments = () => {
  const { data, isLoading } = useGetCommentListsQuery();

  if (isLoading) return <Loading />;

  const comments = data?.data?.data || [];

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6">

      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow space-y-6">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-bold">All Comments</h1>
        </div>

        {/* ================= FILTERS ================= */}
        <div className="flex flex-col sm:flex-row gap-3 sm:flex-wrap">

          <input
            type="text"
            placeholder="Search comment..."
            className="w-full sm:w-72 border px-4 py-2 rounded-lg"
          />

          <select className="w-full sm:w-auto border px-4 py-2 rounded-lg">
            <option>Status</option>
            <option>Approved</option>
            <option>Pending</option>
          </select>

        </div>

        {/* ================= MOBILE VIEW ================= */}
        <div className="sm:hidden space-y-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-white p-4 rounded-xl shadow space-y-3"
            >
              {/* User */}
              <div className="flex items-center gap-3">
                <img
                  src={comment?.author?.avatar}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">
                    {comment?.author?.fullName}
                  </p>
                  <p className="text-xs text-gray-400">
                    {moment(comment?.createdAt).fromNow()}
                  </p>
                </div>
              </div>

              {/* Comment */}
              <p className="text-sm text-gray-700">
                {comment?.comment_body}
              </p>

              {/* Blog */}
              <Link
                to={`read-blog/${comment?.blogId?.slug}`}
                className="text-blue-600 text-sm hover:underline"
              >
                {comment?.blogId?.slug}
              </Link>

              {/* Status */}
              <span
                className={`inline-block px-3 py-1 text-xs rounded-full ${
                  comment.status === "Approved"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {comment.status}
              </span>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm">
                  Approve
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
                <th className="p-3">Comment</th>
                <th className="p-3">Blog</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {comments.map((comment) => (
                <tr key={comment._id} className="border-b hover:bg-gray-50">

                  {/* User */}
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={comment?.author?.avatar}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium">
                      {comment?.author?.fullName}
                    </span>
                  </td>

                  {/* Comment */}
                  <td className="p-3 max-w-xs">
                    <p className="truncate">
                      {comment?.comment_body}
                    </p>
                  </td>

                  {/* Blog */}
                  <td className="p-3">
                    <Link
                      to={`read-blog/${comment?.blogId?.slug}`}
                      className="text-blue-600 hover:underline"
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
                  <td className="p-3 text-gray-500">
                    {moment(comment?.createdAt).fromNow()}
                  </td>

                  {/* Actions */}
                  <td className="p-3 text-right space-x-2">
                    <button className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg">
                      Approve
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
            Showing 1–10 of {comments.length} comments
          </p>

          <div className="flex flex-wrap justify-center sm:justify-end gap-2">
            <button className="px-3 py-1 border rounded-lg text-sm">
              Prev
            </button>

            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">
              1
            </button>

            <button className="px-3 py-1 border rounded-lg text-sm">
              2
            </button>

            <button className="px-3 py-1 border rounded-lg text-sm">
              Next
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AllComments;