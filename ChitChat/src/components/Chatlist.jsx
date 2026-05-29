import { useCallback, useEffect, useState } from 'react'
import Listitem from './Listitem';
import { useLocation } from 'react-router-dom';
import useUrl from '../hooks/useUrl';
import { CircularProgress } from '@mui/material';
import { io } from "socket.io-client"
const Chatlist = () => {
    const userdata = JSON.parse(localStorage.getItem("userData"))
    const URL = useUrl()
    const [loading, setloading] = useState(false)
    const [onlineUsers, setOnlineUsers] = useState([])

    const [chatlist, setChatlist] = useState([])
    const fetchChats = useCallback(async () => {
        setloading(true)
        try {
            const response = await fetch(`${URL}/chat/`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${userdata.token}`,
                    "Content-Type": "application/json"
                },
            })
            const json = await response.json()
            setChatlist(Array.isArray(json) ? json : [])
        } finally {
            setloading(false)
        }
    }, [URL, userdata.token])
    useEffect(() => {
        fetchChats()
    }, [fetchChats])

    useEffect(() => {
        const socket = io(URL)
        socket.emit("setup", userdata._id)
        socket.on("online users", setOnlineUsers)

        return () => socket.disconnect()
    }, [URL, userdata._id])

    let location = useLocation();

    return (
        <aside className={`${location.pathname == "/app" ? "flex grow" : "hidden"} ml-2 h-full min-w-0 flex-col rounded-3xl border border-slate-200 bg-white p-4 text-slate-950 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:shadow-black/20 md:flex md:w-[22rem] md:grow-0`}>
            <div className='mb-4'>
                <p className='text-xs font-semibold uppercase tracking-[0.24em] text-brand-700 dark:text-brand-400'>Inbox</p>
                <h1 className='mt-1 text-2xl font-semibold text-slate-950 dark:text-white'>Messages</h1>
            </div>
            <form>
                <input type="search" className="mb-4 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-brand-400 dark:focus:bg-slate-800" placeholder="Search conversations" required></input>
            </form>
            <div className="flex grow flex-col space-y-3 overflow-y-auto pr-1">

                {loading && (<div className='mx-auto py-6'><CircularProgress color='inherit' size={25} /></div>)}

                {!loading && chatlist.length > 0 ? chatlist.map((element, i) => {
                    const otherUser = element.users.find((user) => user._id !== userdata._id)
                    const chatName = otherUser?.username || "Unknown user"
                    const lastMessage = element.latestMessage?.content || "No previous message"
                    const profilePic = otherUser?.profilePic || ""
                    const isOnline = onlineUsers.includes(otherUser?._id)
                    return <Listitem chatId={element._id} key={element._id || i} name={chatName} lastMessage={lastMessage} profilePic={profilePic} isOnline={isOnline} timeStamp={element.updatedAt ? new Date(element.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""} />
                })
                    :
                    !loading && <div className='rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300'>No recent chats</div>
                }
            </div>
        </aside>
    )
}

export default Chatlist;
