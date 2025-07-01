import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import apiClient from '../Api/Axios';
import Loader from '../Loader/Loader';
import roadmap from '../../assets/roadmap.jpeg';

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
                                        className={`font-semibold ${problem.submissionStatus === "Accepted"
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
                                    className="p-4 rounded-lg border border-gray-300 bg-[#F9FAFB] flex flex-col justify-between items-center gap-2"
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

                                    {result.questionType === "mcq" && result.isCorrectOverall == false ? (
                                        <div className="self-start flex gap-0.5 text-sm text-gray-600">
                                            <span className="font-semibold text-[#152A4C]">Correct Answer:</span> { }
                                            {Array.isArray(result?.allQuestionOptionsWithUserSelection) && result.allQuestionOptionsWithUserSelection.map((selection) => (
                                                <div key={selection.optionId}>
                                                    <p>
                                                        {selection.isCorrectAnswer ? (selection.text) : null}
                                                    </p>
                                                </div>
                                            ))}

                                        </div>
                                    ) : null}

                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 relative rounded-xl overflow-hidden border border-gray-300 shadow-lg">
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


            </div >



        </>
    )
}


