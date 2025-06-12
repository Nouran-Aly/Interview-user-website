import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import apiClient from '../Api/Axios';
import Loader from '../Loader/Loader';

export default function DetailedReport() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const id = location?.state?.id || {}
    console.log(id);

    async function getPerformanceData() {
        setLoading(true)
        try {
            const response = await apiClient.get(`performance/interviews/${id}/details`)
            console.log(response.data, "DATA");
            setData(response.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPerformanceData()
    }, [id])

    if (loading) {
        return <Loader />
    }

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

            <div className="flex flex-col py-8 gap-8 bg-[#F6F4F0] min-h-[calc(100vh-70px)]">
                <div className="bg-white p-10 shadow-lg max-w-5xl mx-auto space-y-3">
                    {/* Title */}
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-black">{data?.title}</h1>
                    </div>

                    {/* Summary Section */}
                    <div className="space-y-1">
                        <p className="text-xl font-semibold text-[#152A4C]">Overall Performance Summary</p>
                        <p className="text-sm text-[#696F79] italic">*Based on real interview analysis techniques</p>
                    </div>

                    {/* Score Circle */}
                    <div className="flex justify-center">
                        <div className="w-40 h-40 border-[15px] border-[#152A4C] rounded-full flex items-center justify-center">
                            <p className="text-3xl font-bold">{data?.standardQuestionsScorePercentage}%</p>
                        </div>
                    </div>

                    {/* Results Overview */}
                    <div className="flex flex-col gap-2 text-center space-y-2">
                        <p className="text-[#152A4C] font-semibold text-2xl">
                            You answered: {data?.correctStandardAnswers}/{data?.totalStandardQuestions}
                        </p>
                        <p className="text-gray-600">Time taken: {duration(data?.durationTaken)} minutes</p>
                        <p className="text-lg">
                            Your overall performance score:{" "}
                            <span className="text-[#79D7BE] font-semibold">
                                {data?.standardQuestionsScorePercentage}%
                            </span>
                        </p>
                    </div>

                    {/* Problem Solving Section */}
                    {/* <div className="bg-[#F9FAFB] p-5 rounded-lg space-y-2">
                        <p className="text-xl font-semibold text-[#152A4C]">Problem Solving Evaluation</p>
                        <ul className="list-disc list-inside text-gray-700 text-sm">
                            <li>Accuracy in logic and implementation</li>
                            <li>Time complexity awareness</li>
                            <li>Clear communication of thought process</li>
                            <li>Debugging and edge-case handling</li>
                        </ul>
                    </div> */}
                    {/* Problem Solving Summary */}
                    <div className='mt-8'>
                        <h2 className="text-xl font-semibold text-[#152A4C] mb-2">Problem Solving</h2>

                        {/* Show overall status or message if none solved */}
                        {data?.solvedProblemSolvingQuestions === 0 ? (
                            <p className="italic text-gray-500 pb-3">You haven't attempted any problem-solving questions yet.</p>
                        ) : (
                            <p className="mb-4 text-gray-700 pb-3">
                                Solved {data.solvedProblemSolvingQuestions} of {data.totalProblemSolvingQuestions} problem-solving questions.
                            </p>
                        )}

                        {/* List each problem-solving question */}
                        <div className="space-y-3">
                            {data?.detailedProblemSolvingResults?.map((problem) => (
                                <div
                                    key={problem.problemSolvingQuestionId}
                                    className="p-4 rounded-lg border border-gray-300 bg-[#F9FAFB] flex justify-between items-center"
                                >
                                    <div>
                                        <p className="font-semibold text-[#152A4C]">{problem.problemTitle}</p>
                                        <p className="text-sm text-gray-600">
                                            Passed Test Cases: {problem.passedTestCases} / {problem.totalTestCases}
                                        </p>
                                    </div>
                                    <p
                                        className={`font-semibold ${problem.submissionStatus === "Passed"
                                            ? "text-green-600"
                                            : problem.submissionStatus === "Not Attempted"
                                                ? "text-gray-400 italic"
                                                : "text-red-600"
                                            }`}
                                    >
                                        {problem.submissionStatus}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8">
                        <p className="text-xl font-semibold text-[#152A4C] pb-3">Detailed Report</p>
                        <div className="grid gap-3">
                            {data?.detailedStandardResults?.map((result) => (
                                <div
                                    key={result.questionId}
                                    className="p-4 rounded-lg border border-gray-300 bg-[#F9FAFB] flex flex-col justify-between items-center"
                                >
                                    <div className="flex justify-between items-center gap-5 w-full">
                                        <p className="font-semibold mb-2 text-[#152A4C]">{result.questionText}</p>
                                        <p className={`text-sm font-semibold mb-1 ${result.isCorrectOverall ? 'text-green-600' : 'text-red-600'}`}
                                        >
                                            {result.isCorrectOverall ? '✅ Correct Answer' : '❌ Wrong Answer'}
                                        </p>
                                    </div>
                                    {result.userSubmittedTextAnswer ? (
                                        <p className="self-start text-sm text-gray-600">
                                            <span className="font-semibold text-[#152A4C]">Answer:</span> {result.userSubmittedTextAnswer}
                                        </p>
                                    ) : null}

                                    <p className="self-start text-sm text-gray-600">
                                        <span className="font-semibold text-[#152A4C]">Feedback:</span> {result.feedback}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* <div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto space-y-6">
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
                </div> */}


                {/* <div className="mt-8">
                    <p className="text-[#152A4C] font-bold text-2xl pb-6">Detailed Report</p>
                    <div className="grid gap-6">
                        {data?.detailedStandardResults?.map((result) => (
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
                </div> */}

            </div >



        </>
    )
}


