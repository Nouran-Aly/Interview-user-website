import React from 'react'
import logo from '../../assets/logo.png'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
    const location = useLocation()
    return (
        <div>
            <nav className="bg-white border-gray-200 ">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-1">
                    <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-15" alt="Flowbite Logo" />
                    </Link>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                            <li>
                                <Link to="/">
                                    <p className={`block py-2 px-3 text-[#737373] text-lg rounded-sm  ${location.pathname === "/" ? "text-black font-bold" : ""} `} >Home</p>
                                </Link>

                            </li>
                            <li>
                                <Link to="/WelcomePage">
                                    <p className={`block py-2 px-3 text-[#737373] font-bold text-lg rounded-sm cursor-pointer ${location.pathname === "/WelcomePage" ? "text-black font-bold" : ""}`}>Interview</p>
                                </Link>
                            </li>
                            <li>
                                <p className="block py-2 px-3 text-[#737373] font-bold text-lg rounded-sm cursor-pointer">CV Generation</p>
                            </li>
                            <li>
                                <p className="block py-2 px-3 text-[#737373] font-bold text-lg rounded-sm cursor-pointer">Profile</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >

            <Outlet />
        </div >
    )
}
