import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Backdrop, CircularProgress, Snackbar, Alert } from '@mui/material'
import useUrl from '../hooks/useUrl'
import logo from "../assets/logo.png"

const Signup = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const URL = useUrl()
    const [data, setData] = useState({ username: "", email: "", password: "", profilePic: "" })
    const textFieldSx = {
        '& .MuiInputBase-root': { backgroundColor: '#ffffff', color: '#0f172a', borderRadius: '16px' },
        '& .MuiInputLabel-root': { color: '#475569' },
        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#cbd5e1' },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#2563eb' },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2563eb' },
    }
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const validate = () => {
        if (!data.username.trim() || !data.email.trim() || !data.password.trim()) {
            setErrorMessage("All fields are required.")
            setOpenSnackbar(true)
            return false
        }
        if (data.username.trim().length < 3) {
            setErrorMessage("Username must be at least 3 characters.")
            setOpenSnackbar(true)
            return false
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(data.email.trim())) {
            setErrorMessage("Please enter a valid email address.")
            setOpenSnackbar(true)
            return false
        }
        if (data.password.length < 6) {
            setErrorMessage("Password must be at least 6 characters.")
            setOpenSnackbar(true)
            return false
        }
        return true
    }
    const submitHandler = async () => {
        if (!validate()) return
        setLoading(true)
        const response = await fetch(`${URL}/user/register`, {
            method: "POST",
            body: JSON.stringify({
                username: data.username.trim(),
                email: data.email.trim(),
                password: data.password,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json();
        setLoading(false)
        if (response.ok) {
            localStorage.setItem("userData", JSON.stringify(json))
            setData({ username: "", email: "", password: "", profilePic: "" })
            navigate("/app")
        } else {
            setErrorMessage(json.message || "Registration failed. Please try again.")
            setOpenSnackbar(true)
        }
    }
    return (<>
        <div className='flex h-full w-full items-center justify-center rounded-3xl bg-[#eef2f7] p-4 text-slate-950 dark:bg-slate-950 dark:text-slate-100'>
            <div className='grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/20 md:grid-cols-[1fr_1.1fr]'>
                <section className='hidden border-r border-slate-200 bg-slate-50 p-8 dark:border-slate-700 dark:bg-slate-800 md:flex md:flex-col md:justify-between'>
                    <div className='flex items-center gap-3'>
                        <img className='h-12 w-12 rounded-2xl object-cover shadow-lg shadow-blue-500/10' src={logo} alt='ChitChat' />
                        <div>
                            <h2 className='text-xl font-semibold text-slate-950 dark:text-white'>ChitChat</h2>
                            <p className='text-sm text-slate-600 dark:text-slate-300'>Real-time conversations</p>
                        </div>
                    </div>
                    <div className='space-y-4'>
                        <div className='max-w-xs rounded-[1.5rem] rounded-bl-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100'>
                            Add your profile picture and start chatting.
                        </div>
                        <div className='ml-auto max-w-xs rounded-[1.5rem] rounded-br-md bg-brand-600 px-4 py-3 text-sm text-white shadow-lg shadow-blue-500/10'>
                            Done. I&apos;m ready.
                        </div>
                    </div>
                    <p className='max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300'>Create your account, find people, and keep conversations easy to scan.</p>
                </section>

                <section className='p-6 sm:p-8'>
                    <div className='mb-8 flex items-center gap-3 md:hidden'>
                        <img className='h-12 w-12 rounded-2xl object-cover shadow-lg shadow-blue-500/10' src={logo} alt='ChitChat' />
                        <div>
                            <h2 className='text-xl font-semibold text-slate-950 dark:text-white'>ChitChat</h2>
                            <p className='text-sm text-slate-600 dark:text-slate-300'>Real-time conversations</p>
                        </div>
                    </div>
                    <div className='mb-6'>
                        <p className='text-xs font-semibold uppercase tracking-[0.24em] text-brand-700 dark:text-brand-400'>Create account</p>
                        <h1 className='mt-3 text-3xl font-bold text-slate-950 dark:text-white'>Join ChitChat</h1>
                        <p className='mt-2 text-sm text-slate-600 dark:text-slate-300'>Set up your profile and start messaging.</p>
                    </div>
                    <div className='space-y-4'>
                        <TextField value={data.username} onChange={handleChange} type='text' name='username' label="Username" variant="outlined" fullWidth sx={textFieldSx} />
                        <TextField value={data.email} onChange={handleChange} type='email' name='email' label="Email" variant="outlined" fullWidth sx={textFieldSx} />
                        <TextField value={data.password} onChange={handleChange} type='password' name='password' label="Password" variant="outlined" fullWidth sx={textFieldSx} />
                        <Button onClick={submitHandler} variant="contained" size="large" fullWidth sx={{ borderRadius: '16px', py: 1.35, backgroundColor: '#2563eb', textTransform: 'none', fontWeight: 700, '&:hover': { backgroundColor: '#1d4ed8' } }}>
                            {loading ? 'Creating account...' : 'Sign Up'}
                        </Button>
                    </div>
                    <p className='mt-6 text-center text-sm text-slate-600 dark:text-slate-300'>Already have an account? <a className='font-semibold text-brand-700 underline hover:text-brand-600 dark:text-brand-400' href="/">Login</a></p>
                </section>
            </div>
        </div>
        <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={() => setOpenSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
                {errorMessage}
            </Alert>
        </Snackbar>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    </>)
}

export default Signup
