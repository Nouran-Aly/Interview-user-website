import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Interview() {
    return (
        <div className="flex flex-col px-8 lg:px-32 py-10 gap-8 bg-[#F6F4F0] min-h-[calc(100vh-68px)]">
            <div className="flex justify-between">
                <h1 className='text-2xl font-bold text-black'>.Net Backend Interview - Junior Level</h1>
                <p className='font-bold text-4xl'>25:00</p>
            </div>
            <div className="flex flex-col gap-4">
                <p className='text-2xl font-semibold text-[#152A4C]'>Question 1/35</p>
                <p className='text-lg text-[#696F79] italic'>Object Oriented Programming</p>
            </div>
            <div className="question flex flex-col place-items-center gap-8 mt-5">
                <p className='font-medium text-2xl text-center'>Which C# concept has the capability of an object to take number of different forms and hence display behaviour as accordingly?</p>
                <ul className='mt-10 flex flex-col gap-8'>
                    <li className='bg-white px-40 py-4.5 text-center text-2xl rounded-4xl border border-[#152A4C]'>Polymorphism</li>
                    <li className='bg-white px-40 py-4.5 text-center text-2xl rounded-4xl border border-[#152A4C]'>Polymorphism</li>
                    <li className='bg-white px-40 py-4.5 text-center text-2xl rounded-4xl border border-[#152A4C]'>Polymorphism</li>
                    <li className='bg-white px-40 py-4.5 text-center text-2xl rounded-4xl border border-[#152A4C]'>Polymorphism</li>
                </ul>
                {/* <div className="flex items-center">
                        <input id="link-radio" type="radio" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="link-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Radio button with a <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">link inside</a>.</label>
                    </div> */}
                <Link to="/Begin-Interview" className='self-end'>
                    <button className=' bg-[#152A4C] text-white px-16 py-4 rounded-4xl font-bold'>Next</button>
                </Link  >
            </div>

        </div>
    )
}
