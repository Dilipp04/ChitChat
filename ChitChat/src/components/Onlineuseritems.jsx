import React from 'react'
import { useNavigate } from 'react-router-dom'
import useUrl from '../hooks/useUrl'

const Onlineuseritems = ({ element }) => {
  const navigate = useNavigate()
  const URL = useUrl()
  const { username, _id } = element
  const userdata = JSON.parse(localStorage.getItem("userData"))
  return (
    <div onClick={async () => {
      const response = await fetch(`${URL}/chat/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${userdata.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: _id
        })
      })
      const json = await response.json()
      console.log(json)
      navigate(`/app/chat/${json._id}&${username}`)
    }}>
      <div className='w-full py-2  rounded-xl bg-lgray active:bg-zinc-200 flex items-center'>
        <div className="rounded-full bg-profile text-white h-12 w-12 m-3 flex-col flex text-center justify-center text-2xl font-semibold">
          {username[0].toUpperCase()}
        </div>
        <div className="flex-grow ">
          <h1 className=" text-gray-900 title-font text-lg font-semibold">{username}</h1>

        </div>
      </div>
    </div>
  )
}

export default Onlineuseritems