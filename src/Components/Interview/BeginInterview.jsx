import React from 'react'
import { Link } from 'react-router-dom'
import img from '../../assets/begin.png'

export default function BeginInterview() {
    return (
        <div className="flex flex-col justify-center items-center px-8 lg:px-32 py-10 gap-8 bg-[#F6F4F0] min-h-[calc(100vh-68px)]">
            {/* <h1 className='text-2xl font-bold text-black self-start'>.Net Backend Interview - Junior Level</h1> */}
            <div className="flex flex-col place-items-center gap-8">
                <img src={img} className='w-3/4 md:w-1/4' alt="" />
                <p className='text-[#152A4C] font-semibold text-xl text-center md:w-[650px] md:leading-10'>
                    This is a safe space to practice and learn.
                    Do your best!, and don’t worry about making mistakes
                    they’re part of the learning process!
                </p>
            </div >

            <Link to="/interviewq">
                <button className=' bg-[#79D7BE] text-white px-16 py-4 rounded-4xl font-bold drop-shadow-xl hover:opacity-75 duration-300'>Begin Interview</button>
            </Link  >
        </div >
    )
}
