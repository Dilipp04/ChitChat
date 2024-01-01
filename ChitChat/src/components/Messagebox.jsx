import React, { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import Messageself from './Messageself';
import Messageother from './Messageother';
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client"
import useUrl from '../hooks/useUrl';

const Messagebox = () => {
    const URL = useUrl()
    const [socketConnectionStatus, setSocketConnectionStatus] = useState()
    const [content, setContent] = useState("")
    const [allMessages, setAllMessages] = useState([])
    const [allMessagesCopy, setAllMessagesCopy] = useState([])
    const userdata = JSON.parse(localStorage.getItem("userData"))
    var socket = io(URL);

    const params = useParams()
    const [chatId, username] = params.chatId.split("&")

    const inputHandler = (e) => {
        setContent(e.target.value)
    }
    const sendMessage = async () => {

        const response = await fetch(`${URL}/message/`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${userdata.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: content,
                chatId: chatId
            })
        })
        const json = await response.json()
        setContent("")
        socket.emit("newMessage", json)
    }
    const fetchAllMessages = async () => {
        const response = await fetch(`${URL}/message/${chatId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${userdata.token}`,
            },
        })
        const json = await response.json()
        setAllMessagesCopy(json)
        socket.emit("join chat", chatId)
    }

    useEffect(() => {
        socket.emit("setup", userdata._id)
        socket.on("connection", () => {
            setSocketConnectionStatus(!socketConnectionStatus)
        })
    }, [])

    useEffect(() => {
        socket.on("message received", (newMessage) => {

            if (!allMessagesCopy || allMessagesCopy._id !== newMessage._id) {

            } else {
                setAllMessages([...allMessages], newMessage)
            }
        })
    }, [allMessages, allMessagesCopy])
    useEffect(() => {
        fetchAllMessages()
    }, [allMessages, chatId, sendMessage])


    return (
        <div className='grow bg-white border-slate-200 rounded-lg p-2 flex flex-col shadow-lg'>
            <header className='flex my-2 bg-lgray rounded-2xl py-2 align-middle content-center'>
                <div className="rounded-full bg-profile text-white h-14 w-14 mx-5 flex-col flex text-center justify-center text-2xl font-semibold">
                    {username[0].toUpperCase()}
                </div>
                <div className="flex-grow">
                    <h1 className="text-gray-900 title-font text-lg font-semibold">{username}</h1>
                    <p className="text-gray-500 text-sm">online</p>
                </div>
            </header>
            <main className='grow h-80 overflow-y-scroll scroll-smooth p-3 bg-white flex flex-col-reverse'>
                {
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
            <div className="input-area flex justify-center">
                <input onKeyDown={(event) => {
                    if (event.keyCode === 13) {
                        sendMessage()
                    }
                }} onChange={inputHandler} value={content} className='mt-3 w-full p-3 text-lg text-gray-900  border-gray-300 rounded-xl bg-lgray ' type="text" placeholder='Type a message' />
                <div onClick={sendMessage} className='p-3 mt-3 mx-2 rounded-lg bg-rblue '>
                    <SendIcon fontSize='medium' />
                </div>
            </div>
        </div>
    )
}
export default Messagebox