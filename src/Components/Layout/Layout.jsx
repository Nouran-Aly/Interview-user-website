import React, { useEffect } from 'react'
import logo from '../../assets/logo.png'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
    const location = useLocation()
    let loginToken = "";
    const storedToken = localStorage.getItem('userToken');

    try {
        const parsed = JSON.parse(storedToken);
        // If it's an object with a 'token' key, extract it
        loginToken = typeof parsed === "object" && parsed.token ? parsed.token : parsed;
    } catch {
        // It's already a plain string (e.g., raw JWT)
        loginToken = storedToken;
    }

    const token = loginToken?.accessToken
    // console.log(loginToken);


    useEffect(() => {
        initFlowbite()
    })


    return (
        <>
            <nav className="bg-white border-gray-200 ">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-1">
                    <Link to="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-15" alt="Flowbite Logo" />
                    </Link>
                    {token ? (<>
                        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                            <ul className=" font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                                <li>
                                    <Link to="/">
                                        <p className={`relative block pt-2 pb-1 px-3 text-lg after:content-[""] after:absolute after:bottom-0 after:left-0 after:bg-[#152a4c] after:h-[1px] after:w-0 hover:after:w-full hover:after:right-0 after:duration-300 after:transition-all ${location.pathname === "/" ? "text-[#152a4c]" : "text-muted text-gray-500"} `} >Home</p>
                                    </Link>

                                </li>
                                <li>
                                    <Link to="/WelcomePage">
                                        <p className={`relative block pt-2 pb-1 px-3 text-lg after:content-[""] after:absolute after:bottom-0 after:left-0 after:bg-[#152a4c] after:h-[1px] after:w-0 hover:after:w-full hover:after:right-0 after:duration-300 after:transition-all ${location.pathname === "/WelcomePage" ? "text-[#152a4c]" : "text-muted text-gray-500"}`}>Interview</p>
                                    </Link>
                                </li>
                                <li >
                                    <Link to="/CV-generation">
                                        <p className={`relative block pt-2 pb-1 px-3 text-lg after:content-[""] after:absolute after:bottom-0 after:left-0 after:bg-[#152a4c] after:h-[1px] after:w-0 hover:after:w-full hover:after:right-0 after:duration-300 after:transition-all ${location.pathname === "/CV-generation" ? "text-[#152a4c]" : "text-muted text-gray-500"}`}>CV Generation</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/Profile">
                                        <p className={`relative block pt-2 pb-1 px-3 text-lg after:content-[""] after:absolute after:bottom-0 after:left-0 after:bg-[#152a4c] after:h-[1px] after:w-0 hover:after:w-full hover:after:right-0 after:duration-300 after:transition-all ${location.pathname === "/Profile" ? "text-[#152a4c]" : "text-muted text-gray-500"}`}>Profile</p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </ >) : (
                        <div className='flex items-center gap-4'>
                            <Link to="login">
                                <button className='border border-[#2E5077] text-[#2E5077] px-4 md:px-6 py-2 rounded-lg transition-all ease-in-out duration-300 hover:bg-[#2E5077] hover:text-white'>Login</button>
                            </Link>
                            <Link to="register">
                                <button className='bg-gradient px-4 md:px-6 py-2 text-white rounded-lg transition-all duration-300 hover:opacity-75'>Register</button>
                            </Link>
                        </div>
                    )
                    }
                </div >
            </nav >

            <Outlet />
        </ >
    )
}
