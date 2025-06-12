import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import apiClient from '../../Api/Axios';

export default function Report() {
    const location = useLocation()
    const { data, problems } = location?.state || {}
    console.log(data, "data");
    console.log(problems, "problems");
    const interviewId = data?.interviewId

    async function getPerformanceData() {
        try {
            const response = await apiClient.get(`performance/interviews/${interviewId}/details`)
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPerformanceData()
    }, [interviewId])

    const duration = (time) => {
        if (!time) return
        const [hours, minutes, secondsWithFraction] = time.split(":")
        const seconds = parseFloat(secondsWithFraction)
        const totalMinuts = parseInt(hours) * 60 + parseInt(minutes) + seconds / 60
        return totalMinuts.toFixed(2)
        console.log("hours:", hours);
        console.log("minutes:", minutes);
        console.log("secondsWithFraction:", secondsWithFraction);
        console.log("seconds:", seconds);
        console.log("totalMinuts:", totalMinuts.toFixed(2));
    }

    return (
        <>
            <div className="flex flex-col px-8 lg:px-32 py-8 gap-8 bg-[#F6F4F0] min-h-[calc(100vh-70px)]">
                <div className="flex justify-between">
                    <h1 className='text-2xl font-bold text-black'>{data?.title} </h1>
                </div>
                <div className="flex flex-col gap-4">
                    <p className='text-2xl font-semibold text-[#152A4C]'>Overall Performance Summary</p>
                    <p className='text-lg text-[#696F79] italic'>*Based on well-defined analysis techniques simulates real companies interviews </p>
                </div>
                <div className="flex justify-center items-center w-50 h-50 border-[15px] border-[#152A4C] rounded-full self-center">
                    <p className='text-2xl'>{data?.standardQuestionsScorePercentage}%</p>
                </div>
                <div className="flex flex-col self-center gap-4 text-center">
                    <p className='text-[#152A4C] font-semibold text-[28px]'>You’ve Answered : {data?.correctStandardAnswers}/10  </p>
                    <p className="text-lg">Time taken: {duration(data?.durationTaken)} minutes</p>
                    <p className='text-lg'>Your overall performance score: <span className='text-[#79D7BE] font-semibold'>{data?.standardQuestionsScorePercentage}%</span></p>
                </div>
                {/* <Link to="/ProblemSolving" state={{ problems: problems, interviewId: interviewId }}>
                    <button>Proced to problem solving questions ? </button>
                </Link> */}
            </div>
        </>
    )
}
