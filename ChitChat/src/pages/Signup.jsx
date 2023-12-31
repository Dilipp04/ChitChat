import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button ,Backdrop, CircularProgress} from '@mui/material'

const Signup = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState({ username: "", email: "", password: "" })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const submitHandler = async () => {
        setLoading(true)
        const response = await fetch("http://localhost:5000/user/register", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json();
        if (response.ok) {
            localStorage.setItem("userData", JSON.stringify(json))
            setData({ username: "", email: "", password: "" })
            setLoading(false)
            navigate("/app")
        }
    }
    return (<>
        <div className=' flex align-middle items-center justify-center w-screen h-screen '>
            
            <div className='bg-white w-1/3 h-auto p-8 px-16 rounded-2xl shadow-xl flex flex-col justify-center space-y-5 '>
                <h1 className='text-2xl text-gray text-center'>Register to ChitChat</h1>
                <TextField onChange={handleChange} type='text' name='username' label="Username" variant="outlined" />
                <TextField onChange={handleChange} type='email' name='email' label="Email" variant="outlined" />
                <TextField onChange={handleChange} type='password' name='password' label="Password" variant="outlined" />
                <div className='text-center'>
                    <Button onClick={submitHandler} variant="contained" >Sign Up</Button>
                </div>
                <p className='text-md text-gray text-center font-semibold'>Already logged In, <a className='text-blue-500 underline' href="/">Login</a> </p>
            </div>

        </div>
        <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default Signup