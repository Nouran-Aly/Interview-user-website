import axios from 'axios'
import { Field, Form, Formik, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Interview() {
    const [interviewId, setInterviewId] = useState()
    const [questions, setQuestions] = useState()
    const [answers, setAnswers] = useState()
    const [timer, setTimer] = useState("")

    async function getInterviewQuestions() {
        return await axios.post(`https://intervyouquestions.runasp.net/api/Interview/start/user/${"35e53751-0c1a-4ec9-b41c-ac66df3400c1"}`,
            {
                params: {
                    numberOfQuestions: 10,
                    timeLimitInMinutes: 30
                }
            }
        )
            .then((res) => {
                console.log(res.data);
                setInterviewId(res.data.interviewId)
                setTimer(res.data.timeLimitInMinutes)
            })
            .catch((error) => {
                console.log(error);

            })
    }

    async function showInterviewQuestions() {
        // return await axios.get(`https://intervyouquestions.runasp.net/api/InterviewQuestions/${interviewId}/questions`)
        return await axios.get(`https://intervyouquestions.runasp.net/api/InterviewQuestions/162/questions`)
            .then((res) => {
                console.log(res.data);
                setQuestions(res.data)
            }).catch((err) => {
                console.log(err.response);
            })
    }

    useEffect(() => {
        getInterviewQuestions()
    }, [])

    useEffect(() => {
        if (interviewId) {
            showInterviewQuestions()
            console.log(interviewId);
        }
    }, [interviewId])

    useEffect(() => {
        if (timer == 0) return;
        const handleTimer = setInterval(() => {
            setTimer((timer) => timer - 1)
            return () => clearInterval(handleTimer)
        }, 1000);
    }, [])



    // handle timer
    // const handleTimer = setInterval(() => {
    //     setTimer((time) => time - 1)
    //     return () => clearInterval(handleTimer)
    // }, timer);

    return (
        <div className="flex flex-col px-8 lg:px-32 py-10 gap-8 bg-[#F6F4F0] min-h-[calc(100vh-68px)]">
            <div className="flex justify-between">
                <h1 className='text-2xl font-bold text-black'>.Net Backend Interview - Junior Level</h1>
                <p className='font-bold text-4xl'>{timer}</p>
            </div>
            <div className="flex flex-col gap-4">
                <p className='text-2xl font-semibold text-[#152A4C]'>Question 1/35</p>
                <p className='text-lg text-[#696F79] italic'>Object Oriented Programming</p>
            </div>
            <Formik
                initialValues={{
                    userId: "",
                    interviewId: 0,
                    questionId: 0,
                    answerText: "",
                    selectedOptionIds: []
                }}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form >
                        {questions?.map((question, index) => (
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
                        ))}
                    </Form>
                )}
            </Formik>



        </div >
    )
}
