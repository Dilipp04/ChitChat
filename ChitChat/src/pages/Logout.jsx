import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
     const navigate=useNavigate()
     useEffect(()=>{
         navigate("/")
     })
    return localStorage.removeItem("userData")
}

export default Logout