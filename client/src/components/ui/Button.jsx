import React from 'react'

const Button = ({children,type,variant="primary",disabled=false,onClick}) => {
    const baseStyle = "px-5 py-2 bg-blue-500 rounded-md font-medium transition duration-200 focus:outline-none"
    const variants ={
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400",
        secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-400",
        outline: "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-400",
    }
  return (
    <>
      <button type={type} disabled={disabled} onClick={onClick} className={`${baseStyle}${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed':""}`}>
        {children}
      </button>
    </>
  )
}

export default Button
