/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"
import Avatar from './Avatar';

const Listitem = ({ name, lastMessage, timeStamp, chatId, isOnline, profilePic }) => {
    const navigate = useNavigate()

    return (
        <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => { navigate(`/app/chat/${chatId}&${encodeURIComponent(name)}`) }} className='flex w-full items-center gap-4 rounded-3xl border border-slate-200 bg-white px-4 py-4 text-left shadow-sm transition duration-300 hover:border-brand-600 hover:shadow-lg hover:shadow-slate-200/80 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-brand-400 dark:hover:shadow-black/20'>
            <Avatar name={name} src={profilePic} isOnline={isOnline} />
            <div className='min-w-0 flex-grow'>
                <h1 className="truncate text-base font-semibold text-slate-900 dark:text-white">{name}</h1>
                <p className="truncate text-sm text-slate-600 dark:text-slate-300">{lastMessage}</p>
            </div>
            <p className='shrink-0 text-xs text-slate-500 dark:text-slate-300'>{timeStamp}</p>
        </motion.button>
    )
}

export default Listitem
