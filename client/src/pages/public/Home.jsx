import React from "react";

const blogs = [
  {
    id: 1,
    title: "Mastering MERN Stack in 2026",
    desc: "Learn how to build scalable apps using MERN stack.",
    image: "https://source.unsplash.com/random/800x600?coding",
    category: "Development",
    author: "John Doe",
  },
  {
    id: 2,
    title: "AI in Modern Web Development",
    desc: "Explore how AI is transforming frontend and backend.",
    image: "https://source.unsplash.com/random/800x600?ai",
    category: "AI",
    author: "Jane Smith",
  },
  {
    id: 3,
    title: "Design Systems for SaaS Apps",
    desc: "Build consistent UI using design systems.",
    image: "https://source.unsplash.com/random/800x600?design",
    category: "Design",
    author: "Alex Ray",
  },
];

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Discover Amazing Blogs 🚀
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Explore articles on development, AI, and modern technologies.
        </p>
      </section>

      {/* ================= SEARCH ================= */}
      <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search blogs..."
          className="w-full md:w-96 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ================= BLOG GRID ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* Image */}
              <img
                src={blog.image}
                alt=""
                className="w-full h-48 object-cover"
              />

              {/* Content */}
              <div className="p-5 space-y-3">
                <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                  {blog.category}
                </span>

                <h3 className="text-lg font-semibold">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {blog.desc}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>{blog.author}</span>
                  <button className="text-blue-600 hover:underline">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t py-6 text-center text-sm text-gray-500">
        © 2026 BlogForge. All rights reserved.
      </footer>

    </div>
  );
};

export default Home;