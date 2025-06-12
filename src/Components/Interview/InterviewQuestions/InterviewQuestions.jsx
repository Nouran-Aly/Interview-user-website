import { Field, Form, Formik, useFormik } from 'formik'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useRef, useState } from 'react'
import { useBlocker, useNavigate } from 'react-router-dom'
import apiClient from '../../Api/Axios'
import { toast, ToastContainer } from 'react-toastify'
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Loader from '../../Loader/Loader'
import Swal from 'sweetalert2'
import CodeQuestion from '../CodeQuestion/CodeQuestion'

export default function InterviewQuestions() {
    const [interviewId, setInterviewId] = useState()
    const [questions, setQuestions] = useState([])
    const [problemSolvingQuestions, setProblemSolvingQuestions] = useState([])
    const [paginationData, setPaginationData] = useState([])
    const [answers, setAnswers] = useState({})
    const [loading, setLoading] = useState(false)
    const [block, setBlock] = useState(true)
    const [timer, setTimer] = useState("")
    const [timeLeft, setTimeLeft] = useState(30 * 60);
    // const [currentPage, setCurrentPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentIndex, setCurrentIndex] = useState(0)
    const token = JSON.parse(localStorage.getItem('userToken'))
    const decToken = jwtDecode(token.accessToken)
    const userId = decToken.nameid
    // console.log(userId);
    const navigate = useNavigate()
    // console.log("block", block);
    const blockRef = useRef(true)
    const hasFetched = useRef(false);


    async function getInterviewQuestions() {
        try {
            const response = await apiClient.post(`Interview/start/user/${userId}`, null, {
                params: {
                    numberOfQuestions: 10,
                    timeLimitInMinutes: 30
                }
            }
            )
            console.log(response.data, "Get interview questions");
            setProblemSolvingQuestions(response?.data?.problemSolvingQuestions)
            setInterviewId(response.data.interviewId)
            setTimer(response.data.timeLimitInMinutes)
        } catch (error) {
            console.log(error);
        }
    }

    async function showInterviewQuestions(id, currentPage = 1) {
        return await apiClient.get(`InterviewQuestions/${id}/questions`, {
            params: {
                page: currentPage,
                pageSize: 1
            }
        })
            .then((res) => {
                console.log(res.data.items, "show Interview Questions");
                setQuestions(res.data.items)
                // console.log(res.data.pagination, "pagination");
                setPaginationData(res.data.pagination)
            }).catch((err) => {
                console.log(err.response);
            })
    }

    // Submit answer
    async function submitAnswer(values) {
        console.log("values:", values);

        return await apiClient.post(`InterviewQuestions/answer`, values)
            .then((res) => {
                console.log(res, "answer submitted");
            }).catch((err) => {
                console.log(err.response);
            })
    }

    // Submit Interview
    async function submitInterview(id) {
        console.log("submitInterview");

        const result = await Swal.fire({
            title: "You Will Proceed to the Problem Solving Question",
            text: "You Won't Be Able to Edit This Answers After Submission",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes Do It",
            cancelButtonText: "No, Cancel",
            customClass: {
                confirmButton: '!bg-[#2E5077] text-white hover:bg-[#e68b10] px-4 py-2 rounded',
                cancelButton: '!bg-[#d33] text-white hover:bg-red-700 px-4 py-2 rounded ms-2',
            },
            buttonsStyling: false
        })
        if (result.isConfirmed) {
            console.log("confirmed");
            try {
                // const response = await apiClient.post(`InterviewQuestions/${id}/submit`)
                // console.log(response, "interview submitted");
                // if (response.status === 200) {
                toast.success("Interview Submitted Successfully")
                // setTimeout(() => {
                //     navigate('/Report', { state: { data: response.data, problems: problemSolvingQuestions } })
                // }, 1000);
                setTimeout(() => {
                    navigate('/ProblemSolving', { state: { problems: problemSolvingQuestions, interviewId: interviewId, remainingTime: timeLeft } })
                }, 1000);
                // }
            } catch (error) {
                console.log(error.response);
                toast.error(error.response.data.message)
            }
        }

    }

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            getInterviewQuestions();
        }
    }, []);


    useEffect(() => {
        if (interviewId) {
            showInterviewQuestions(interviewId, currentPage)
            console.log(interviewId);
        }
    }, [interviewId])


    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handleSubmit = (problemSolvingQuestions) => {
        navigate("/ProblemSolving", state = { problems: problemSolvingQuestions, interviewId: interviewId })
    }

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber)
        showInterviewQuestions(interviewId, pageNumber)
    }


    return (
        <Formik
            enableReinitialize
            initialValues={{
                userId: userId,
                interviewId: interviewId ? Number(interviewId) : 0,
                questionId: questions[0]?.questionId || "",
                answerText: answers[questions[0]?.questionId]?.answerText || "",
                selectedOptionIds: answers[questions[0]?.questionId]?.selectedOptionIds || [0]
            }}
            onSubmit={async (values) => {
                console.log("ON Submit values : ", values);

                const answerData = {
                    ...values,
                    questionId: questions[0]?.questionId,
                    interviewId
                }
                console.log("answerData", answerData);

                await submitAnswer(answerData);
                // Save locally
                setAnswers(prev => ({
                    ...prev,
                    [answerData.questionId]: answerData,
                }));
                try {
                    console.log(values);
                    blockRef.current = false;
                    setBlock(false)
                    await submitAnswer(values)
                } catch (error) {
                    console.log(error);
                    blockRef.current = true;
                    setBlock(true)
                }

            }}
        >
            {({ values, setFieldValue, submitForm, resetForm }) => (
                <Form >
                    <ToastContainer position='bottom-right' autoClose={500} />
                    {questions.length > 0 ? questions?.map((question) => (
                        <div key={question.id} className="flex flex-col px-8 md:px-16 lg:px-28 py-8 gap-8 bg-[#F6F4F0] min-h-[calc(100vh-70px)] max-h-full">
                            <div className="lg:grid lg:grid-cols-12 gap-10 h-full">
                                {/* Interview Questions */}
                                <div className='lg:col-span-9 flex flex-col justify- h-full gap-4 bg-pink-'>
                                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                                        {/* title */}
                                        <div className="flex flex-col gap-6">
                                            <h1 className='text-2xl font-bold text-black'>.Net Backend Interview - Junior Level</h1>
                                            <div className="flex flex-col gap-4">
                                                {/* <p className='text-2xl font-semibold text-[#152A4C]'>Question {currentPage}/{paginationData?.total}</p> */}
                                                <p className='text-lg text-[#696F79] italic'>Object Oriented Programming</p>
                                            </div>
                                        </div>
                                        {/* timer */}
                                        <div className="flex justify-center items-center ">
                                            <CountdownCircleTimer
                                                isPlaying
                                                duration={1800} // 30 minutes
                                                colors="#4DA1A9"
                                                trailColor="#eee"
                                                strokeWidth={10}
                                                size={120}
                                            >
                                                {({ remainingTime }) => (
                                                    <div style={{ fontSize: "20px", color: "#333" }}>
                                                        {formatTime(remainingTime)}
                                                    </div>
                                                )}
                                            </CountdownCircleTimer>
                                        </div>
                                    </div>
                                    {/* Answers */}
                                    <div key={question.questionId} className="question flex flex-col place-items-center gap-6 mt-10 ">
                                        <label htmlFor={`answerText${currentPage}`}>
                                            <p className='font-semibold text-2xl md:text-left lg:text-center'><span className='pe-2'>{currentPage}.</span>{question.text}</p>
                                        </label>
                                        {question.type == "essay" ? (
                                            <Field as="textarea" name={`answerText`} id={`answerText${currentPage}`} className='w-full h-60 p-4 border-gray-300 rounded-lg outline-0 focus:border-[#4DA1A9] border-2'></Field>
                                        ) :
                                            question.type == "mcq" ? (
                                                <div className="grid md:grid-cols-1 gap-5 my-5 w-full">
                                                    {question?.questionOptions?.map((option) => (
                                                        <label htmlFor="selectedOptionIds" className='w-full' key={option.optionId}>
                                                            <Field type="checkbox" name="selectedOptionIds" id="selectedOptionIds" value={option.optionId} hidden />
                                                            <div
                                                                className={`py-4 px-10 text-left text-lg rounded-2xl border-2 cursor-pointer transition-all duration-500 ease-in-out w-full
                                                                        ${values.selectedOptionIds?.includes(option.optionId)
                                                                        ? 'border-white bg-[#4DA1A9] text-white shadow-[0px_2px_6px_rgba(19,18,66,0.07)]'
                                                                        : 'border-gray-300 bg-white'
                                                                    }`}
                                                                onClick={() => {
                                                                    const current = values.selectedOptionIds || [];
                                                                    if (current.includes(option.optionId)) {
                                                                        setFieldValue('selectedOptionIds', current.filter(id => id !== option.optionId));
                                                                    } else {
                                                                        setFieldValue('selectedOptionIds', [...current, option.optionId]);
                                                                    }
                                                                }}
                                                            >
                                                                {option.text}
                                                            </div>
                                                        </label>
                                                    ))}
                                                </div>
                                            ) : null}

                                    </div>
                                </div>

                                {/* pagination */}
                                <div className="lg:col-span-3 self-center gap-4 w-full h-full text-center mt-5 lg:mt-0">
                                    {paginationData && (
                                        <div className="flex flex-col justify-center bg-white shadow-[0px_2px_6px_rgba(19,18,66,0.07)] rounded-lg w-full h-full">
                                            <p className='py-4 font-medium border-b-3 border-[#F6F4F0] px-4'>Questions List</p>
                                            {/* <div className='flex lg:flex-col flex-wrap w-full gap-2 py-5 px-4'> */}
                                            <div className='grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-1 w-full gap-2 py-5 px-4'>
                                                {[...Array(paginationData?.total)].map((page, index) => (
                                                    <div key={index} className=' lg:w-full'>
                                                        <button type='submit' onClick={async () => {
                                                            await submitForm()
                                                            handlePagination(index + 1)
                                                            // submitAnswer()
                                                        }} className={`px-2 py-2.5 leading-tight w-full rounded-lg text-left border
                                                            ${currentPage == index + 1 ? 'border-[#4DA1A9] bg-[#4DA1A9] text-white' : ' border-gray-300 text-gray-300'} `}>Question {index + 1}</button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* submit button */}
                            <div className="flex justify-between items-center w-full">
                                {questions.length ?
                                    <button
                                        type="button"
                                        className="bg-gradient-to-r from-[var(--dark-blue)] to-[var(--teal-blue)] text-white px-16 py-4 rounded-2xl font-bold self-end transform transition duration-300 hover:scale-105 ease-in-out"
                                        onClick={async () => {
                                            await submitForm()
                                            submitInterview(interviewId)
                                            // handleSubmit(problemSolvingQuestions)
                                        }}
                                    >
                                        Submit & Continue
                                    </button>
                                    :
                                    null
                                }
                            </div>

                        </div >

                    )) : <Loader />}
                </Form>
            )
            }
        </Formik >



    )
}
