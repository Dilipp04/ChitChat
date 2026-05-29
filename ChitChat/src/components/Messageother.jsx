/* eslint-disable react/prop-types */
import Avatar from './Avatar'

const formatTime = (value) => value ? new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""

const Messageother = ({ props }) => {
    return (
        <div className='my-2 flex justify-start'>
            <div className='flex max-w-[82%] items-end gap-2 sm:max-w-[32rem]'>
                <Avatar name={props.sender.username} src={props.sender.profilePic} size="sm" />
                <div className='rounded-[1.5rem] rounded-bl-md border border-slate-200 bg-white px-4 py-3 text-slate-950 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'>
                    <p className='break-words text-sm leading-relaxed sm:text-base'>{props.content}</p>
                    <p className='mt-1 text-right text-[0.7rem] text-slate-500 dark:text-slate-300'>{formatTime(props.createdAt)}</p>
                </div>
            </div>
        </div>
    )
}

export default Messageother
