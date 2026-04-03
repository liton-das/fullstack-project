import React from "react";
import { useGetReadBlogQuery } from "../services/api/api";
import Loading from "../components/ui/Loading";
import { useParams } from "react-router";
import moment from 'moment'
const BlogDetails = () => {
    const {slug} = useParams()
    const {data,isLoading} = useGetReadBlogQuery(slug)
    if(isLoading) return <Loading/>
  // 🔥 Dummy data (replace with API later)
  const blog = {
    title: "Mastering MERN Stack in 2026",
    image: "https://source.unsplash.com/random/1200x600?technology",
    author: {
      name: "Raj",
      avatar: "https://i.pravatar.cc/50",
    },
    createdAt: "March 30, 2026",
    content: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
      nisi ut aliquip ex ea commodo consequat.

      Duis aute irure dolor in reprehenderit in voluptate velit esse 
      cillum dolore eu fugiat nulla pariatur.
    `,
    tags: ["MERN", "JavaScript", "Web Dev"],
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ================= HERO IMAGE ================= */}
      <div className="w-full h-75 md:h-100 overflow-hidden">
        <img
          src={data?.data?.thumbnail  || blog.image}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-4xl mx-auto px-6 py-10 bg-white -mt-16 relative z-10 rounded-xl shadow">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {data?.data?.title || blog.title}
        </h1>

        {/* AUTHOR */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src={data?.data?.author?.avatar || blog.author.avatar}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-medium">{data?.data?.author?.fullName || blog.author.name}</p>
            <p className="text-xs text-gray-500">{moment(data?.data?.createdAt).fromNow() || blog.createdAt}</p>
          </div>
        </div>

        {/* SHARE */}
        <div className="flex gap-3 mb-6">
          <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg">
            Share
          </button>
          <button className="px-3 py-1 text-sm border rounded-lg">
            Bookmark
          </button>
        </div>

        {/* CONTENT */}
        <div className="prose max-w-none text-gray-700 whitespace-pre-line">
          {data?.data?.content ||blog.content}
        </div>

        {/* TAGS */}
        <div className="mt-8 flex flex-wrap gap-2">
          {data?.data?.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* ================= RELATED POSTS ================= */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-xl font-semibold mb-6">Related Posts</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden"
            >
              <img
                src={`https://source.unsplash.com/random/400x300?sig=${item}`}
                className="w-full h-40 object-cover"
              />

              <div className="p-4">
                <h3 className="text-sm font-semibold">
                  Sample Blog Title
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Quick short description...
                </p>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        © 2026 BlogForge
      </footer>

    </div>
  );
};

export default BlogDetails;