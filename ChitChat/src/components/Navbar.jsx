import { useState, useEffect } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from "../assets/logo.png"
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

    const toggleDarkMode = () => {
        if (!isDarkMode) {
            document.documentElement.setAttribute('data-mode', 'dark');
            setIsDarkMode((prev) => !prev)
        } else {
            document.documentElement.removeAttribute('data-mode');
            setIsDarkMode((prev) => !prev)

        }
    };

    const navClass = ({ isActive }) =>
        `flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-200 ${isActive
            ? 'bg-brand-600 text-white shadow-lg shadow-blue-500/20'
            : 'text-slate-700 hover:bg-slate-100 hover:text-brand-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white'
        }`

    return (
        <aside className='z-40 flex min-w-[4.75rem] flex-col items-center rounded-3xl border border-slate-200 bg-white p-3 text-center shadow-xl shadow-slate-200/70 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/20'>
            <div className="mb-6 mt-2">
                <NavLink to="/app">
                    <img className="h-12 w-12 rounded-2xl object-cover shadow-lg shadow-cyan-500/10 md:h-14 md:w-14" src={logo} alt="ChitChat" />
                </NavLink>
            </div>
            <div className="flex grow flex-col justify-between">
                <ul className="space-y-3">
                    <li>
                        <NavLink to="/app" end className={navClass} title="Home">
                            <HomeIcon />
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/app/users" className={navClass} title="Users">
                            <PeopleAltIcon />
                        </NavLink>
                    </li>
                    <li >
                        <button onClick={toggleDarkMode} className="flex h-11 w-11 items-center justify-center rounded-2xl text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-brand-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white" title="Toggle theme">
                            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                        </button>
                    </li>
                </ul>
                <ul className="space-y-3 border-t border-slate-200 pt-4 dark:border-white/10">
                    <li>
                        <button className="flex h-11 w-11 items-center justify-center rounded-2xl text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-brand-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white" title="Settings">
                            <SettingsIcon />
                        </button>
                    </li>
                    <li>
                        <NavLink to="/logout" className="flex h-11 w-11 items-center justify-center rounded-2xl text-slate-700 transition-all duration-200 hover:bg-rose-50 hover:text-rose-600 dark:text-slate-200 dark:hover:bg-rose-500/15 dark:hover:text-rose-300" title="Logout">
                            < LogoutIcon />
                        </NavLink>
                    </li>

                </ul>
            </div>
        </aside>
    )
}

export default Navbar
