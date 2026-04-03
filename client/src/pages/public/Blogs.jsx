import React from "react";
import { Link } from "react-router";

const blogs = [
  {
    id: 1,
    title: "The Future of AI in 2026",
    category: "Tech",
    author: "John Doe",
    date: "April 2, 2026",
    image: "https://via.placeholder.com/400",
    description:
      "Artificial Intelligence is evolving faster than ever. Let's explore what the future holds...",
  },
  {
    id: 2,
    title: "Top 10 Travel Destinations",
    category: "Travel",
    author: "Sarah Lee",
    date: "March 28, 2026",
    image: "https://via.placeholder.com/400",
    description:
      "Looking for your next adventure? Here are the top places you should visit...",
  },
  {
    id: 3,
    title: "Healthy Lifestyle Tips",
    category: "Health",
    author: "Michael Smith",
    date: "March 20, 2026",
    image: "https://via.placeholder.com/400",
    description:
      "Maintaining a healthy lifestyle doesn't have to be hard. Start with these simple tips...",
  },
];

const Blogs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <section className="text-center py-12 px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold">Our Blogs ✍️</h1>
        <p className="text-gray-500 mt-3">
          Insights, tutorials, and stories from our team
        </p>
      </section>

      {/* BLOG GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
            >
              {/* IMAGE */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />

              {/* CONTENT */}
              <div className="p-5 space-y-3">

                {/* CATEGORY */}
                <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                  {blog.category}
                </span>

                {/* TITLE */}
                <h2 className="text-lg font-semibold hover:text-blue-600 cursor-pointer">
                  {blog.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-sm text-gray-500 line-clamp-2">
                  {blog.description}
                </p>

                {/* AUTHOR + DATE */}
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>{blog.author}</span>
                  <span>{blog.date}</span>
                </div>

                {/* BUTTON */}
                <Link
                  to={`/blog/${blog.id}`}
                  className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Read More
                </Link>

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* PAGINATION */}
      <div className="flex justify-center gap-2 pb-10">
        <button className="px-3 py-1 border rounded-lg">Prev</button>
        <button className="px-3 py-1 bg-blue-600 text-white rounded-lg">
          1
        </button>
        <button className="px-3 py-1 border rounded-lg">2</button>
        <button className="px-3 py-1 border rounded-lg">Next</button>
      </div>

    </div>
  );
};

export default Blogs;