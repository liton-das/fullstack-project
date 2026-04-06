import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../pages/Footer'
import MobaileNav from '../components/ui/MobaileNav'

const Layoutes = () => {
  
  return (
    <>
        <Navbar/>
        <MobaileNav/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Layoutes
