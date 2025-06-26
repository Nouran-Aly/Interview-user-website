import React, { useState } from 'react'
import submit from '../../assets/submit.png'
import styles from './Interview.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Field, Formik, Form, useFormik } from 'formik'
import apiClient from '../Api/Axios'
import { toast, ToastContainer } from 'react-toastify'
import * as Yup from 'yup'

export default function Prefrences() {
    const [step, setStep] = useState(1)
    const navigate = useNavigate()

    async function selectPrefrences(values) {
        return await apiClient.put("Auth/update-preferences", values)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    toast.success("Prefrences Are Set Successfully")
                    setTimeout(() => {
                        navigate("/WelcomePage")
                    }, 2000);
                }
            })
            .catch((err) => {
                console.log(err.response.data);
                toast.error("Something Went Wrong")
            })
    }


    // next step
    const nextStep = async (validateForm, errors) => {
        const currentStepFields = {
            1: ["preferredRole"],
            2: ["experienceLevel"],
            3: ["dailyStudyHours"]
        };
        const formErrors = await validateForm();
        const stepFields = currentStepFields[step];
        const hasStepError = stepFields.some(field => formErrors[field]);
        if (!hasStepError) {
            setStep(step + 1);
        } else {
            toast.error("Please fill out the required fields before proceeding.");
        }
    };

    // prev step
    const prevStep = () => {
        if (step > 1) setStep(step - 1)
    }


    return (
        <div className='bg-[#152A4C] '>
            <ToastContainer position='bottom-right' autoClose={3000} />
            <div className="flex flex-col justify-center items-center min-h-[calc(100vh-68px)]">
                {/* stepper */}
                <Formik
                    initialValues={{
                        experienceLevel: "",
                        preferredRole: "",
                        dailyStudyHours: "",
                    }}
                    onSubmit={(values) => {
                        console.log(values);
                        selectPrefrences(values)
                    }}
                    validationSchema={
                        Yup.object({
                            experienceLevel: Yup.string().required("Please Choose Your Experience Level"),
                            preferredRole: Yup.string().required("Please Choose Your Preferred Role"),
                            dailyStudyHours: Yup.string().required("Please Choose Your Daily Study Hours"),
                        })
                    }
                    validateOnChange={true}
                    validateOnBlur={false}
                >
                    {({ values, setFieldValue, validateForm }) => (
                        <Form >
                            <div className="flex flex-col py-8">
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
                                                <div className="flex flex-col gap-6 mt-8 w-full min-w-[300px]">
                                                    {/* backend */}
                                                    <label htmlFor="Backend Development">
                                                        <Field
                                                            type="radio"
                                                            name="preferredRole"
                                                            value="0"
                                                            className="hidden"
                                                            id="Backend Development"
                                                        />
                                                        <div
                                                            onClick={() => setFieldValue('preferredRole', "0")}
                                                            className={`bg-white border-2 rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg font-medium cursor-pointer outline-0
                                                        ${values.preferredRole === "0"
                                                                    ? 'border-[#79D7BE] text-black'
                                                                    : 'border-[#EFF0F6] text-[rgba(0,0,0,0.5)]'
                                                                }`}
                                                        >
                                                            Backend Development
                                                        </div>
                                                    </label>
                                                    {/* frontend */}
                                                    <label htmlFor="Frontend Development">
                                                        <Field
                                                            type="radio"
                                                            name="preferredRole"
                                                            value="1"
                                                            className="hidden"
                                                            id="Frontend Development"
                                                        />
                                                        <div
                                                            onClick={() => setFieldValue('preferredRole', "1")}
                                                            className={`bg-white border-2 rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg font-medium cursor-pointer outline-0
                                                        ${values.preferredRole === "1"
                                                                    ? 'border-[#79D7BE] text-black'
                                                                    : 'border-[#EFF0F6] text-[rgba(0,0,0,0.5)]'
                                                                }`}
                                                        >
                                                            Frontend Development
                                                        </div>
                                                    </label>
                                                    {/* Mobile Application */}
                                                    <label htmlFor="Mobile Application Development">
                                                        <Field
                                                            type="radio"
                                                            name="preferredRole"
                                                            value="2"
                                                            className="hidden"
                                                            id="Mobile Application Development"
                                                        />
                                                        <div
                                                            onClick={() => setFieldValue('preferredRole', "2")}
                                                            className={`bg-white border-2 rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg font-medium cursor-pointer outline-0
                                                        ${values.preferredRole === "2"
                                                                    ? 'border-[#79D7BE] text-black'
                                                                    : 'border-[#EFF0F6] text-[rgba(0,0,0,0.5)]'
                                                                }`}
                                                        >
                                                            Mobile Application Development
                                                        </div>
                                                    </label>
                                                    {/* AI & Machine Learning */}
                                                    <label htmlFor="AI & Machine Learning">
                                                        <Field
                                                            type="radio"
                                                            name="preferredRole"
                                                            value="3"
                                                            className="hidden"
                                                            id="AI & Machine Learning"
                                                        />
                                                        <div
                                                            onClick={() => setFieldValue('preferredRole', "3")}
                                                            className={`bg-white border-2 rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg font-medium cursor-pointer outline-0
                                                        ${values.preferredRole === "3"
                                                                    ? 'border-[#79D7BE] text-black'
                                                                    : 'border-[#EFF0F6] text-[rgba(0,0,0,0.5)]'
                                                                }`}
                                                        >
                                                            AI & Machine Learning
                                                        </div>
                                                    </label>
                                                </div>
                                            </>
                                        ) : step == 2 ? (
                                            <>
                                                <div className="flex flex-col gap-6 mt-8 w-full min-w-[300px]">
                                                    <h1 className='text-center text-[#170F49] text-2xl font-bold'>What’s Your Level?                                    </h1>
                                                    <div className="flex flex-col gap-6 mt-8 w-full">
                                                        {/* Entry level */}
                                                        <label htmlFor="Entry">
                                                            <Field
                                                                type="radio"
                                                                name="experienceLevel"
                                                                value="0"
                                                                className="hidden"
                                                                id="Entry"
                                                            />
                                                            <div
                                                                onClick={() => setFieldValue('experienceLevel', "0")}
                                                                className={`bg-white border-2 rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg font-medium cursor-pointer outline-0
                                                        ${values.experienceLevel === "0"
                                                                        ? 'border-[#79D7BE] text-black'
                                                                        : 'border-[#EFF0F6] text-[rgba(0,0,0,0.5)]'
                                                                    }`}
                                                            >
                                                                Entry Level
                                                            </div>
                                                        </label>
                                                        {/* Junior level */}
                                                        <label htmlFor="Junior">
                                                            <Field
                                                                type="radio"
                                                                name="experienceLevel"
                                                                value="1"
                                                                className="hidden"
                                                                id="Junior"
                                                            />
                                                            <div
                                                                onClick={() => setFieldValue('experienceLevel', "1")}
                                                                className={`bg-white border-2 rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg font-medium cursor-pointer outline-0
                                                        ${values.experienceLevel === "1"
                                                                        ? 'border-[#79D7BE] text-black'
                                                                        : 'border-[#EFF0F6] text-[rgba(0,0,0,0.5)]'
                                                                    }`}
                                                            >
                                                                Junior Level
                                                            </div>
                                                        </label>
                                                        {/* Mid level */}
                                                        <label htmlFor="Mid">
                                                            <Field
                                                                type="radio"
                                                                name="experienceLevel"
                                                                value="2"
                                                                className="hidden"
                                                                id="Mid"
                                                            />
                                                            <div
                                                                onClick={() => setFieldValue('experienceLevel', "2")}
                                                                className={`bg-white border-2 rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg font-medium cursor-pointer outline-0
                                                        ${values.experienceLevel === "2"
                                                                        ? 'border-[#79D7BE] text-black'
                                                                        : 'border-[#EFF0F6] text-[rgba(0,0,0,0.5)]'
                                                                    }`}
                                                            >
                                                                Mid Level
                                                            </div>
                                                        </label>
                                                        {/* Senior level */}
                                                        <label htmlFor="Senior">
                                                            <Field
                                                                type="radio"
                                                                name="experienceLevel"
                                                                value="3"
                                                                className="hidden"
                                                                id="Senior"
                                                            />
                                                            <div
                                                                onClick={() => setFieldValue('experienceLevel', "3")}
                                                                className={`bg-white border-2 rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg font-medium cursor-pointer outline-0
                                                        ${values.experienceLevel === "3"
                                                                        ? 'border-[#79D7BE] text-black'
                                                                        : 'border-[#EFF0F6] text-[rgba(0,0,0,0.5)]'
                                                                    }`}
                                                            >
                                                                Senior Level
                                                            </div>
                                                        </label>
                                                        {/* Lead level */}
                                                        <label htmlFor="Lead">
                                                            <Field
                                                                type="radio"
                                                                name="experienceLevel"
                                                                value="4"
                                                                className="hidden"
                                                                id="Lead"
                                                            />
                                                            <div
                                                                onClick={() => setFieldValue('experienceLevel', "4")}
                                                                className={`bg-white border-2 rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg font-medium cursor-pointer outline-0
                                                        ${values.experienceLevel === "4"
                                                                        ? 'border-[#79D7BE] text-black'
                                                                        : 'border-[#EFF0F6] text-[rgba(0,0,0,0.5)]'
                                                                    }`}
                                                            >
                                                                Lead Level
                                                            </div>
                                                        </label>
                                                        {/* Principal level */}
                                                        <label htmlFor="Principal">
                                                            <Field
                                                                type="radio"
                                                                name="experienceLevel"
                                                                value="5"
                                                                className="hidden"
                                                                id="Principal"
                                                            />
                                                            <div
                                                                onClick={() => setFieldValue('experienceLevel', "5")}
                                                                className={`bg-white border-2 rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg font-medium cursor-pointer outline-0
                                                        ${values.experienceLevel === "5"
                                                                        ? 'border-[#79D7BE] text-black'
                                                                        : 'border-[#EFF0F6] text-[rgba(0,0,0,0.5)]'
                                                                    }`}
                                                            >
                                                                Principal Level
                                                            </div>
                                                        </label>
                                                        {/* Architect level */}
                                                        <label htmlFor="Architect">
                                                            <Field
                                                                type="radio"
                                                                name="experienceLevel"
                                                                value="6"
                                                                className="hidden"
                                                                id="Architect"
                                                            />
                                                            <div
                                                                onClick={() => setFieldValue('experienceLevel', "6")}
                                                                className={`bg-white border-2 rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg font-medium cursor-pointer outline-0
                                                        ${values.experienceLevel === "6"
                                                                        ? 'border-[#79D7BE] text-black'
                                                                        : 'border-[#EFF0F6] text-[rgba(0,0,0,0.5)]'
                                                                    }`}
                                                            >
                                                                Architect Level
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </>
                                        ) : step == 3 ? (
                                            <>
                                                <div className="flex flex-col gap-6 mt-8 w-full min-w-[300px]">
                                                    <h1 className='text-center text-[#170F49] text-2xl font-bold'>How much time can you dedicate to learning daily?</h1>
                                                    {["1-2 hours", "3-4 hours", "5-8 hours", "8+ hours"].map((option) => (
                                                        <label htmlFor={option} key={option}>
                                                            <Field
                                                                type="radio"
                                                                name="dailyStudyHours"
                                                                value={option}
                                                                className="hidden"
                                                                id={option}
                                                            />
                                                            <div onClick={() => setFieldValue("dailyStudyHours", option)}
                                                                className={`bg-white border-2 rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg font-medium cursor-pointer outline-0
                                                            ${values.dailyStudyHours === option ? 'border-[#79D7BE] text-black' : 'border-[#EFF0F6] text-[rgba(0,0,0,0.5)]'}
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
                                            <div className='flex flex-col justify-center items-center gap-6 min-w-[300px]'>
                                                <h1 className='text-center text-[#170F49] text-2xl font-bold'>Submit your preferences  </h1>
                                                <img src={submit} className='w-[150px]' />
                                                <p className='text-center'>Please review all the information you previously chose in the past steps, and if all is okay, submit your preferences</p>
                                                {/* <Link to="/WelcomePage"> */}
                                                <button type='submit' className='bg-[#79D7BE] text-white px-10 py-3 rounded-[56px] shadow-[0px_3px_12px_rgba(19,18,66,0.07)]'
                                                    onClick={() => console.log("Submit clicked")}
                                                >Submit</button>
                                                {/* </Link> */}
                                            </div>
                                        </>) : null}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center w-full mt-8 ">
                                    <button type='button' className={`border border-[#79D7BE] text-[#79D7BE] px-10 py-3 rounded-[56px] mx-2 ${step == 1 ? "hidden" : "block "}`} onClick={prevStep}>previous</button>
                                    <button type='button' className={`bg-[#79D7BE] text-white px-10 py-3 rounded-[56px] mx-2 self-end ${step == 4 ? "hidden" : "ml-auto"} `} onClick={() => nextStep(validateForm)}>Next step</button>
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