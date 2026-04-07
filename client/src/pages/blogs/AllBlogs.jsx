import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  useDeleteSingleBlogMutation,
  useGetSearchItemsQuery,
  useGetSingleBlogByAuthorIdQuery,
  useUpdateBlogMutation,
} from "../../services/api/api";
import Loading from "../../components/ui/Loading";
import moment from "moment";
import showMsg from "../../utils/getMessage";
import UpdateUiModal from "../../dashboard/components/UpdateUiModal";
const AllBlogs = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [deleteBlog, { isLoading: loaded }] = useDeleteSingleBlogMutation();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetSingleBlogByAuthorIdQuery({ page, limit: 10 });
  // handle delete function
  const handleDelete = async (id) => {
    try {
      await deleteBlog(id).unwrap();

      showMsg.success("Blog deleted successfully");
    } catch (e) {
      showMsg.error(e?.data?.message || "Failed to delete blog");
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 3000);

    return () => clearTimeout(timer);
  }, [search]);
  const { data: searchTerms } = useGetSearchItemsQuery(debouncedSearch, {
    skip: !debouncedSearch, // don't call API when empty
  });

  // handle modal open function
  const [isOpen, setIsOpen] = useState(false);
  // handle open function
  
const [selectedBlog, setSelectedBlog] = useState(null);

const handleOpen = (blog) => {
  setSelectedBlog(blog); // ✅ set clicked blog
  setIsOpen(true);
};




 
  if (isLoading) return <Loading />;
  console.log(data?.data?.data);
  let i = 1;



  return (
    <div>
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-bold">All Blogs</h1>

          <Link
            to="/dashboard/create-blog"
            className="w-full sm:w-auto text-center bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
          >
            + Create Blog
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <input
            type="text"
            placeholder="Search blog..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-lg w-full sm:w-72"
          />

          <select className="border px-4 py-2 rounded-lg w-full sm:w-auto">
            <option>All Categories</option>
            <option>Programming</option>
            <option>Backend</option>
          </select>

          <select className="border px-4 py-2 rounded-lg w-full sm:w-auto">
            <option>Status</option>
            <option>Published</option>
            <option>Draft</option>
          </select>
        </div>
        {/* ================= MOBILE VIEW (CARD) ================= */}
        <div className="sm:hidden space-y-4">
          {(searchTerms?.data || data?.data?.data || []).map((blog) => (
            <div key={blog._id} className="bg-white p-4 rounded-xl shadow space-y-3">
              {/* Image + Title */}
              <div className="flex gap-3">
                <img src={blog.thumbnail} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <p className="font-semibold text-sm line-clamp-2">{blog.title}</p>
                  <p className="text-xs text-gray-400">{moment(blog.createdAt).fromNow()}</p>
                </div>
              </div>

              {/* Info */}
              <div className="text-xs text-gray-500 space-y-1">
                <p>
                  <span className="font-medium">Slug:</span> {blog.slug}
                </p>
                <p>
                  <span className="font-medium">Author:</span> {blog.author?.fullName}
                </p>
              </div>

              {/* Status */}
              <span
                className={`inline-block px-3 py-1 text-xs rounded-full ${
                  blog.isActive ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {blog.isActive ? "Published" : "Draft"}
              </span>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm">
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(blog._id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full min-w-150">
            <thead>
              <tr className="text-left text-gray-500 border-b text-xs sm:text-sm">
                <th className="p-3">Blog</th>
                <th className="p-3">Slug</th>
                <th className="p-3">Author</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {searchTerms?.data?.map((blog) => (
                <div key={blog._id} className="p-3 border rounded-lg">
                  <p className="font-semibold">{blog.title}</p>
                  <p className="text-sm text-gray-500">{blog.slug}</p>
                </div>
              )) ||
                data?.data?.data?.map((blog) => (
                  // open edit modal on click
                  <>
                    <tr key={blog?._id} className="border-b hover:bg-gray-50 text-xs sm:text-sm">
                      {/* Blog Info */}
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={blog?.thumbnail}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium line-clamp-1">{blog?.title}</p>
                            <p className="text-gray-400 text-xs">#{i++}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-3 truncate max-w-30">{blog?.slug}</td>

                      <td className="p-3">{blog?.author?.fullName}</td>

                      {/* Status */}
                      <td className="p-3">
                        <span
                          className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full ${
                            blog?.isActive
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {blog?.isActive ? "Published" : "Not Published"}
                        </span>
                      </td>

                      <td className="p-3 text-gray-500">{moment(blog?.createdAt).fromNow()}</td>

                      {/* Actions */}
                      <td className="p-3 text-right space-x-1 sm:space-x-2">
                        <button
                          onClick={() => handleOpen(blog)}
                          className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          disabled={loaded}
                          className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                        >
                          {loaded ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-4">
          <p className="text-xs sm:text-sm text-gray-500">
            Showing {data?.data?.pagination?.page}–{data?.data?.pagination?.limit} of{" "}
            {data?.data?.pagination?.totalItems} blogs
          </p>

          <div className="flex flex-wrap justify-center sm:justify-end gap-2">
            {/* Prev */}
            <button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
              className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50"
            >
              Prev
            </button>

            {/* Pages */}
            {Array.from({ length: data?.data?.pagination?.totalPages || 1 }, (_, i) => i + 1).map(
              (p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 text-sm rounded-lg border ${
                    page === p ? "bg-blue-600 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              ),
            )}

            {/* Next */}
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === data?.data?.pagination?.totalPages}
              className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <UpdateUiModal
          isOpen={isOpen}
          data={selectedBlog} // ✅ NOT full API response
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default AllBlogs;
