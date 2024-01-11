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
  const setHeight = () => {
    const currentHeight = window.innerHeight;
    document.body.style.height = `${currentHeight}px`
  }
  window.addEventListener("resize", setHeight)
  setHeight()
  return (
    <>
      <div className=' dark flex space-x-2 p-2 h-full bg-lgray dark:bg-darklgray'>
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
