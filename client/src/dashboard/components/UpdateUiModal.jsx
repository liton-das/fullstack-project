import React, { useRef, useState, useEffect } from "react";
import { FiX, FiImage } from "react-icons/fi";
import { useUpdateBlogMutation } from "../../services/api/api";

const UpdateUiModal = ({ isOpen, data, setIsOpen,handleEditOpen }) => {
  const blog = data;

  const [updateBlog, { isLoading }] = useUpdateBlogMutation();

  const fileRef = useRef();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    isActive: true,
    thumbnail: "",
  });

  const [preview, setPreview] = useState(null);
  const [thumbnailImg,setThumbnailImg] = useState(null);
// hadle edit open
const handleEditOpen = (blog) => {
  if (blog) {
    setFormData({
      title: blog.title || "",
      content: blog.content || "",
      tags: blog.tags || "",
      isActive: blog.isActive ?? true,
      thumbnail: blog.thumbnail || "",
    });
    setPreview(blog.thumbnail || "");
  }
  setIsOpen(true);
};


//   // Initialize data
//   useEffect(() => {
//   if (blog) {
//     setFormData({
//       title: blog.title || "",
//       content: blog.content || "",
//       tags: blog.tags || "",
//       isActive: blog.isActive ?? true,
//       thumbnail: blog.thumbnail || "",
//     });

//     setPreview(blog.thumbnail || "");
//   }
// }, [blog]);

  // handle input
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "isActive" ? value === "true" : value,
    });
  };

  // handle image
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setPreview(URL.createObjectURL(file));

    setThumbnailImg(file);
  };

  // UPDATE API
  const handleUpdate = async () => {
  try {
    const form = new FormData();

    form.append("title", formData.title);
    form.append("content", formData.content);
    form.append("tags", formData.tags);
    form.append("isActive", formData.isActive);
    form.append("thumbnail", thumbnailImg);

    const res = await updateBlog({
      id: blog._id,
      data: form,
    }).unwrap();

    console.log(res);
    setIsOpen(false);
  } catch (error) {
    console.log("Update failed:", error);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl overflow-hidden">

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
          <div className="flex flex-col items-center gap-3">
            <div
              onClick={() => fileRef.current.click()}
              className="w-28 h-28 rounded-xl border overflow-hidden cursor-pointer"
            >
              <img
                src={preview || "https://via.placeholder.com/150"}
                className="w-full h-full object-cover"
              />
            </div>

            <input
              ref={fileRef}
              type="file"
              hidden
              onChange={handleImageChange}
            />

            <span className="text-sm text-gray-500 flex items-center gap-2">
              <FiImage /> Change Image
            </span>
          </div>

          {/* FORM */}
          <div className="space-y-3">

            <input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="w-full border px-4 py-2 rounded-lg"
            />

            <input
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="Tags"
              className="w-full border px-4 py-2 rounded-lg"
            />

            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows="4"
              className="w-full border px-4 py-2 rounded-lg"
            />

            <select
              name="isActive"
              value={formData.isActive.toString()}
              onChange={handleInputChange}
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
  );
};

export default UpdateUiModal;