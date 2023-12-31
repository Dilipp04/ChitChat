import React, { useEffect, useState } from 'react'
import Listitem from './Listitem';
import { useLocation } from 'react-router-dom';
import useUrl from '../hooks/useUrl';
import { CircularProgress } from '@mui/material';
const Chatlist = () => {
    const userdata = JSON.parse(localStorage.getItem("userData"))
    const URL = useUrl()
    const [loading, setloading] = useState(false)

    const [chatlist, setChatlist] = useState([])
    const fetchChats = async () => {
        setloading(true)
        const response = await fetch(`${URL}/chat/`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${userdata.token}`,
                "Content-Type": "application/json"
            },
        })
        const json = await response.json()
        setChatlist(json)
        setloading(false)
    }
    useEffect(() => {
        fetchChats()
    }, [])

    let location = useLocation();

    return (
        <div className={`${location.pathname == "/app" ? "flex grow" : "hidden"} rounded-lg dark:text-white dark:bg-darkgray bg-white shadow-xl rounded-r h-full min-w-36 p-2 md:flex md:grow-0 flex-col`}>
            <form>
                <input type="search" className="shadow focus:ring-red-500 my-2.5 w-full p-5 text-lg text-gray-900 dark:bg-darklgray  border-gray-300 rounded-2xl bg-lgray" placeholder="Search" required></input>
            </form>
            <div className=" flex flex-col grow h-80 overflow-y-scroll space-y-2 p-2">
                
                    {loading && (<div className='mx-auto'><CircularProgress color='inherit' size={25} /></div>)}

                {chatlist.length > 0 ? chatlist.map((element, i) => {
                    var chatName = ""
                    var lastMessage = ""
                    element.users.map((user) => {
                        if (user._id != userdata._id) {
                            chatName = user.username
                        }
                        if (element.latestMessage === undefined) {
                            lastMessage = "No previous message"
                        } else {
                            lastMessage = element.latestMessage.content
                        }

                    })
                    return <Listitem chatId={element._id} key={i} name={chatName} lastMessage={lastMessage} />
                })
                    :
                    <div className='text-center font-light text-sm'>No recent chats</div>
                }
            </div>
        </div>
    )
}

export default Chatlist;