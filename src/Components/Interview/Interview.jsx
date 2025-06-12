import { Field, Form, Formik, useFormik } from 'formik'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useRef, useState } from 'react'
import { useBlocker, useNavigate } from 'react-router-dom'
import apiClient from '../Api/Axios'
import { toast, ToastContainer } from 'react-toastify'

export default function Interview() {
    const [interviewId, setInterviewId] = useState()
    const [questions, setQuestions] = useState([])
    const [problemSolvingQuestions, setProblemSolvingQuestions] = useState([])
    const [paginationData, setPaginationData] = useState([])
    const [block, setBlock] = useState(true)
    const [timer, setTimer] = useState("")
    const [timeLeft, setTimeLeft] = useState(30 * 60);
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const token = JSON.parse(localStorage.getItem('userToken'))
    const decToken = jwtDecode(token.accessToken)
    const userId = decToken.nameid
    // console.log(userId);
    const navigate = useNavigate()
    // console.log("block", block);
    const blockRef = useRef(true)


    async function getInterviewQuestions() {
        return await apiClient.post(`Interview/start/user/${userId}`,
            {
                params: {
                    numberOfQuestions: 10,
                    timeLimitInMinutes: 30
                }
            }
        )
            .then((res) => {
                console.log(res.data);
                console.log(res, "RESPONSE");
                setProblemSolvingQuestions(res?.data?.problemSolvingQuestions)
                setInterviewId(res.data.interviewId)
                setTimer(res.data.timeLimitInMinutes)
            })
            .catch((error) => {
                console.log(error);

            })
    }

    async function showInterviewQuestions(id, currentPage = 1) {
        return await apiClient.get(`InterviewQuestions/${id}/questions`, {
            params: {
                page: currentPage,
                pageSize: 1
            }
        })
            .then((res) => {
                console.log(res.data, "questions");
                setQuestions(res.data.items)
                setPaginationData(res.data.pagination)
            }).catch((err) => {
                console.log(err.response);
            })
    }

    // Submit answer
    async function submitAnswer(values) {
        return await apiClient.post(`InterviewQuestions/answer`, values)
            .then((res) => {
                console.log(res, "answer submitted");
            }).catch((err) => {
                console.log(err.response);
            })
    }

    // Submit Interview
    async function submitInterview(id) {
        return await apiClient.post(`InterviewQuestions/${id}/submit`)
            .then((res) => {
                console.log(res, "interview submitted");
                if (res.status === 200) {
                    toast.success("Interview Submitted Successfully")
                    setTimeout(() => {
                        navigate('/Report', { state: { data: res.data, problems: problemSolvingQuestions } })
                    }, 1000);
                }
            }).catch((err) => {
                console.log(err.response);
                toast.error(err.response.data.message)
            })
    }

    useEffect(() => {
        getInterviewQuestions()
    }, [])

    useEffect(() => {
        if (interviewId) {
            showInterviewQuestions(interviewId, currentPage)
            console.log(interviewId);
        }
    }, [interviewId])

    // prevent refresh
    const usePrompt = (whenRef, message) => {
        const blocker = useBlocker(() => whenRef.current); // block only when true
        const navigate = useNavigate();

        useEffect(() => {
            if (blocker.state === 'blocked') {
                const confirm = window.confirm(message);
                if (confirm) {
                    blocker.proceed(); // allow navigation
                } else {
                    blocker.reset(); // prevent navigation
                }
            }
        }, [blocker, message]);
    };
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
    useEffect(() => {
        blockRef.current = block
    }, [block])
    usePrompt(blockRef, 'Are you sure you want to leave the interview? Your progress may be lost.');

    // coutdown
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    submitInterview(interviewId); // Automatically submit when time is up
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

    const getTimerColor = () => {
        if (timeLeft <= 60) return 'text-red-500';
        if (timeLeft <= 5 * 60) return 'text-yellow-500';
        return 'text-black';
    };

    const handleSubmit = (problemSolvingQuestions) => {
        navigate("/ProblemSolving", state = { problemSolvingQuestions })
    }


    return (
        <Formik
            enableReinitialize
            initialValues={{
                userId: userId,
                interviewId: 554,
                questionId: 0,
                answerText: "",
                selectedOptionIds: []
            }}
            onSubmit={async (values) => {
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
                    {questions && questions?.length > 0 && (() => {
                        const question = questions[currentIndex];
                        return (
                            <>
                                <div className="flex flex-col px-8 lg:px-32 py-8 gap-8 bg-[#F6F4F0] min-h-[calc(100vh-70px)]">

                                    <div className="flex justify-between">
                                        <h1 className='text-2xl font-bold text-black'>.Net Backend Interview - Junior Level</h1>
                                        <p className={`font-bold text-4xl ${getTimerColor()}`}>{timeLeft > 0 ? formatTime(timeLeft) : "Time's up!"}</p>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <p className='text-2xl font-semibold text-[#152A4C]'>Question {currentIndex + 1}/{questions?.length}</p>
                                        <p className='text-lg text-[#696F79] italic'>Object Oriented Programming</p>
                                    </div>
                                    <div key={question.questionId} className="question flex flex-col place-items-center gap-8 mt-5">
                                        <label htmlFor={`answerText${currentIndex}`}>
                                            <p className='font-medium text-2xl text-center'><span className='pe-2'>{currentIndex + 1}.</span>{question.text}</p>
                                        </label>
                                        {question.type == "essay" ? (
                                            <Field as="textarea" name={`answerText`} id={`answerText${currentIndex}`} className='w-full h-60 p-4 border-gray-300 rounded-lg outline-0 focus:border-[#79D7BE] border-2'></Field>
                                        ) :
                                            question.type == "mcq" ? (
                                                <div className="grid md:grid-cols-2 gap-8 my-5">
                                                    {question?.questionOptions?.map((option) => (
                                                        <label htmlFor="selectedOptionIds" className=' gap-1 w-[90%] md:w-full' key={option.optionId}>
                                                            <Field type="checkbox" name="selectedOptionIds" id="selectedOptionIds" value={option.optionId} hidden />
                                                            <div
                                                                className={`py-[18px] px-10 text-center text-2xl rounded-4xl border-2 cursor-pointer transition-all duration-500 ease-in-out 
                                ${values.selectedOptionIds?.includes(option.optionId)
                                                                        ? 'border-white bg-[#79D7BE] text-white shadow-[0px_2px_6px_rgba(19,18,66,0.07)]'
                                                                        : 'border-[#152A4C] bg-white'
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
                                        <div className="flex justify-between items-center w-full">
                                            {currentIndex > 0 && (
                                                <button
                                                    type="button"
                                                    className="bg-[#152A4C] text-white px-16 py-4 rounded-4xl font-bold self-end transform transition duration-300 hover:scale-105 hover:opacity-90 ease-in-out"
                                                    onClick={() => {
                                                        setFieldValue('questionId', question.questionId);
                                                        if (currentIndex < questions.length + 1) {
                                                            setCurrentIndex(currentIndex - 1);
                                                        }
                                                    }}
                                                >
                                                    Previous

                                                </button>
                                            )}
                                            {currentIndex === questions.length - 1 ?
                                                <button
                                                    type="button"
                                                    className="bg-[#79D7BE] text-white px-16 py-4 rounded-4xl font-bold self-end transform transition duration-300 hover:scale-105 hover:opacity-90 ease-in-out"
                                                    onClick={() => {
                                                        submitInterview(interviewId)
                                                        // handleSubmit(problemSolvingQuestions)
                                                    }}
                                                >
                                                    Submit
                                                </button>
                                                :
                                                <button
                                                    type="button"
                                                    className="bg-[#152A4C] text-white px-16 py-4 rounded-4xl font-bold self-end transform transition duration-300 hover:scale-105 hover:opacity-90 ease-in-out"
                                                    onClick={async () => {
                                                        await setFieldValue('questionId', question.questionId);
                                                        await submitForm();
                                                        await resetForm();
                                                        if (currentIndex < questions.length - 1) {
                                                            setCurrentIndex(currentIndex + 1);
                                                        }
                                                    }}
                                                >
                                                    Next
                                                </button>}

                                        </div>
                                    </div>
                                    {/* pagination */}
                                    {paginationData && (
                                        <div className="flex justify-center">
                                            <ul className="inline-flex -space-x-px text-base h-10">
                                                <li>
                                                    <a href="#" className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">Previous</a>
                                                </li>
                                                {[...Array(paginationData?.total)].map((page, index) => (
                                                    <li>
                                                        <button onClick={() => {
                                                            setCurrentPage(currentPage + 1)
                                                            showInterviewQuestions(currentPage)
                                                        }} className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700
                                                            ${currentPage == index + 1 ? 'bg-gray-100 text-gray-700' : ''}
                                                            `}>{index + 1}</button>
                                                    </li>
                                                ))}
                                                <li>
                                                    <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">Next</a>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div >
                            </>
                        )
                    })()}



                </Form>
            )
            }
        </Formik >



    )
}
