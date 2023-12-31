import React from 'react'

const Messageother = ({ props }) => {
    return (
        <div>
            <div className='flex my-3'>
                <div className="rounded-full bg-profile text-white h-10 w-10 mx-2 flex-col flex text-center justify-center text-xl font-semibold">
                    {props.sender.username[0].toUpperCase()}
                </div>
                <div className='bg-rblue text-white rounded-3xl p-3 max-w-80'>
                    <p>{props.content}</p>
                    <p className='text-gray-100 text-xs float-end'>{props.timeStamp}</p>
                </div>
            </div>
        </div>
    )
}

export default Messageother
