import React from 'react'
import { Navigate, Outlet } from 'react-router'
import Sidebar from '../dashboard/Sidebar'
import Navbar from '../dashboard/components/Navbar'
import { useGetProfileQuery } from '../services/api/api'
import Loading from '../components/ui/Loading'

const DashBoardLayoute = () => {
  const {data,isLoading} = useGetProfileQuery()
  if(isLoading) return <Loading/>
  if(!data?.success) return <Navigate to={'/login'}/>
  
  return (
    <div className="flex min-h-screen bg-gray-100">
        <Sidebar/>
      <div className="flex-1 flex flex-col">
          <Navbar/>
        <main className='flex-1 p-4 overflow-y-auto'>
          <Outlet/> 
        </main>
      </div>
    </div>
  )
}

export default DashBoardLayoute
