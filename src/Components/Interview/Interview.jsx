import { Field, Form, Formik, useFormik } from 'formik'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useRef, useState } from 'react'
import { useBlocker, useNavigate } from 'react-router-dom'
import apiClient from '../Api/Axios'

export default function Interview() {
    const [interviewId, setInterviewId] = useState()
    const [questions, setQuestions] = useState([])
    const [block, setBlock] = useState(true)
    const [timer, setTimer] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)
    const token = JSON.parse(localStorage.getItem('userToken'))
    const decToken = jwtDecode(token.accessToken)
    const userId = decToken.nameid
    console.log(userId);
    const navigate = useNavigate()
    console.log("block", block);
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
                setInterviewId(res.data.interviewId)
                setTimer(res.data.timeLimitInMinutes)
            })
            .catch((error) => {
                console.log(error);

            })
    }

    async function showInterviewQuestions(id) {
        return await apiClient.get(`InterviewQuestions/${id}/questions`)
            .then((res) => {
                console.log(res.data, "questions");
                setQuestions(res.data)
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
                    navigate('/Report', { state: { data: res.data } })
                }
            }).catch((err) => {
                console.log(err.response);
            })
    }

    useEffect(() => {
        getInterviewQuestions()
    }, [])

    useEffect(() => {
        if (interviewId) {
            showInterviewQuestions(interviewId)
            console.log(interviewId);
        }
    }, [interviewId])

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

    return (
        <Formik
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
                    {questions && questions?.length > 0 && (() => {
                        const question = questions[currentIndex];
                        return (
                            <>
                                <div className="flex flex-col px-8 lg:px-32 py-8 gap-8 bg-[#F6F4F0] min-h-[calc(100vh-70px)]">

                                    <div className="flex justify-between">
                                        <h1 className='text-2xl font-bold text-black'>.Net Backend Interview - Junior Level</h1>
                                        <p className='font-bold text-4xl'>{timer}</p>
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
                                </div >

                            </>

                        )
                    })()}

                    {/* {questions?.map((question, index) => (
                            <div key={question.questionId} className="question flex flex-col place-items-center gap-8 mt-5">
                                <p className='font-medium text-2xl text-center'><span className='pe-2'>{index + 1}.</span>{question.text}</p>
                                {question.type == "essay" ? (
                                    <Field as="textarea" name="answerText" id="" className='w-full h-60 p-4 border-gray-300 rounded-lg outline-0 focus:border-[#79D7BE] border-2'></Field>
                                ) :
                                    question.type == "mcq" ? (
                                        question?.questionOptions?.map((option) => (
                                            <label htmlFor="selectedOptionIds" className='mt- flex flex-col gap-1 w-[90%] md:w-1/2' key={option.optionId}>
                                                <Field type="checkbox" name="selectedOptionIds" id="selectedOptionIds" value={option.optionId} hidden />
                                                <div className={`py-[18px] text-center text-2xl rounded-4xl border-2 cursor-pointer transition-all duration-500 ease-in-out 
                                                 ${values.selectedOptionIds?.includes(option.optionId)
                                                        ? 'border-white bg-[#79D7BE] text-white shadow-[0px_2px_6px_rgba(19,18,66,0.07)]'
                                                        : 'border-[#152A4C] bg-white'
                                                    }`}

                                                    onClick={() => {
                                                        const current = values.selectedOptionIds || []
                                                        if (current.includes(option.optionId)) {
                                                            setFieldValue('selectedOptionIds',
                                                                current.filter(id => id !== option.optionId)
                                                            )
                                                        } else {
                                                            setFieldValue('selectedOptionIds', [...current, option.optionId])
                                                        }
                                                    }}
                                                >
                                                    {option.text}
                                                </div>
                                            </label>
                                        ))
                                    ) : null}
                                <button type='submit' className=' bg-[#152A4C] text-white px-16 py-4 rounded-4xl font-bold self-end transform transition duration-300 hover:scale-105 hover:opacity-90 ease-in-out'
                                    onClick={() => setFieldValue('questionId', question.questionId)}
                                >Next</button>
                            </div>
                        ))} */}
                </Form>
            )}
        </Formik>



    )
}
