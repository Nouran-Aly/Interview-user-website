import React from 'react'
import { Link } from 'react-router-dom'

export default function GuidelinesAndTips() {
    return (
        <div className="flex flex-col justify-center px-8 lg:px-32 py-10 gap-8 bg-[#F6F4F0] min-h-[calc(100vh-68px)] animate-fade-in">

            <div className="flex flex-col gap-4">
                <h1 className='text-3xl font-bold text-[#152A4C]'>🚀 General Guidelines and Tips For Success</h1>
                <p className='text-lg text-[#696F79] italic'>Please make sure to read the instructions well before starting.</p>
            </div>

            <div className="flex flex-col justify-between gap-10">
                <ul className='flex flex-col gap-6'>

                    <li className='flex items-center gap-3 '>
                        <span className="text-2xl mt-1">💡</span>
                        <span className='text-xl text-[#263238] font-medium'>
                            You will face a variety of question types, including multiple-choice, coding challenges, and essay-style questions.
                        </span>
                    </li>

                    <li className='flex items-center gap-3 '>
                        <span className="text-2xl mt-1">⏱️</span>
                        <span className='text-xl text-[#263238] font-medium'>
                            Each question is timed to simulate real interview conditions.
                        </span>
                    </li>

                    <li className='flex items-center gap-3 '>
                        <span className="text-2xl mt-1">📝</span>
                        <span className='text-xl text-[#263238] font-medium'>
                            Read each question carefully before answering.
                        </span>
                    </li>

                    <li className='flex items-center gap-3 '>
                        <span className="text-2xl mt-1">🔄</span>
                        <span className='text-xl text-[#263238] font-medium'>
                            You can navigate between questions, but be mindful of the timer.
                        </span>
                    </li>

                    <li className='flex items-center gap-3 '>
                        <span className="text-2xl mt-1">✅</span>
                        <span className='text-xl text-[#263238] font-medium'>
                            Detailed feedback will be provided at the end, highlighting your strengths and areas for improvement.
                        </span>
                    </li>

                    <li className='flex items-center gap-3 '>
                        <span className="text-2xl mt-1">💻</span>
                        <span className='text-xl text-[#263238] font-medium'>
                            Use a desktop or laptop for the best experience. Mobile devices are not recommended for coding questions.
                        </span>
                    </li>

                </ul>

                <Link to="/Begin-Interview" className='self-end'>
                    <button className='bg-[#152A4C] text-white px-16 py-4 rounded-4xl font-bold hover:opacity-85 hover:scale-105 transition-all duration-300 shadow-lg'>
                        Start Interview
                    </button>
                </Link>
            </div>
        </div>
    )
}
