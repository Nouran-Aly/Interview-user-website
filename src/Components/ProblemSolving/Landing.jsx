import React from 'react'
import { Link } from 'react-router-dom'
import img from '../../assets/bro.png'

export default function Landing() {
    return (
        <div className="min-h-[calc(100vh-68px)] bg-[#F6F4F0] flex items-center justify-center px-6 lg:px-20 py-10">

            <div className="flex flex-col-reverse md:flex-row items-center gap-10 max-w-6xl w-full">

                {/* Text Content */}
                <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#152A4C]">
                        Welcome to the Problem Solving Zone! 🎯
                    </h1>
                    <p className="text-[#152A4C] text-lg md:text-xl leading-relaxed">
                        Practice real-world coding and logic problems designed to boost your interview skills.
                        Step by step, sharpen your thinking and get ready to ace your technical interviews.
                    </p>

                    <div className="flex flex-col gap-2 text-[#152A4C] text-base font-medium">
                        <span>✅ Improve Logical Thinking</span>
                        <span>✅ Prepare for Coding Interviews</span>
                        <span>✅ Build Confidence</span>
                    </div>

                    <Link to="/DifficultySelection">
                        <button className="mt-4 bg-[#152A4C] text-white px-8 py-3 rounded-2xl font-bold hover:opacity-90 transition duration-300">
                            Start Practicing
                        </button>
                    </Link>
                </div>

                {/* Image */}
                <div className="flex-1 flex justify-center">
                    <img src={img} alt="Problem Solving" className="w-3/4 md:w-full max-w-md" />
                </div>

            </div>
        </div>
    )
}
