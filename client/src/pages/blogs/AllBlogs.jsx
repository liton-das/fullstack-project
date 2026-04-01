import React from 'react'
import { Link, useSearchParams } from 'react-router';
import { useGetBlogListsQuery } from '../../services/api/api';
import Loading from '../../components/ui/Loading';
import moment from 'moment'
const AllBlogs = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams)
    const {data,isLoading} = useGetBlogListsQuery()
    if(isLoading) return <Loading/>
    console.log(data.data.data)
    let i=1
  return (
    <div>
      <div className="bg-white p-6 rounded-2xl shadow space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Blogs</h1>

        <Link
          to="/dashboard/create-post"
          className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
        >
          + Create Blog
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">

        <input
          type="text"
          placeholder="Search blog..."
          className="border px-4 py-2 rounded-lg w-72"
        />

        <select className="border px-4 py-2 rounded-lg">
          <option>All Categories</option>
          <option>Programming</option>
          <option>Backend</option>
        </select>

        <select className="border px-4 py-2 rounded-lg">
          <option>Status</option>
          <option>Published</option>
          <option>Draft</option>
        </select>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">

          <thead>
            <tr className="text-left text-gray-500 border-b">
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
              <tr key={blog?._id}  className="border-b hover:bg-gray-50">

                {/* Blog Info */}
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={blog?.thumbnail}
                    className="w-12 h-12 rounded-lg"
                  />
                  <div>
                    <p className="font-medium">{blog?.title}</p>
                    <p className="text-sm text-gray-400">
                      #{i++}
                    </p>
                  </div>
                </td>
                <td className="p-3">{blog?.slug}</td>
                <td className="p-3">{blog?.author?.fullName}</td>
                {/* Status */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      blog?.isActive === true
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {blog?.isActive === true ? 'Published' : 'Not Published' }
                  </span>
                </td>

                <td className="p-3 text-gray-500">
                  {moment(blog?.createdAt).fromNow()}
                </td>

                {/* Actions */}
                <td className="p-3 text-right space-x-2">

                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Edit
                  </button>

                  <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600">
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>

      {/* Pagination UI */}
      <div className="flex justify-between items-center pt-4">

        <p className="text-sm text-gray-500">
          Showing 1–10 of 50 blogs
        </p>

        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded-lg">
            Prev
          </button>

          <button className="px-3 py-1 bg-blue-600 text-white rounded-lg">
            1
          </button>

          <button className="px-3 py-1 border rounded-lg">
            2
          </button>

          <button className="px-3 py-1 border rounded-lg">
            Next
          </button>
        </div>

      </div>

    </div>
    </div>
  )
}

export default AllBlogs
