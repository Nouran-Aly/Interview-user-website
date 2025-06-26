import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../Api/Axios';
import CodeQuestion from '../Interview/CodeQuestion/CodeQuestion';

export default function DifficultySelection() {
    const [probelms, setProbelms] = useState([])
    const [paginationData, setpaginationData] = useState([])
    const navigate = useNavigate();

    const handleSelect = (level) => {
        // navigate(`/problem-solving/${level}`);
        console.log("Selected");
        navigate("/Problem-Solving-Interview", {
            state: { level: level }
        });
    };


    return (
        <div className="min-h-[calc(100vh-68px)] bg-[#F6F4F0] flex items-center justify-center px-6 py-10">
            <div className="flex flex-col gap-8 items-center text-center max-w-3xl w-full">

                <h1 className="text-3xl md:text-4xl font-bold text-[#152A4C]">
                    Choose Your Challenge Level
                </h1>

                <p className="text-lg md:text-xl text-[#152A4C] max-w-xl">
                    Select the difficulty for your problem-solving practice. Start easy or challenge yourself!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">

                    {/* Easy Card */}
                    <div
                        className="bg-white p-6 rounded-2xl shadow-md border hover:scale-105 transition cursor-pointer flex flex-col items-center gap-4"
                        onClick={() => handleSelect('1')}
                    >
                        <div className="text-green-600 text-2xl font-bold">Easy</div>
                        <p className="text-gray-600 text-center">Beginner-friendly logic and basic coding challenges.</p>
                    </div>

                    {/* Medium Card */}
                    <div
                        className="bg-white p-6 rounded-2xl shadow-md border hover:scale-105 transition cursor-pointer flex flex-col items-center gap-4"
                        onClick={() => handleSelect('2')}
                    >
                        <div className="text-yellow-500 text-2xl font-bold">Medium</div>
                        <p className="text-gray-600 text-center">Standard interview-level problems to sharpen your skills.</p>
                    </div>

                    {/* Hard Card */}
                    <div
                        className="bg-white p-6 rounded-2xl shadow-md border hover:scale-105 transition cursor-pointer flex flex-col items-center gap-4"
                        onClick={() => handleSelect('3')}
                    >
                        <div className="text-red-500 text-2xl font-bold">Hard</div>
                        <p className="text-gray-600 text-center">Challenging problems to push your limits and prepare for top interviews.</p>
                    </div>

                </div>
            </div>
        </div>
    )
}
