import React from 'react'
import img from '../../assets/bro.png'
import { Link } from 'react-router-dom'

export default function WelcomePage() {
    return (
        <div className="flex flex-col justify- items- px-8 lg:px-32 py-12 gap-12 bg-[#F6F4F0] min-h-[calc(100vh-68px)]">

            <div className="w-full max-w-4xl flex flex-col gap-4 text-left">
                <h1 className='text-4xl font-bold text-[#152A4C]'>Welcome to Your Interview Simulation</h1>
                <p className='text-lg text-[#696F79] italic'>Please review the instructions carefully before you begin.</p>
            </div>

            <div className="flex flex-col justify-center items-center self-center gap-10 w-full max-w-4xl">
                <img src={img} alt="Interview Simulation" className='w-2/3 md:w-1/3' />

                <p className='text-[#152A4C] font-medium text-xl md:text-2xl text-center leading-8 md:leading-10'>
                    This simulation is designed to assess your technical skills and provide personalized feedback.
                    Take your time, stay focused, and use this opportunity to sharpen your abilities.
                </p>

                <Link to="/Guidelines-and-tips">
                    <button className='bg-[#152A4C] text-white px-16 py-4 rounded-3xl font-bold shadow-md hover:opacity-85 hover:scale-105 transition-all duration-300'>
                        Next
                    </button>
                </Link>
            </div>
        </div>
    )
}
