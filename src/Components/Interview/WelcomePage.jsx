import React from 'react'
import img from '../../assets/bro.png'
import { Link, Outlet } from 'react-router-dom'

export default function WelcomePage() {
    return (
        <div className="flex flex-col px-8 lg:px-32 py-10 gap-8 bg-[#F6F4F0] min-h-[calc(100vh-68px)]">
            <h1 className='text-2xl font-bold text-black'>.Net Backend Interview - Junior Level</h1>
            <div className="flex flex-col gap-4">
                <p className='text-2xl font-semibold text-[#152A4C]'>Welcome!</p>
                <p className='text-lg text-[#696F79] italic'>Please make sure to read the instructions well.</p>
            </div>
            <div className="flex flex-col place-items-center gap-10">
                <img src={img} className='w-3/4 md:w-1/4' alt="" />
                <p className='text-[#152A4C] font-semibold text-xl text-center md:w-[650px] md:leading-12
                    '>Welcome to your technical interview simulation!
                    This session is designed to evaluate your skills
                    and provide personalized feedback to help you improve.</p>
                <Link to="/Guidelines-and-tips" className='self-end'>
                    <button className=' bg-[#152A4C] text-white px-16 py-4 rounded-4xl font-bold hover:opacity-85 duration-300'>Next</button>
                </Link  >
            </div>
        </div>
    )
}
