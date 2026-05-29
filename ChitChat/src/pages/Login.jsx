import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Backdrop, CircularProgress, Snackbar, Alert } from '@mui/material'
import useUrl from '../hooks/useUrl'
import logo from "../assets/logo.png"

const Login = () => {
    const URL = useUrl()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({ username: "", password: "" })
    const textFieldSx = {
        '& .MuiInputBase-root': { backgroundColor: '#ffffff', color: '#0f172a', borderRadius: '16px' },
        '& .MuiInputLabel-root': { color: '#475569' },
        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#cbd5e1' },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#2563eb' },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2563eb' },
        '& .MuiFormHelperText-root': { marginLeft: 0 },
    }
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        if (localStorage.getItem("userData")) {
            navigate("/app")
        }
    }, [navigate])

    const validate = () => {
        if (!data.username.trim() || !data.password.trim()) {
            setErrorMessage("Please enter both username and password.")
            setOpenSnackbar(true)
            return false
        }
        return true
    }

    const submitHandler = async () => {
        if (!validate()) return
        setLoading(true)
        const response = await fetch(`${URL}/user/login`, {
            method: "POST",
            body: JSON.stringify({
                username: data.username.trim(),
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
            setData({ username: "", password: "" })
            navigate("/app")
        } else {
            setErrorMessage(json.message || "Login failed. Check your credentials.")
            setOpenSnackbar(true)
        }
    }

    return (
        <>
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
                            <div className='ml-auto max-w-xs rounded-[1.5rem] rounded-br-md bg-brand-600 px-4 py-3 text-sm text-white shadow-lg shadow-blue-500/10'>
                                Hey, are you online?
                            </div>
                            <div className='max-w-xs rounded-[1.5rem] rounded-bl-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100'>
                                Yes. Let&apos;s catch up.
                            </div>
                        </div>
                        <p className='max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300'>A focused chat workspace with clear status, readable messages, and quick access to your people.</p>
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
                            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-brand-700 dark:text-brand-400'>Welcome back</p>
                            <h1 className='mt-3 text-3xl font-bold text-slate-950 dark:text-white'>Sign in</h1>
                            <p className='mt-2 text-sm text-slate-600 dark:text-slate-300'>Continue to your inbox and recent chats.</p>
                        </div>
                        <div className='space-y-4'>
                            <TextField
                                error={!data.username.trim() && openSnackbar}
                                helperText={!data.username.trim() && openSnackbar ? 'Username is required' : ' '}
                                onChange={handleChange}
                                type='text'
                                name='username'
                                label="Username"
                                variant="outlined"
                                fullWidth
                                value={data.username}
                                sx={textFieldSx}
                            />
                            <TextField
                                error={!data.password.trim() && openSnackbar}
                                helperText={!data.password.trim() && openSnackbar ? 'Password is required' : ' '}
                                onChange={handleChange}
                                type='password'
                                name='password'
                                label="Password"
                                variant="outlined"
                                fullWidth
                                value={data.password}
                                sx={textFieldSx}
                            />
                            <Button onClick={submitHandler} variant="contained" size="large" fullWidth sx={{ borderRadius: '16px', py: 1.35, backgroundColor: '#2563eb', textTransform: 'none', fontWeight: 700, '&:hover': { backgroundColor: '#1d4ed8' } }}>
                                {loading ? 'Signing in...' : 'Login'}
                            </Button>
                        </div>
                        <p className='mt-6 text-center text-sm text-slate-600 dark:text-slate-300'>New to ChitChat? <a className='font-semibold text-brand-700 underline hover:text-brand-600 dark:text-brand-400' href="/signup">Create account</a></p>
                    </section>
                </div>
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default Login
