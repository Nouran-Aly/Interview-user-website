import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import apiClient from '../Api/Axios';

export default function DetailedReport() {
    const [data, setData] = useState([])
    const location = useLocation()
    const id = location?.state?.id || {}
    console.log(id);

    async function getPerformanceData() {
        try {
            const response = await apiClient.get(`performance/interviews/${id}/details`)
            console.log(response.data);
            setData(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPerformanceData()
    }, [id])

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


                <div className="mt-8">
                    <p className="text-[#152A4C] font-bold text-2xl pb-6">Detailed Report</p>
                    <div className="grid gap-6">
                        {data?.detailedResults?.map((result) => (
                            <div
                                key={result.questionId}
                                className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
                            >
                                <div className="flex items-center gap-5">
                                    <p className="font-medium text-lg mb-2 text-[#152A4C]">{result.questionText}</p>
                                    <p className={`text-sm font-semibold mb-1 ${result.isCorrect ? 'text-green-600' : 'text-red-500'}`}
                                    >
                                        {result.isCorrect ? '✅ Correct Answer' : '❌ Wrong Answer'}
                                    </p>
                                </div>
                                <p className="text-sm text-gray-600">
                                    <span className="font-semibold text-[#152A4C]">Feedback:</span> {result.feedback}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div >

        </>
    )
}


