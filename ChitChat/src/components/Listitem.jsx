import React from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"

const Listitem = (props) => {
    const navigate = useNavigate()

    const { name, lastMessage, timeStamp, chatId } = props

    return (
        <>
            <motion.div whileHover={{ scale: 1.1 }} className=' h-14 w-full flex items-center hover:bg-lgray active:bg-zinc-200 rounded-xl p-2' onClick={() => { navigate(`/app/chat/${chatId}&${name}`) }} >
                <div className="rounded-full bg-profile text-white h-12 w-12 mr-3 flex-col flex text-center justify-center text-2xl font-semibold">
                    {name[0].toUpperCase()}
                </div>
                <div className="flex-grow ">
                    <h1 className=" text-gray-900 title-font text-lg font-semibold">{name}</h1>
                    <p className="text-gray-300 text-xs">{lastMessage}</p>
                </div>
                <p className='text-xs text-gray-400 self-center'>{timeStamp}</p>
            </motion.div>
        </>
    )
}

export default Listitem