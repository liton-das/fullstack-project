import React, { useState } from 'react'
import StatsCard from './components/StatsCard'
import { useGetBlogListsQuery, useGetCommentListsQuery } from '../services/api/api'
import Loading from '../components/ui/Loading'
import { Link } from 'react-router'

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const {data,isLoading} = useGetBlogListsQuery({page,limit:10})
  console.log(data)
  const {data:comments} = useGetCommentListsQuery()
  if(isLoading) return <Loading/>
  return (
    <>
      <div className="space-y-6 sm:space-y-8">

  {/* Welcome Section */}
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-xl shadow mt-2">

    <div>
      <h1 className="text-xl sm:text-2xl font-bold">
        Welcome back 👋
      </h1>

      <p className="text-gray-500 text-sm sm:text-base">
        Manage your BlogForge content from here
      </p>
    </div>

    <Link to="/dashboard/create-blog" className="w-full sm:w-auto">
      <button className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded-lg">
        + Create Blog
      </button>
    </Link>

  </div>

  {/* Stats Section */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

    <Link to="all-blogs">
      <StatsCard
        title="Total Blogs"
        value={data?.data?.pagination?.totalItems}
      />
    </Link>

    <Link to="users">
      <StatsCard
        title="Users"
        value={data?.data?.totalUsers}
      />
    </Link>

    <Link to="comments">
      <StatsCard
        title="Comments"
        value={comments?.data?.data.length}
      />
    </Link>


  </div>

  {/* Recent Blogs */}
  <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
    <h2 className="text-lg sm:text-xl font-semibold mb-4">
      Recent Blogs
    </h2>

    <div className="space-y-4">

      {data?.data?.data.map((blog) => (
        <div
          key={blog?._id}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b pb-3"
        >
          <div>
            <h3 className="font-medium text-sm sm:text-base">
              {blog?.title}
            </h3>

            <p className="text-xs sm:text-sm text-gray-500">
              {blog?.author?.fullName}
            </p>
          </div>

          <span className="text-xs sm:text-sm text-gray-400">
            2 days ago
          </span>
        </div>
      ))}

    </div>
  </div>

  {/* Latest Comments */}
  <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
    <h2 className="text-lg sm:text-xl font-semibold mb-4">
      Latest Comments
    </h2>

    <div className="space-y-3">

      <div className="border-b pb-3">
        <p className="text-xs sm:text-sm">
          <span className="font-semibold">Rahim:</span> Great article!
        </p>
      </div>

      <div className="border-b pb-3">
        <p className="text-xs sm:text-sm">
          <span className="font-semibold">Karim:</span> Very helpful tutorial.
        </p>
      </div>

    </div>
  </div>

</div>
    </>
  );
}

export default Dashboard
