import React from 'react'
import { Link } from 'react-router-dom'
import img from '../../assets/begin.png'

export default function BeginInterview() {
    return (
        <div className="flex flex-col justify-center items-center px-8 lg:px-32 py-10 gap-12 bg-[#F6F4F0] min-h-[calc(100vh-68px)] animate-fade-in">

            <div className="flex flex-col items-center gap-8 text-center">
                <img
                    src={img}
                    className='w-3/4 md:w-1/4 animate-bounce-slow'
                    alt="Interview Preparation"
                />

                <p className='text-[#152A4C] font-semibold text-xl md:text-2xl md:w-[650px] leading-9 md:leading-10'>
                    This is a safe space to practice and learn.
                    Do your best and don’t worry about making mistakes,
                    they’re part of the learning process!
                </p>
            </div>

            <Link to="/interviewq">
                <button className='bg-[var(--dark-blue)] text-white px-16 py-4 rounded-4xl font-bold drop-shadow-xl hover:opacity-90 hover:scale-105 transition-all duration-300'>
                    Begin Interview
                </button>
            </Link>
        </div>
    )
}
