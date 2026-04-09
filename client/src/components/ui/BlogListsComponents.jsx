import React, { useState } from "react";
import { useCreateCommentMutation, useGetBlogListsQuery } from "../../services/api/api";
import { Link } from "react-router";
import { FaComment } from "react-icons/fa";
import showMsg from "../../utils/getMessage";
import Loading from "./Loading";
import BottomToUpButton from "./BottomToUpButton";
const BlogListsComponents = ({headContent,title,limit=6}) => {
  const [page, setPage] = useState(1);
  // comment state (store per blogId)
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState({});
  const [isComment,setIsComment] = useState(null);
  const { data, isLoading, isError } = useGetBlogListsQuery({
    page,
    limit,
  });
  
  const blogs = data?.data?.data || [];
  const [createComment ] = useCreateCommentMutation();
  
  // handle comment submit
  const handleCommentSubmit = async (blogId) => {
    const text = commentInput[blogId];
    if (!text?.trim()) return;
    try {
      const res = await createComment({ id:blogId, commentBody: text  }).unwrap();
      // Update local state to show new comment immediately
      setComments((prev) => ({
        ...prev,
        [blogId] : [...(prev[blogId] || []), text],
      }));
      showMsg.success(res?.message);
      setCommentInput((prev) => ({ ...prev, [blogId]: "" })); // Clear input
      setIsComment(false) // close comment box after submit
    } catch (e) {
      showMsg.error(e?.data?.message);
    }
  };

  

  const handleCommentToggle = (blogId) => {  
    const current = isComment === blogId ? false : blogId; // toggle logic
    setIsComment(current);  
  }
  if(isLoading) return <Loading/>
  if(isError) return <div className="text-center text-red-500 py-10">Failed to load blogs</div>
  if(blogs.length === 0) return <div className="text-center py-10">No blogs found</div>
  return (
    <div className="bg-gray-50 min-h-screen">
      <BottomToUpButton/>
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-10 text-center">
        <h2 className="text-3xl font-bold">{headContent}</h2>
        <p className="text-gray-500 mt-2">
          {title}
        </p>
      </section>

      {/* LOADING */}
      {isLoading && (
        <div className="text-center py-10">Loading blogs...</div>
      )}

      {/* ERROR */}
      {isError && (
        <div className="text-center text-red-500 py-10">
          Failed to load blogs
        </div>
      )}

      {/* BLOG GRID */}
      {!isLoading && !isError && (
        <section className="max-w-7xl mx-auto px-6 pb-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                {/* IMAGE */}
                <img
                  src={blog.thumbnail || "https://via.placeholder.com/400"}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />

                {/* CONTENT */}
                <div className="p-5 space-y-3">
                  <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    {blog.category || "General"}
                  </span>

                  <h3 className="text-lg font-semibold">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-gray-500 line-clamp-2">
                    {blog.content}
                  </p>

                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>{blog.author?.fullName || "Unknown"}</span>

                    <Link to={`/blog-details/${blog?.slug}`} className="text-blue-600 hover:underline">
                      Read More →
                    </Link>
                  </div>

                  {/* ================= COMMENTS SECTION ================= */}
                  <div className="pt-3 border-t mt-3 space-y-2">
                    <div onClick={() => handleCommentToggle(blog._id)} className="flex items-center gap-2 text-blue-600 hover:underline">
                      <h4 className="text-sm font-semibold ">Comments</h4>
                      <FaComment/>
                    </div> 
                  {
                    isComment === blog._id &&
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleCommentSubmit(blog._id);
                    }} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={commentInput[blog._id] || ""}
                        onChange={(e) =>
                          setCommentInput((prev) => ({
                            ...prev,
                            [blog._id]: e.target.value,
                          }))
                        }
                        className="flex-1 border px-2 py-1 rounded text-sm"
                      />

                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Post
                      </button>
                    </form>

                  }
                    

                    {/* COMMENT LIST */}
                    <div className="space-y-1 max-h-24 overflow-y-auto">
                      {(blog.comments || []).map((c, index) => (
                        console.log(c),
                        <p
                          key={index}
                          className="text-xs bg-gray-100 px-2 py-1 rounded"
                        >
                          {c.comment_body}
                        </p>
                      ))}
                    </div>

                    

                  </div>
                  {/* ================= END COMMENTS ================= */}

                </div>
              </div>
            ))}

          </div>
        </section>
      )}

      {/* PAGINATION */}
      
      
      <div className="flex flex-wrap justify-center sm:justify-center gap-2 mt-4 mb-3">
            {/* Prev */}
            <button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
              className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50"
            >
              Prev
            </button>

            {/* Pages */}
            {Array.from({ length: data?.data?.pagination.totalPages || 1 }, (_, i) => i + 1).map(
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

  );
};

export default BlogListsComponents;