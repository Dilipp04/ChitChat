import React from 'react'
import Navbar from '../components/Navbar'
import Chatlist from '../components/Chatlist'
import { Outlet } from 'react-router-dom'

const Home = () => {

    return (
        <>
            <Navbar />
            <Chatlist />
            <Outlet />
        </>

    )
}

export default Home