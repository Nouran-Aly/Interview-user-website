import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import apiClient from '../../Api/Axios';

export default function Report() {
    const location = useLocation()
    const { data } = location?.state || {}
    console.log(data, "data");
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
                    <p className='text-2xl'>{data?.scorePercentage}%</p>
                </div>
                <div className="flex flex-col self-center gap-4 text-center">
                    <p className='text-[#152A4C] font-semibold text-[28px]'>You’ve Answered : {data?.correctAnswers}/10  </p>
                    <p className='text-lg'>You’ve completed the interview in 21 mins.</p>
                    <p className='text-lg'>Your overall performance score: <span className='text-[#79D7BE] font-semibold'>{data?.scorePercentage}%</span></p>
                </div>



            </div>
        </>
    )
}
