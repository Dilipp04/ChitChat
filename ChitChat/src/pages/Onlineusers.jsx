import React, { useEffect, useState } from 'react'
import Onlineuseritems from '../components/Onlineuseritems'

const Onlineusers = () => {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    const userdata = JSON.parse(localStorage.getItem("userData"))
    const fetchAllUsers = async (keyword = "") => {
        const response = await fetch(`http://localhost:5000/user/fetchallusers?search=${keyword}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${userdata.token}`
            }
        })
        const json = await response.json();
        setUsers(json)
    }
    useEffect(() => {
        fetchAllUsers()
    }, [])
    const inputHandler = (e) => {
        setSearch(e.target.value)
        fetchAllUsers(search)
    }
    return (
        <div className='grow bg-white border-slate-200 rounded-lg p-2 flex flex-col shadow-lg'>
            <header className='flex my-2 shadow text-2xl text-gray bg-lgray rounded-2xl p-5 px-8 align-middle content-center'>
                Users
            </header>
            <div className="search">
                <input onChange={inputHandler} value={search} type="search" className=" focus:ring-red-500 my-1 w-full p-3 text-lg text-gray-900  border-gray-300 rounded-full bg-lgray" placeholder="Search" required></input>

            </div>
            <main className='grow h-80 overflow-y-scroll p-3 bg-white flex flex-col space-y-3'>
                {users.map((element, i) => {
                    return <Onlineuseritems  key={element._id} element={element} />
                })}

            </main>

        </div>
    )
}

export default Onlineusers