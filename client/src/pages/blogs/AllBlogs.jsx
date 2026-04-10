import React, { useEffect, useRef, useState } from "react";
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
import { FiImage, FiX } from "react-icons/fi";
const AllBlogs = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [deleteBlog, { isLoading: loaded }] = useDeleteSingleBlogMutation();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetSingleBlogByAuthorIdQuery({ page, limit: 10 });
  // update fields state
  const [inputFields, setInputFields] = useState({
    title: "",
    content: "",
    tags: "",
    isActive: true,
    thumbnail: "",
  });
  const [updateBlog, { isLoading: updating }] = useUpdateBlogMutation();
  // open edit modal
  const [isOpen, setIsOpen] = useState(false);
  // frontend image preview state
  const [preview, setPreview] = useState(null);
  const [thumbnailImg, setThumbnailImg] = useState(null);
  // setBlogData State
  const [blogData,setBlogData]=useState(null)
  const currentImg = useRef();
  // handle preview image function
  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    const imgUrl = URL.createObjectURL(file);
    setPreview(imgUrl);
    setThumbnailImg(file);
  };
  // change input fields
  const handleInputChange = (e) => {
    setInputFields({
      ...inputFields,
      [e.target.name]:e.target.value
    });
  };

  // handle modal open function
  const handleOpen = (blog) => {
    setInputFields({
      title: blog.title || "",
      content: blog.content || "",
      tags: blog.tags || "",
      isActive: blog.isActive ?? true,
    });
    setBlogData(blog)
    setPreview(blog?.thumbnail || "");
    setIsOpen(true);
  };

  // handle submit update function
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", inputFields.title);
    formData.append("content", inputFields.content);
    formData.append("tags", inputFields.tags);
    formData.append("isActive", inputFields.isActive);
    formData.append("thumbnail", thumbnailImg);
    try {
      const res = await updateBlog({ id:blogData?._id, data:formData }).unwrap();
      if (res?.success) {
        const audio = new Audio("/notify-sound.wav");
        audio.volume = 0.5;
        audio.play();
        showMsg.success(res?.message);
        setIsOpen(false);
      }
    } catch (e) {
      showMsg.error(e?.data?.message);
    }
  };

  // handle delete function
  const handleDelete = async (id) => {
    try {
      const res = await deleteBlog(id).unwrap();
      // add sound for delete
      if (res?.success) {
        const audio = new Audio("/delete-sound.wav");
        audio.volume = 0.5;
        audio.play();
        showMsg.success(res?.message);
      }
    } catch (e) {
      showMsg.error(e?.data?.message);
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
  if (isLoading) return <Loading />;
  // for user id
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
                <button
                  onClick={() => handleOpen(blog)}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm"
                >
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
                          disabled={loaded}
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
      {/* Update Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <form
            onSubmit={handleSubmitUpdate}
            className="bg-white w-full max-w-xl rounded-2xl shadow-xl overflow-hidden"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center px-5 py-4 border-b">
              <h2 className="text-lg font-semibold">Update Blog</h2>
              <button onClick={() => setIsOpen(false)}>
                <FiX size={20} />
              </button>
            </div>

            {/* BODY */}
            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* IMAGE */}
              <div
                onClick={() => currentImg.current?.click()}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-28 h-28 rounded-xl border overflow-hidden cursor-pointer">
                  <img src={preview} className="w-full h-full object-cover" />
                </div>

                <input ref={currentImg} type="file" hidden onChange={handlePreviewImage} />

                <span className="text-sm text-gray-500 flex items-center gap-2">
                  <FiImage /> Change Image
                </span>
              </div>

              {/* FORM */}
              <div className="space-y-3">
                <input
                  name="title"
                  onChange={handleInputChange}
                  value={inputFields.title}
                  placeholder="Title"
                  className="w-full border px-4 py-2 rounded-lg"
                />

                <input
                  name="tags"
                  onChange={handleInputChange}
                  value={inputFields.tags}
                  placeholder="Tags"
                  className="w-full border px-4 py-2 rounded-lg"
                />

                <textarea
                  name="content"
                  onChange={handleInputChange}
                  value={inputFields.content}
                  placeholder="Content"
                  rows="4"
                  className="w-full border px-4 py-2 rounded-lg"
                />

                <select
                  name="isActive"
                  onChange={handleInputChange}
                  value={inputFields.isActive}
                  className="w-full border px-4 py-2 rounded-lg"
                >
                  <option value="true">Published</option>
                  <option value="false">Draft</option>
                </select>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 p-5 border-t">
              <button onClick={() => setIsOpen(false)} className="px-4 py-2 border rounded-lg">
                Cancel
              </button>

              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                {updating ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};;

export default AllBlogs;
