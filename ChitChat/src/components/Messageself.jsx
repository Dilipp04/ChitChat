import React from 'react'

const Messageself = ({ props }) => {
    return (
        <div>
            <div className='flex justify-end my-3'>
                <div className='bg-lgray dark:bg-darklgray dark:text-white rounded-3xl p-3 max-w-80'>
                    <p>{props.content}</p>
                    <p className='text-gray-400 text-xs float-end'>{props.timeStamp}</p>
                </div>
                <div className="rounded-full bg-profile text-white h-10 w-10 mx-2 flex-col flex text-center justify-center text-xl font-semibold">
                    {props.sender.username[0].toUpperCase()}
                </div>
            </div>
        </div>
    )
}

export default Messageself
