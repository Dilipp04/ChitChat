import { useCallback, useEffect, useRef, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import Messageself from './Messageself';
import Messageother from './Messageother';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from "socket.io-client"
import useUrl from '../hooks/useUrl';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CircularProgress } from '@mui/material';
import Avatar from './Avatar';
const Messagebox = () => {
    const navigate = useNavigate()
    const URL = useUrl()
    const [content, setContent] = useState("")
    const [allMessagesCopy, setAllMessagesCopy] = useState([])
    const [loading, setLoading] = useState(false)
    const userdata = JSON.parse(localStorage.getItem("userData"))
    const socketRef = useRef(null)

    const params = useParams()
    const [chatId, rawUsername] = params.chatId.split("&")
    const username = decodeURIComponent(rawUsername || "")
    const otherSender = allMessagesCopy.find((message) => message.sender?._id !== userdata._id)?.sender

    const inputHandler = (e) => {
        setContent(e.target.value)
    }
    const sendMessage = async () => {
        if (!content.trim()) return
        const messageContent = content.trim()
        setContent("")
        const response = await fetch(`${URL}/message/`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${userdata.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: messageContent,
                chatId: chatId
            })
        })
        const json = await response.json()
        setAllMessagesCopy((prev) => [...prev, json])
        socketRef.current?.emit("newMessage", json)
    }
    const fetchAllMessages = useCallback(async () => {
        setLoading(true)
        try {
            const response = await fetch(`${URL}/message/${chatId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${userdata.token}`,
                },
            })
            const json = await response.json()
            setAllMessagesCopy(Array.isArray(json) ? json : [])
            socketRef.current?.emit("join chat", chatId)
        } finally {
            setLoading(false)
        }
    }, [URL, chatId, userdata.token])
    const deleteChat = async () => {
        await fetch(`${URL}/chat/${chatId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${userdata.token}`,
            },
        })
        navigate("/app")
    }

    useEffect(() => {
        const socket = io(URL)
        socketRef.current = socket
        socket.emit("setup", userdata._id)
        socket.on("message received", (newMessage) => {
            if (newMessage.chat?._id === chatId || newMessage.chat === chatId) {
                setAllMessagesCopy((prev) => [...prev, newMessage])
            }
        })

        return () => socket.disconnect()
    }, [URL, userdata._id, chatId])

    useEffect(() => {
        fetchAllMessages()
    }, [fetchAllMessages])


    return (
        <section className='ml-2 flex min-w-0 grow flex-col rounded-3xl border border-slate-200 bg-white p-4 text-slate-950 shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:shadow-black/20'>
            <header className='mb-4 flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white'>
                <button onClick={() => navigate("/app")} className='flex h-10 w-10 items-center justify-center rounded-2xl text-slate-700 transition hover:bg-white hover:text-brand-700 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white md:hidden'>
                    <ArrowBackIcon />
                </button>
                <Avatar name={username} src={otherSender?.profilePic} />
                <div className="min-w-0 flex-grow">
                    <h1 className="truncate text-lg font-semibold text-slate-950 dark:text-white">{username}</h1>
                    <p className='text-sm text-slate-600 dark:text-slate-300'>Conversation</p>
                </div>
                <button onClick={deleteChat} className='flex h-10 w-10 items-center justify-center rounded-2xl text-slate-700 transition hover:bg-rose-50 hover:text-rose-600 dark:text-slate-200 dark:hover:bg-rose-500/15 dark:hover:text-rose-300' title='Delete chat'>
                    <DeleteIcon />
                </button>
            </header>
            <main className='flex h-80 grow flex-col-reverse overflow-y-auto rounded-3xl bg-slate-50 p-4 text-slate-950 scroll-smooth dark:bg-slate-950 dark:text-slate-100'>
                {loading && <div className='m-auto'><CircularProgress color='inherit' size={28} /></div>}
                {!loading && allMessagesCopy.length === 0 && <div className='m-auto rounded-2xl border border-dashed border-slate-300 px-6 py-4 text-center text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300'>No messages yet</div>}
                {!loading &&
                    allMessagesCopy.map((message, index) => {

                        const sender = message.sender
                        const self_id = userdata._id
                        if (sender._id === self_id) {
                            return <Messageself props={message} key={index} />
                        } else {
                            return <Messageother props={message} key={index} />
                        }
                    }).reverse()
                }


            </main>
            <div className="mt-4 flex items-center gap-3">
                <input onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        sendMessage()
                    }
                }} onChange={inputHandler} value={content} className='w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-brand-400' type="text" placeholder='Type a message' />
                <button onClick={sendMessage} className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-blue-500/20 transition hover:bg-brand-700 active:scale-95' title='Send message'>
                    <SendIcon fontSize='medium' />
                </button>
            </div>
        </section>
    )
}
export default Messagebox
