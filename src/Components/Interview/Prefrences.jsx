import React, { useState } from 'react'
import submit from '../../assets/submit.png'
import styles from './Interview.module.css'
import { Link } from 'react-router-dom'
import { Field, Formik, Form, useFormik } from 'formik'

export default function Prefrences() {

    const [step, setStep] = useState(1)

    // next step
    const nextStep = () => {
        if (step < 4) setStep(step + 1)
    }

    // prev step
    const prevStep = () => {
        if (step > 1) setStep(step - 1)
    }


    return (
        <div className='bg-[#152A4C] '>
            <div className="flex flex-col justify-center items-center min-h-[calc(100vh-68px)]">
                {/* stepper */}
                <Formik
                    initialValues={{
                        experienceLevel: 0,
                        role: "",
                        timeLimitInMinutes: 120,
                        numberOfQuestions: 10,
                        userId: ""
                    }}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {({ values, setFieldValue }) => (
                        <Form >
                            <div className="flex flex-col mx-10 py-8">
                                <div className="px-10 rounded-4xl h-full sm:h-auto w-200px sm:w-[600px] md:w-[700px] bg-white lg:w-[700px]">
                                    <div className="flex justify-between pt-10 pb-8 border-b border-[#D9DBE9] relative">
                                        {[1, 2, 3, 4].map((num, index) => (
                                            <div key={index} className={`w-full h-2 grid text-xl ${styles.stepper} ${step >= num ? "bg-[#79D7BE] text-white" : "bg-[#EFF0F6] text-[#6F6C90]"}`} >
                                            </div>
                                        ))}
                                    </div>

                                    <div className='flex flex-col justify-center items-center pt-8 pb-10'>
                                        {step == 1 ? (
                                            <>
                                                <h1 className='text-center text-[#170F49] text-2xl font-bold'>
                                                    What field do you want to practice for?
                                                </h1>

                                                <div className="flex flex-col gap-6 mt-8 w-full">
                                                    {[
                                                        "Frontend Development",
                                                        "Backend Development",
                                                        "Mobile Application Development",
                                                        "AI & Machine Learning"
                                                    ].map((option) => (
                                                        <label key={option} htmlFor={option}>
                                                            <Field
                                                                type="radio"
                                                                name="role"
                                                                value={option}
                                                                className="hidden"
                                                                id={option}
                                                            />
                                                            <div
                                                                onClick={() => setFieldValue('role', option)}
                                                                className={`bg-white border-2 rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg font-medium cursor-pointer outline-0
                                                        ${values.role === option
                                                                        ? 'border-[#79D7BE] text-black'
                                                                        : 'border-[#EFF0F6] text-[rgba(0,0,0,0.5)]'
                                                                    }`}
                                                            >
                                                                {option}
                                                            </div>
                                                        </label>
                                                    ))}
                                                </div>

                                            </>
                                        ) : step == 2 ? (
                                            <>
                                                <div className="flex flex-col gap-6 mt-8 w-full">
                                                    <h1 className='text-center text-[#170F49] text-2xl font-bold'>What’s Your Level?                                    </h1>
                                                    {["Fresh Graduate", "Junior", "Mid-Level", "Senior"].map((option) => (
                                                        <label htmlFor={option} key={option}>
                                                            <Field
                                                                type="radio"
                                                                name="experienceLevel"
                                                                value={option}
                                                                className="hidden"
                                                                id={option}
                                                            />
                                                            <div onClick={() => setFieldValue("experienceLevel", option)}
                                                                className={`bg-white border-2 rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg font-medium cursor-pointer outline-0
                                                            ${values.experienceLevel === option ? 'border-[#79D7BE] text-black' : 'border-[#EFF0F6] text-[rgba(0,0,0,0.5)]'}
                                                            `}
                                                            >
                                                                {option}
                                                            </div>
                                                        </label>
                                                    ))
                                                    }
                                                </div>
                                            </>
                                        ) : step == 3 ? (
                                            <>
                                                <div className="flex flex-col gap-6 mt-8 w-full">
                                                    <h1 className='text-center text-[#170F49] text-2xl font-bold'>What’s Your Level?                                    </h1>
                                                    {["1-2 hours", "3-4 hours", "5-8 hours", "8+ hours"].map((option) => (
                                                        <label htmlFor={option} key={option}>
                                                            <Field
                                                                type="radio"
                                                                name="experienceLevel"
                                                                value={option}
                                                                className="hidden"
                                                                id={option}
                                                            />
                                                            <div onClick={() => setFieldValue("experienceLevel", option)}
                                                                className={`bg-white border-2 rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg font-medium cursor-pointer outline-0
                                                            ${values.experienceLevel === option ? 'border-[#79D7BE] text-black' : 'border-[#EFF0F6] text-[rgba(0,0,0,0.5)]'}
                                                            `}
                                                            >
                                                                {option}
                                                            </div>
                                                        </label>
                                                    ))
                                                    }
                                                </div>

                                            </>
                                        ) : step == 4 ? (<>
                                            <div className='flex flex-col justify-center items-center gap-6'>
                                                <h1 className='text-center text-[#170F49] text-2xl font-bold'>Submit your preferences  </h1>
                                                <img src={submit} className='w-[150px]' />
                                                <p className='text-center'>Please review all the information you previously chose in the past steps, and if all is okay, submit your preferences</p>
                                                <Link to="/WelcomePage">
                                                    <button type='submit' className='bg-[#79D7BE] text-white px-10 py-3 rounded-[56px] shadow-[0px_3px_12px_rgba(19,18,66,0.07)]'
                                                        onClick={() => console.log("Submit clicked")}
                                                    >Submit</button>
                                                </Link>
                                            </div>
                                        </>) : null}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center w-full mt-8 ">
                                    <button type='button' className={`border border-[#79D7BE] text-[#79D7BE] px-10 py-3 rounded-[56px] ${step == 1 ? "hidden" : "block "}`} onClick={prevStep}>previous</button>
                                    <button type='button' className={`bg-[#79D7BE] text-white px-10 py-3 rounded-[56px]  self-end ${step == 4 ? "hidden" : "ml-auto"} `} onClick={nextStep}>Next step</button>
                                </div>
                            </div>
                        </Form>
                    )
                    }
                </Formik >

            </div >
        </div >

    )
}
// {/* <div className="border-b-2 border-[#D9DBE9] pb-8 "> */ }
// <div className={`flex justify-between items-center text-white w-full`}>
//     <div className={`w-9 h-9 grid rounded-full text-xl ${step === num ? "bg-[#79D7BE]" : "bg-[#EFF0F6] text-[#6F6C90]"}`} >
//         <span className='m-auto'>{num}</span>
//     </div>
//     {/* {index < 3 && <div className="w- h-2 rounded-4xl bg-black mx-2"></div>} */}
//     {/* </div> */}
// </div>