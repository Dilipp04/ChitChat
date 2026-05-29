import { useCallback, useEffect, useState } from 'react'
import Onlineuseritems from '../components/Onlineuseritems'
import useUrl from '../hooks/useUrl'
import { CircularProgress } from '@mui/material'
import { io } from "socket.io-client"
const Onlineusers = () => {
    const URL = useUrl()
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    const userdata = JSON.parse(localStorage.getItem("userData"))
    const [loading, setloading] = useState(false)
    const [onlineUsers, setOnlineUsers] = useState([])
    const fetchAllUsers = useCallback(async (keyword = "") => {
        setloading(true)
        try {
            const response = await fetch(`${URL}/user/fetchallusers?search=${keyword}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${userdata.token}`
                }
            })
            const json = await response.json();
            setUsers(Array.isArray(json) ? json : [])
        } finally {
            setloading(false)
        }
    }, [URL, userdata.token])
    useEffect(() => {
        fetchAllUsers()
    }, [fetchAllUsers])
    useEffect(() => {
        const socket = io(URL)
        socket.emit("setup", userdata._id)
        socket.on("online users", setOnlineUsers)

        return () => socket.disconnect()
    }, [URL, userdata._id])
    const inputHandler = (e) => {
        const value = e.target.value
        setSearch(value)
        fetchAllUsers(value)
    }
    return (
        <section className='ml-2 flex min-w-0 grow flex-col rounded-3xl border border-slate-200 bg-white p-4 text-slate-950 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:shadow-black/20'>
            <header className='mb-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800'>
                <p className='text-xs font-semibold uppercase tracking-[0.24em] text-brand-700 dark:text-brand-400'>Directory</p>
                <h1 className='mt-1 text-2xl font-semibold text-slate-950 dark:text-white'>Find people</h1>
            </header>
            <div>
                <input onChange={inputHandler} value={search} type="search" className="mb-4 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-brand-400" placeholder="Search users" required></input>

            </div>
            <main className='flex h-80 grow flex-col space-y-3 overflow-y-auto rounded-3xl bg-slate-50 p-3 text-slate-900 dark:bg-slate-950 dark:text-slate-100'>
                <div className='mx-auto'> {loading && <CircularProgress color='inherit' size={25} />}</div>
                {!loading && users.length === 0 && <div className='rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300'>No users found</div>}
                {users.map((element) => {
                    return <Onlineuseritems key={element._id} element={element} isOnline={onlineUsers.includes(element._id)} />
                })}

            </main>

        </section>
    )
}

export default Onlineusers
