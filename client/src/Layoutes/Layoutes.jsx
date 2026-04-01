import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'

const Layoutes = () => {
  return (
    <>
        <Navbar/>
        <Outlet/>
    </>
  )
}

export default Layoutes
