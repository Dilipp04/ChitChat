import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from "../assets/logo.png"

const Navbar = () => {
    return (
        <div className='rounded-lg bg-white shadow-xl p-2 z-40 min-w-12 rounded-l-lg sm:translate-x-0 text-center flex flex-col' >

            <div className="my-3 mx-auto">
                <a href="/app">
                    <img className=" w-12 md:w-16 object-cover" src={logo} alt="" />
                </a>
            </div>
            <div className="grow overflow-y-auto flex flex-col justify-between bg-gray-50 dark:bg-white  ">
                <ul className="space-y-4 font-small mx-auto">
                    <li>
                        <a href="/app" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-rblue hover:bg-lgray dark:hover:bg-lblue group">
                            <HomeIcon />
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-rblue hover:bg-lgray dark:hover:bg-lblue group">
                            <NotificationsIcon />
                        </a>
                    </li>

                    <li>
                        <a href="/app/users" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-rblue hover:bg-lgray dark:hover:bg-lblue group">
                            <PeopleAltIcon />
                        </a>
                    </li>
                   


                </ul>
                <ul className="pt-4 mt-4 space-y-2 font-smal dark:border-gray-700 mx-auto">
                    <li>
                        <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-rblue hover:bg-lgray dark:hover:bg-lblue group">
                            <SettingsIcon />
                        </a>
                    </li>
                    <li>
                        <a href="/logout" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-rblue hover:bg-lgray dark:hover:bg-lblue group">
                            < LogoutIcon />
                        </a>
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default Navbar