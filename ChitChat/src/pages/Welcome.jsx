import React from 'react'
import { useLocation } from 'react-router-dom';
const Welcome = () => {
  const data = JSON.parse(localStorage.getItem("userData"))
  let location = useLocation();
  return (

    <div className={`grow bg-white ${location.pathname=="/app"?"hidden":"flex"} border-slate-200 rounded-lg p-2 md:flex flex-col justify-center `} >
      <img className='h-48 w-48 mx-auto' src="https://imgs.search.brave.com/iEk2wxUdOjyqLsfhnxiEcuDhqSIfdJ5JQIEm4LUugtM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvNy9MaXZl/LUNoYXQtUE5HLUNs/aXBhcnQucG5n" alt="" />
      <p className='w-80 mx-auto text-center text-lg text-gray-500'>Hi {data.username} ,</p>
      <p className='w-80 mx-auto text-center my-2 text-2xl text-gray-500'>Welcome to ChitChat</p>
    </div>
  )
}

export default Welcome