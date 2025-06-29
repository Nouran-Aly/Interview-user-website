import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import apiClient from '../../Api/Axios';
import roadmap from '../../../assets/roadmap.jpeg';

export default function Report() {
    const location = useLocation()
    const navigate = useNavigate()
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

    const handleAnalysis = () => {
        navigate("/DetaildReport", { state: { id: interviewId } })
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
                    <p className='text-[#152A4C] font-semibold text-[28px]'>You’ve Answered : {data?.answeredStandardQuestions}/10  </p>
                    <p className="text-lg">Time taken: {duration(data?.durationTaken)} minutes</p>
                    <p className='text-lg'>Your overall performance score: <span className='text-[var(--teal-blue)] font-semibold'>{data?.standardQuestionsScorePercentage}%</span></p>
                </div>
                <button onClick={handleAnalysis} className='bg-gradient-to-r from-[var(--dark-blue)] to-[var(--teal-blue)] text-white font-medium py-3 px-5 self-center rounded-xl'>View Full Analysis</button>
                <div className="mt- relative rounded-xl overflow-hidden border border-gray-300 shadow-lg md:w-1/2 md:self-center">
                    <img
                        src={roadmap}
                        alt="Roadmap Preview"
                        className="w-full h-60 object-cover filter blur-sm"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/40 text-white text-center px-4">
                        <p className="text-2xl font-bold mb-2">Unlock Your Full Roadmap!</p>
                        <p className="mb-4 text-sm">Download our app to access your personalized learning journey.</p>
                        <a
                            href='https://play.google.com/store/apps/details?id=com.nub.intervyou&pcampaignid=web_share'
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2 bg-[#152A4C] text-white rounded-full hover:bg-[#0f1d38] transition"
                        >
                            Download the App
                        </a>
                    </div>
                </div>


            </div>
        </>
    )
}
