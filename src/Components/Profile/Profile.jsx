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

    return (
        <div className='px-8 lg:px-32 py-8 bg-[#F6F4F0] min-h-screen'>
            <div className="flex flex-col md:flex-row  justify-between items-center gap-2 " >
                <div className="items-center gap-4">
                    <p className='font-bold text-2xl text-[#152A4C]'>Welcome Back <span className='text-[#79D7BE]'>{name}</span></p>
                    <div className='flex justify-between items-center gap-3'>
                        {/* <div className="flex gap-4 shadow-[0px_4px_4px_0px_rgba(21,42,76,0.2)] px-7 py-5 rounded-3xl">
                            <img src={img} alt="" />
                            <div className="flex flex-col">
                                <p>76</p>
                                <p>Achievements</p>
                            </div>
                        </div> */}
                    </div>

                </div>
                <button onClick={handleChangePrefrences} className='bg-[#152A4C] rounded-3xl text-white px-8 py-3 font-semibold border transition-all duration-300 hover:bg-white hover:text-[#152A4C]'>Change Prefrences</button>

            </div>

            {/* dashboard */}
            <div className="grid md:grid-cols-4 gap-5  mt-10">
                {/* <div className="grid grid-cols-2 gap-5"> */}
                <div className="flex items-center gap-4 shadow-[0px_4px_16px_0px_rgba(21,42,76,0.2)] px-2 md:px-7 py-5 rounded-3xl ">
                    <div className="grid h-10 w-10 rounded-full bg-amber-100">
                        <img src={img4} alt="" className='m-auto' />
                    </div>
                    <div className="flex flex-col">
                        <p className='font-semibold text-lg'>{summary?.totalInterviewsTaken}</p>
                        <p className='font-semibold text-[#9098A3]'>Interviews</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 shadow-[0px_4px_16px_0px_rgba(21,42,76,0.2)] px-7 py-5 rounded-3xl ">
                    <div className="grid h-8 w-8 rounded-full">
                        <img src={img3} alt="" className='m-auto' />
                    </div>
                    <div className="flex flex-col">
                        <p className='font-semibold text-lg'>{(summary.averageInterviewDuration)} h</p>
                        <p className='font-semibold text-[#9098A3]'>Preparation Time</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 shadow-[0px_4px_16px_0px_rgba(21,42,76,0.2)] px-7 py-5 rounded-3xl ">
                    <div className="grid h-8 w-8 rounded-full ">
                        <img src={img2} alt="" className='m-auto' />
                    </div>
                    <div className="flex flex-col">
                        <p className='font-semibold text-lg'>{(summary.averageAccuracyPercentage)}</p>
                        <p className='font-semibold text-[#9098A3]'>Accuracy </p>
                    </div>
                </div>
                <div className="flex items-center gap-4 shadow-[0px_4px_16px_0px_rgba(21,42,76,0.2)] px-7 py-5 rounded-3xl ">
                    <div className="grid h-8 w-8 rounded-full">
                        <img src={img1} alt="" className='m-auto' />
                    </div>
                    <div className="flex flex-col">
                        <p className='font-semibold text-lg'>{(summary.totalCorrectAnswers)}</p>
                        <p className='font-semibold text-[#9098A3]'>
                            Correct Answers</p>
                    </div>
                </div>
                {/* </div> */}
            </div>

            {/* recent interviews */}
            <div className="bg-[#F6F4F0] shadow-[0px_4px_16px_0px_rgba(21,42,76,0.2)] mt-12 rounded-3xl p-6 w-full">
                <p className='text-[#152A4C] text-2xl font-bold pb-10'>Recent Interviews</p>
                <div className="grid md:grid-cols-2 gap-10">
                    {interviews?.map((interview) => (
                        <>
                            <div key={interview.interviewId} className="flex flex-col md:flex-row w-full">
                                <div className='relative w-full md:w-[500px] overflow-hidden rounded-4xl'>
                                    <img src={be} className='rounded-4xl w-full md:w-[350px] object-cover' alt="" />
                                    <div className="absolute bg-white min-h-fit w-1/3 right-0 h-8 rounded-s-4xl top-2.5 backdrop-blur-2xl flex items-center overflow-hidden">
                                        <p className='font-bold text-[#152A4C] px-3 truncate'>{interview?.experienceLevel} </p>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between md:items-center w-full md:ml-10">
                                    <div className="flex flex-col justify-between items-center gap-4 my-6 md:my-0">
                                        <p className='font-semibold text-[18px] text-[#152A4C]'>Correct Answers : <span className='font-bold text-gray-500'>{interview.correctAnswers}</span> </p>
                                        <p className='font-semibold text-[18px] text-[#152A4C]'>Score Percentage : <span className='font-bold text-gray-500'>{interview.scorePercentage}</span> </p>
                                        <p className='font-semibold text-[18px] text-[#152A4C]'>Total Questions : <span className='font-bold text-gray-500'>{interview.totalQuestions}</span> </p>
                                        <p className='font-semibold text-[18px] text-[#152A4C]'>Date <span className='font-bold text-gray-500'>{formatDate(interview?.completedDate)}</span> </p>
                                        <button onClick={() => (viewAnalysis(interview.interviewId))} className='self-end px-8 py-3 text-[18px] border-2 border-[#152A4C] shadow-[0px_4px_4px_0px_rgba(21,42,76,0.2)] rounded-4xl font-semibold transition-all duration-300 hover:bg-[#152A4C] hover:text-white'>View Analysis</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}

                </div>
            </div>
        </div>
    )
}
