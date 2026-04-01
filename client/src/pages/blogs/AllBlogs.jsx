import React, { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { useGetBlogListsQuery, useUpdateBlogMutation } from "../../services/api/api";
import Loading from "../../components/ui/Loading";
import moment from "moment";
import showMsg from "../../utils/getMessage";
const AllBlogs = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    isActive: false,
  });

  const [thumbnail, setThumbnail] = useState(null); // new file
  const [preview, setPreview] = useState(""); // preview image
  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: name === "isActive" ? value === "true" : value,
  }));
};

// handle image upload
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setThumbnail(file);
  setPreview(URL.createObjectURL(file)); // live preview
};

const [updateBlog, { isLoading:loadData }] = useUpdateBlogMutation();
const handleUpdate = async () => {
  try {
    const data = new FormData();

    data.append("title", formData.title);
    data.append("slug", formData.slug);
    data.append("content", formData.content);
    data.append("isActive", formData.isActive);

    // only append image if user changed it
    if (thumbnail) {
      data.append("thumbnail", thumbnail);
    }

   const res =  await updateBlog({
      id: selectedBlog._id,
      data,
    }).unwrap();
    console.log(res)
    showMsg.success(res?.message)
    setIsOpen(false);
  } catch (e) {
    showMsg.error(e?.data?.message)
  }
};


  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  console.log(searchParams);
  const { data, isLoading } = useGetBlogListsQuery({ page, limit: 10 });
  if (isLoading) return <Loading />;
  console.log(data?.data?.pagination);
  let i = 1;



  return (
    <div>
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-bold">All Blogs</h1>

          <Link
            to="/dashboard/create-post"
            className="w-full sm:w-auto text-center bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
          >
            + Create Blog
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="Search blog..."
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

        {/* Table */}
        <div className="overflow-x-auto">
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
              {data?.data?.data?.map((blog) => (
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
                      onClick={() => {
                        setSelectedBlog(blog);

                        setFormData({
                          title: blog.title,
                          slug: blog.slug,
                          content: blog.content,
                          isActive: blog.isActive,
                        });

                        setPreview(blog.thumbnail); // existing image
                        setThumbnail(null); // reset new file

                        setIsOpen(true);
                      }}
                      className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-red-500 text-white rounded-lg hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
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

          <div className="flex gap-2 flex-wrap">
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
{/* Modal */}
      {isOpen && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

    <div className="bg-white w-full max-w-lg rounded-xl p-6 space-y-4">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Edit Blog</h2>

        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 text-xl"
        >
          ✕
        </button>
      </div>

      {/* Image Preview */}
      <div className="flex flex-col items-center gap-3">
        <img
          src={preview}
          alt="preview"
          className="w-32 h-32 object-cover rounded-lg border"
        />

        <input
          type="file"
          onChange={handleImageChange}
          className="text-sm"
        />
      </div>

      {/* Form */}
      <div className="space-y-4">

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
          placeholder="Title"
        />

        <input
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
          placeholder="Slug"
        />

        <textarea
          rows="4"
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
          placeholder="Content"
        />

        <select
          name="isActive"
          value={formData.isActive.toString()}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
        >
          <option value="true">Published</option>
          <option value="false">Draft</option>
        </select>

      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={handleUpdate}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          {isLoading ? "Updating..." : "Save Changes"}
        </button>
      </div>

    </div>

  </div>
)}
    </div>
  );
};

export default AllBlogs;
