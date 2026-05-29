/* eslint-disable react/prop-types */
import Avatar from './Avatar'

const formatTime = (value) => value ? new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""

const Messageself = ({ props }) => {
    return (
        <div className='my-2 flex justify-end'>
            <div className='flex max-w-[82%] items-end gap-2 sm:max-w-[32rem]'>
                <div className='rounded-[1.5rem] rounded-br-md bg-brand-600 px-4 py-3 text-white shadow-lg shadow-blue-500/10 dark:bg-brand-500'>
                    <p className='break-words text-sm leading-relaxed sm:text-base'>{props.content}</p>
                    <p className='mt-1 text-right text-[0.7rem] text-white/70'>{formatTime(props.createdAt)}</p>
                </div>
                <Avatar name={props.sender.username} src={props.sender.profilePic} size="sm" />
            </div>
        </div>
    )
}

export default Messageself
