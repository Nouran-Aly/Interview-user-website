import React, { useEffect, useState } from 'react'
import img from '../../assets/Vector.svg'
import img1 from '../../assets/boost.svg'
import img2 from '../../assets/check.svg'
import img3 from '../../assets/dashboard.svg'
import img4 from '../../assets/Path.png'
import fe from '../../assets/FE.png'
import be from '../../assets/BE.png'
import ma from '../../assets/MA.png'
import ai from '../../assets/AI.png'
import img5 from '../../assets/exam.svg'
import apiClient from '../Api/Axios'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


export default function Profile() {
    const [interviews, setInterviews] = useState([])
    const [summary, setSummary] = useState([])
    const token = JSON.parse(localStorage.getItem("userToken"))
    const decToken = jwtDecode(token?.accessToken)
    const name = decToken?.given_name
    const navigate = useNavigate()

    async function getSummary() {
        try {
            const response = await apiClient.get("performance/summary")
            console.log(response, "summary");
            setSummary(response.data)
        } catch (error) {
            console.log(error);
        }
    }


    async function getInterviews() {
        try {
            const response = await apiClient.get("performance/interviews", {
                params: {
                    page: 1,
                    pageSize: 100
                }
            })
            console.log(response);
            setInterviews(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSummary()
        getInterviews()
    }, [])

    const formatDate = (date) => {
        const formattedDate = new Date(date);
        return formattedDate?.toISOString()?.split("T")[0]
    }

    const viewAnalysis = (id) => {
        navigate("/DetaildReport", { state: { id: id } })
    }

    const handleChangePrefrences = () => {
        navigate('/prefrences')
    }

    const duration = (time) => {
        if (!time) return
        const [hours, minutes, secondsWithFraction] = time.split(":")
        const seconds = parseFloat(secondsWithFraction)
        const totalMinuts = parseInt(hours) * 60 + parseInt(minutes) + seconds / 60
        return totalMinuts.toFixed(2)
    }

    const experienceColors = {
        'Entry': 'bg-sky-200 text-sky-800',
        'Junior': 'bg-green-200 text-green-800',
        'MidLevel': 'bg-yellow-200 text-yellow-800',
        'Senior': 'bg-orange-200 text-orange-800',
        'Lead': 'bg-red-200 text-red-800',
        'Principal': 'bg-purple-200 text-purple-800',
        'Architect': 'bg-indigo-200 text-indigo-800',
    };

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "Are You Sure Yo Want To Logout",
            // text: "You Won't Be Able to Edit This Answers After Submission",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No, Cancel",
            customClass: {
                confirmButton: '!bg-[#2E5077] text-white hover:bg-[#e68b10] px-4 py-2 rounded',
                cancelButton: '!bg-[#d33] text-white hover:bg-red-700 px-4 py-2 rounded ms-2',
            },
            buttonsStyling: false
        })
        if (result.isConfirmed) {
            localStorage.removeItem('userToken')
            navigate("/login")
        }
    }

    return (
        <div className="px-6 lg:px-24 py-10 bg-[#F6F4F0] min-h-screen space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-2 " >
                <div className="items-center gap-4">
                    <p className='font-bold text-2xl text-[#152A4C]'>Welcome Back <span className='text-[#4DA1A9]'>{name}</span></p>
                </div>
                <div className="self-end flex items-center gap-2">
                    <button onClick={handleChangePrefrences} className='bg-[#152A4C] rounded-xl text-white px-8 py-3 font-semibold border transition-all duration-300 hover:bg-white hover:text-[#152A4C]'>Change Prefrences</button>
                    <button onClick={handleLogout} className='bg-red-700 rounded-xl text-white px-4 py-3 font-semibold border border-red-700 transition-all duration-300 hover:bg-white hover:text-red-700'>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </button>

                </div>

            </div>


            {/* dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
                <div className="lg:col-span-1 bg-gradient-to-r to-[#4DA1A9] from-[#152A4C] text-white p-6 rounded-3xl shadow-xl flex flex-col justify-between hover:scale-[1.02] transition-all duration-300">
                    <div className="flex flex-col">
                        <p className="text-lg font-light">Total Interviews</p>
                        <p className="text-5xl font-bold mt-4">{summary?.totalInterviewsTaken}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className={`bg-white px-5 py-4 rounded-2xl shadow-md flex items-center gap-4 hover:scale-105 transition`}>
                        <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-full">
                            <img src={img} className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Answered Questions</p>
                            <p className="text-2xl font-bold text-gray-800">{summary?.totalQuestionsAnswered}</p>
                        </div>
                    </div>
                    <div className={`bg-white px-5 py-4 rounded-2xl shadow-md flex items-center gap-4 hover:scale-105 transition`}>
                        <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-full">
                            <img src={img} className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Correct Answers</p>
                            <p className="text-2xl font-bold text-gray-800">{summary?.totalCorrectAnswers}</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className={`p-4 rounded-2xl shadow-md flex flex-col justify-center items-center gap-2 bg-[#152a4c] text-white `}>
                        <img src={img} className="h-5 w-5 mb-2 mx-auto" />
                        <p className="text-sm">Avg. Duration</p>
                        <p className="text-xl font-bold">{duration(summary?.averageInterviewDuration)} H</p>
                    </div>
                    <div className={`p-4 rounded-2xl shadow-md flex flex-col justify-center items-center gap-2 bg-[#2E6279] text-white `}>
                        <img src={img} className="h-5 w-5 mb-2 mx-auto" />
                        <p className="text-sm">Avg. Score</p>
                        <p className="text-xl font-bold">{summary?.averageScorePercentage} %</p>
                    </div>
                    <div className={`p-4 rounded-2xl shadow-md flex flex-col justify-center items-center gap-2 bg-[#4DA1A9] text-white `}>
                        <img src={img} className="h-5 w-5 mb-2 mx-auto" />
                        <p className="text-sm">Accuracy</p>
                        <p className="text-xl font-bold">{summary?.averageAccuracyPercentage} %</p>
                    </div>
                </div>
            </div>



            {/* recent interviews */}
            <div className="bg-[#F6F4F0] mt-16 rounded-3xl  w-full">
                <h2 className="text-[#152A4C] text-2xl font-bold mb-10">Recent Interviews</h2>
                <div className="grid lg:grid-cols-2 gap-8">
                    {interviews?.map((interview) => (
                        <div key={interview.interviewId} className="bg-white rounded-3xl p-5 flex flex-col sm:flex-row gap-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.12)] transition-shadow duration-300">
                            {/* Image */}
                            <div className="relative flex-shrink-0 w-full max-h-[200px] sm:w-[200px] rounded-2xl overflow-hidden">
                                {interview.role == "Backend" ? (
                                    <img src={be} alt="interview" className="w-full h-full object-cover rounded-2xl bg-[var(--dark-navy-blue)]" />
                                ) : interview.role == "Frontend" ? (
                                    <img src={fe} alt="interview" className="w-full h-full object-cover rounded-2xl" />
                                ) : interview.role == "Mobile" ? (
                                    <img src={ma} alt="interview" className="w-full h-full object-cover rounded-2xl" />
                                ) : interview.role == "AI" ? (
                                    <img src={ai} alt="interview" className="w-full h-full object-cover rounded-2xl" />
                                ) : null}
                                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold shadow-sm
                                ${experienceColors[interview.experienceLevel] || 'bg-gray-100 text-[#152A4C]'}`}>
                                    {interview.experienceLevel}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex flex-col justify-between w-full">
                                <div className="grid grid-cols-2 sm:grid-cols-1 gap-y-2 sm:gap-y-5 gap-x-4 text-sm text-[#152A4C] font-medium">
                                    <p> Correct:{" "}<span className="text-gray-500">{interview.correctAnswers}</span> </p>
                                    <p>Score:{" "}<span className="text-gray-500">{interview.scorePercentage}%</span>
                                    </p>
                                    <p>Total Qs:{" "}<span className="text-gray-500">{interview.totalQuestions}</span>
                                    </p>
                                    <p>Date:{" "}<span className="text-gray-500">{formatDate(interview.completedDate)}</span>
                                    </p>
                                </div>

                                <div className="flex justify-end mt-4">
                                    <button onClick={() => viewAnalysis(interview.interviewId)} className="text-sm px-5 py-2 rounded-full border-2 border-[#152A4C] text-[#152A4C] font-semibold hover:bg-[#152A4C] hover:text-white transition" >
                                        View Analysis
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
