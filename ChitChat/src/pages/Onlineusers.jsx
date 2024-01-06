import React, { useEffect, useState } from 'react'
import Onlineuseritems from '../components/Onlineuseritems'
import useUrl from '../hooks/useUrl'
import { CircularProgress } from '@mui/material'
const Onlineusers = () => {
    const URL = useUrl()
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    const userdata = JSON.parse(localStorage.getItem("userData"))
    const [loading, setloading] = useState(false)
    const fetchAllUsers = async (keyword = "") => {
        setloading(true)
        const response = await fetch(`${URL}/user/fetchallusers?search=${keyword}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${userdata.token}`
            }
        })
        const json = await response.json();
        setUsers(json)
        setloading(false)
    }
    useEffect(() => {
        fetchAllUsers()
    }, [])
    const inputHandler = (e) => {
        setSearch(e.target.value)
        fetchAllUsers(search)
    }
    return (
        <div className='grow bg-white dark:bg-darkgray border-slate-200 rounded-lg p-2 flex flex-col shadow-lg'>
            <header className='flex my-2 shadow text-2xl text-gray dark:bg-darklgray dark:text-white bg-lgray rounded-2xl p-5 px-8 align-middle content-center'>
                Users
            </header>
            <div className="search">
                <input onChange={inputHandler} value={search} type="search" className=" focus:ring-red-500 my-1 w-full p-4 text-lg text-gray-900 dark:bg-darklgray  border-gray-300 rounded-full bg-lgray" placeholder="Search" required></input>

            </div>
            <main className='grow h-80 overflow-y-scroll p-3 rounded dark:bg-darkgray bg-white text-slate-800 flex flex-col space-y-3'>
                <div className='mx-auto'> {loading && <CircularProgress color='inherit' size={25} />}</div>
                {users.map((element, i) => {
                    return <Onlineuseritems key={element._id} element={element} />
                })}

            </main>

        </div>
    )
}

export default Onlineusers