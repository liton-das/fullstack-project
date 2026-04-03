import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Layoutes from './Layoutes/Layoutes'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/public/Home'
import DashBoardLayoute from './Layoutes/DashBoardLayoute'
import Dashboard from './dashboard/Dashboard'
import { ToastContainer } from 'react-toastify';
import VerifyOtp from './pages/auth/VerifyOtp'
import ResendOtp from './pages/auth/ResendOtp'
import AllBlogs from './pages/blogs/AllBlogs'
import Users from './pages/blogs/Users'
import AllComments from './pages/blogs/AllComments'
import ReadBlog from './pages/blogs/ReadBlog'
import CreateBlog from './pages/blogs/CreateBlog'
import BlogDetails from './pages/BlogDetails'
import Blogs from './pages/public/Blogs'
import About from './pages/public/About'
import SearchItem from './pages/SearchItem'
const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route>
        {/* Public route */}
        <Route path='/' element={<Layoutes/>}>
          <Route index element={<Home/>}/>
          <Route path='/blog-details/:slug' element={<BlogDetails/>}/>
          <Route path='/blogs' element={<Blogs/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/search/:id' element={<SearchItem/>}/>
        </Route>
        {/* Dashboard route */}
        <Route path='/dashboard' element={<DashBoardLayoute/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='all-blogs' element={<AllBlogs/>}/>
          <Route path='create-blog' element={<CreateBlog/>}/>
          <Route path='users' element={<Users/>}/>
          <Route path='comments' element={<AllComments/>}/>
          <Route path='comments/read-blog/:slug' element={<ReadBlog/>}/>
        </Route>
      </Route>
      <Route path='/register' element={<Register/>}/>
      <Route path='/verify-otp' element={<VerifyOtp/>}/>
      <Route path='/resend-otp' element={<ResendOtp/>}/>
      <Route path='/login' element={<Login/>}/>
    </Route>
  ))

  
  return (
    <>
      <ToastContainer/>
     <RouterProvider router={router}/> 
    </>
  )
}

export default App
