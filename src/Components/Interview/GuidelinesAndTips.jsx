import React from 'react'
import { Link } from 'react-router-dom'

export default function GuidelinesAndTips() {
    return (
        <div className="flex flex-col justify-center px-8 lg:px-32 py-10 gap-8 bg-[#F6F4F0] min-h-[calc(100vh-68px)]">
            {/* <h1 className='text-2xl font-bold text-black'>.Net Backend Interview - Junior Level</h1> */}
            <div className="flex flex-col gap-4">
                <p className='text-2xl font-semibold text-[#152A4C]'>General Guidelines and Tips For Success.</p>
                <p className='text-lg text-[#696F79] italic'>Please make sure to read the instructions well.</p>
            </div>
            <div className="flex flex-col justify-between gap-10">
                <ul className='flex flex-col gap-8 list-disc list-inside'>
                    <li className='text-xl text-[#263238] font-semibold'>
                        You will face a variety of question types,
                        including multiple-choice, coding challenges, and essay-style questions.
                    </li>
                    <li className='text-xl text-[#263238] font-semibold'>Each question is timed to simulate real interview conditions.</li>
                    <li className='text-xl text-[#263238] font-semibold'>Read each question carefully before answering.</li>
                    <li className='text-xl text-[#263238] font-semibold'>You can navigate between questions, but be mindful of the timer.</li>
                    <li className='text-xl text-[#263238] font-semibold'>Detailed feedback will be provided at the end of the session,
                        highlighting your strengths and areas for improvement.</li>
                    <li className='text-xl text-[#263238] font-semibold'>Use a desktop or laptop for the best experience. Mobile devices are not recommended for coding questions.</li>
                </ul>
                <Link to="/Begin-Interview" className='self-end'>
                    <button className=' bg-[#152A4C] text-white px-16 py-4 rounded-4xl font-bold hover:opacity-85 duration-300'>Next</button>
                </Link  >
            </div>
        </div>
    )
}
