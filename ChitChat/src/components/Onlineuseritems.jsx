/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import useUrl from '../hooks/useUrl'
import Avatar from './Avatar'

const Onlineuseritems = ({ element, isOnline }) => {
  const navigate = useNavigate()
  const URL = useUrl()
  const { username, _id, profilePic } = element
  const userdata = JSON.parse(localStorage.getItem("userData"))
  const handleClick = async () => {
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
    if (response.ok) {
      const json = await response.json()
      navigate(`/app/chat/${json._id}&${encodeURIComponent(username)}`)
    }
  }
  return (
    <button onClick={handleClick} className='flex w-full items-center gap-4 rounded-3xl border border-slate-200 bg-white p-4 text-left shadow-sm transition duration-300 hover:border-brand-600 hover:shadow-lg hover:shadow-slate-200/80 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-brand-400 dark:hover:shadow-black/20'>
      <Avatar name={username} src={profilePic} isOnline={isOnline} />
      <div className='min-w-0 flex-grow'>
        <h1 className='truncate text-base font-semibold text-slate-900 dark:text-white'>{username}</h1>
        <p className='text-sm text-slate-600 dark:text-slate-300'>{isOnline ? 'Available now' : 'Offline'}</p>
      </div>
    </button>
  )
}

export default Onlineuseritems
