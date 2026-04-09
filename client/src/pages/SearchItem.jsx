import React from "react";
import {  Link, useParams } from "react-router";
import { useGetSearchItemsQuery } from "../services/api/api";

const SearchItem = () => {
  //  get query from URL
  const search = useParams()
  //  API call
  const { data, isLoading, isError } = useGetSearchItemsQuery(search);
console.log({
  search,
  data,
  isLoading,
  isError,
});

// adjust based on backend
const results = data?.data || [];
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HEADER */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold">
          Search Results for:{" "}
          <span className="text-blue-600">"{search?.id}"</span>
        </h1>
      </section>

      {/* LOADING */}
      {isLoading && (
        <div className="text-center py-10">Searching...</div>
      )}

      {/* ERROR */}
      {isError && (
        <div className="text-center text-red-500 py-10">
          Something went wrong
        </div>
      )}

      {/* RESULTS */}
      {!isLoading && !isError && (
        <section className="max-w-6xl mx-auto px-6 pb-12">

          {results.length === 0 ? (
            <div className="text-center text-gray-500">
              No results found 😢
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {results.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  {/* IMAGE */}
                  <img
                    src={
                      item?.thumbnail ||
                      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400"
                    }
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />

                  {/* CONTENT */}
                  <div className="p-5 space-y-3">

                    {/* CATEGORY */}
                    <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                      {item.category || "General"}
                    </span>

                    {/* TITLE */}
                    <h2 className="text-lg font-semibold">
                      {item.title}
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {item.content}
                    </p>

                    {/* AUTHOR */}
                    <div className="text-sm text-gray-400">
                      {item.author?.fullName || "Unknown"}
                    </div>

                    {/* BUTTON */}
                    <Link
                      to={`/blog/${item._id}`}
                      className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                      Read More
                    </Link>

                  </div>
                </div>
              ))}

            </div>
          )}

        </section>
      )}

    </div>
  );
};

export default SearchItem;