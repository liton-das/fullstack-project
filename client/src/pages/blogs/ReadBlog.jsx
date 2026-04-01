import React from 'react'
import { Link, useParams } from 'react-router';
import Loading from '../../components/ui/Loading';
import { useGetReadBlogQuery } from '../../services/api/api';
import moment from 'moment'
const ReadBlog = () => {
    const {slug}=useParams()
    const {data,isLoading}=useGetReadBlogQuery(slug)
    if(isLoading) return <Loading/>
    
  return (
    <div>
       <div className="bg-white p-6 rounded-2xl shadow space-y-6">

      {/* Header */}
      <div className="flex justify-between items-start">

        <div>
          <h1 className="text-3xl font-bold">
            {data?.data?.title}
          </h1>

          <div className="flex gap-4 mt-2 text-sm text-gray-500">
            <span>By {data?.data?.author?.fullName}</span>
            <span>• {moment(data?.createdAt).fromNow()}</span>
            <span>• {data?.data?.slug}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">

          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Edit
          </button>

          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Delete
          </button>

        </div>

      </div>

      {/* Status Badge */}
      <div>
        <span
          className={`px-3 py-1 text-sm rounded-full ${
            data?.data?.status !== "Published"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          Published
        </span>
      </div>

      {/* Cover Image */}
      <div>
        <img
          src={data?.data?.thumbnail}
          alt="blog cover"
          className="w-full h-80 object-cover rounded-xl"
        />
      </div>

      {/* Content */}
      <div className="prose max-w-none">

        <p className="text-gray-700 leading-relaxed">
          {data?.data?.content}
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Tags
        </h2>

        <ul className="list-disc pl-6">
            {
                data?.data?.tags?.map((tag,i)=>(
                    <li key={i}>{tag}</li>
                ))
            }
        </ul>

      </div>

      {/* Footer Actions */}
      <div className="flex justify-between items-center border-t pt-4">

        <Link to={'/dashboard/comments'} className="text-gray-500 hover:underline">
          ← Back to Blogs
        </Link>

        <div className="flex gap-3">
          <button className="px-4 py-2 border rounded-lg">
            Draft
          </button>

          <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
            Publish
          </button>
        </div>

      </div>

    </div>
    </div>
  )
}

export default ReadBlog
