import { useEffect } from 'react'
import './App.css'
import Messagebox from './components/Messagebox'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Onlineusers from './pages/Onlineusers'
import Welcome from './pages/Welcome'
import { Routes, Route } from "react-router-dom"
import Logout from './pages/Logout'

function App() {
  useEffect(() => {
    const setHeight = () => {
      document.body.style.height = `${window.innerHeight}px`
    }
    setHeight()
    window.addEventListener("resize", setHeight)

    return () => window.removeEventListener("resize", setHeight)
  }, [])

  return (
    <>
      <div className='flex h-full w-full overflow-hidden bg-[#eef2f7] p-2 text-slate-950 dark:bg-slate-950 dark:text-slate-100 sm:p-3'>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path='signup' element={<Signup />}></Route>
          <Route path='/logout' element={<Logout />} ></Route>
          <Route path='/app' element={<Home />}>
            <Route path="/app" element={<Welcome />} ></Route>
            <Route path="/app/chat/:chatId" element={<Messagebox />} ></Route>
            <Route path="/app/users" element={<Onlineusers />} ></Route>
          </Route>
        </Routes>
      </div >
    </>
  )
}

export default App
