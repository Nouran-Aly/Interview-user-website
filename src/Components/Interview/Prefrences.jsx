import React, { useState } from 'react'
import submit from '../../assets/submit.png'
import styles from './Interview.module.css'
import { Link } from 'react-router-dom'

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
                <div className="flex flex-col mx-10 py-8">
                    <div className="px-10 rounded-4xl h-full sm:h-auto w-200px sm:w-[600px] md:w-[700px] bg-white lg:w-[700px]">
                        <div className="flex justify-between pt-10 pb-8 border-b border-[#D9DBE9] relative">
                            {[1, 2, 3, 4].map((num, index) => (
                                <div className={`w-full h-2 grid text-xl ${styles.stepper} ${step >= num ? "bg-[#79D7BE] text-white" : "bg-[#EFF0F6] text-[#6F6C90]"}`} >
                                </div>
                            ))}
                        </div>
                        <div className='flex flex-col justify-center items-center pt-8 pb-10'>
                            {step == 1 && (
                                <>
                                    <h1 className='text-center text-[#170F49] text-2xl font-bold'>What field do you want to practice for? </h1>
                                    <div className="flex flex-col gap-6 mt-8 w-full">
                                        <input className="bg-white border-2 border-[#EFF0F6] rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg text-[rgb(0,0,0,0.5)] font-medium cursor-pointer focus:border-[#79D7BE] outline-0 focus:text-black" placeholder='Frontend Development' readOnly />
                                        <input className="bg-white border-2 border-[#EFF0F6] rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg text-[rgb(0,0,0,0.5)] font-medium cursor-pointer focus:border-[#79D7BE] outline-0 focus:text-black" placeholder='Backend Development' readOnly />
                                        <input className="bg-white border-2 border-[#EFF0F6] rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg text-[rgb(0,0,0,0.5)] font-medium cursor-pointer focus:border-[#79D7BE] outline-0 focus:text-black" placeholder='Mobile Application Development' readOnly />
                                        <input className="bg-white border-2 border-[#EFF0F6] rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg text-[rgb(0,0,0,0.5)] font-medium cursor-pointer focus:border-[#79D7BE] outline-0 focus:text-black" placeholder='AI & Machine Learning' readOnly />
                                    </div>
                                </>
                            )}
                            {step == 2 && (
                                <>
                                    <h1 className='text-center text-[#170F49] text-2xl font-bold'>What’s Your Level?                                    </h1>
                                    <div className="flex flex-col gap-6 mt-8 w-full">
                                        <input className="bg-white border-2 border-[#EFF0F6] rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg text-[rgb(0,0,0,0.5)] font-medium cursor-pointer focus:border-[#79D7BE] outline-0 focus:text-black" placeholder='Fresh Graduate' readOnly />
                                        <input className="bg-white border-2 border-[#EFF0F6] rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg text-[rgb(0,0,0,0.5)] font-medium cursor-pointer focus:border-[#79D7BE] outline-0 focus:text-black" placeholder='Junior' readOnly />
                                        <input className="bg-white border-2 border-[#EFF0F6] rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg text-[rgb(0,0,0,0.5)] font-medium cursor-pointer focus:border-[#79D7BE] outline-0 focus:text-black" placeholder='Mid-Level' readOnly />
                                        <input className="bg-white border-2 border-[#EFF0F6] rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg text-[rgb(0,0,0,0.5)] font-medium cursor-pointer focus:border-[#79D7BE] outline-0 focus:text-black" placeholder='Senior' readOnly />
                                    </div>
                                </>
                            )}
                            {step == 3 && (
                                <>
                                    <h1 className='text-center text-[#170F49] text-2xl font-bold'>How many hours do you plan to study each day?</h1>
                                    <div className="flex flex-col gap-6 mt-8 w-full">
                                        <input className="bg-white border-2 border-[#EFF0F6] rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg text-[rgb(0,0,0,0.5)] font-medium cursor-pointer focus:border-[#79D7BE] outline-0 focus:text-black" placeholder='1-2 hours' readOnly />
                                        <input className="bg-white border-2 border-[#EFF0F6] rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg text-[rgb(0,0,0,0.5)] font-medium cursor-pointer focus:border-[#79D7BE] outline-0 focus:text-black" placeholder='3-4 hours' readOnly />
                                        <input className="bg-white border-2 border-[#EFF0F6] rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg text-[rgb(0,0,0,0.5)] font-medium cursor-pointer focus:border-[#79D7BE] outline-0 focus:text-black" placeholder='5-8 hours' readOnly />
                                        <input className="bg-white border-2 border-[#EFF0F6] rounded-4xl shadow-[0px_2px_6px_rgba(19,18,66,0.07)] px-8 py-4 text-lg text-[rgb(0,0,0,0.5)] font-medium cursor-pointer focus:border-[#79D7BE] outline-0 focus:text-black" placeholder='8+ hours' readOnly />
                                    </div>
                                </>
                            )}
                            {step == 4 && (
                                <>
                                    <div className='flex flex-col justify-center items-center gap-6'>
                                        <h1 className='text-center text-[#170F49] text-2xl font-bold'>Submit your preferences  </h1>
                                        <img src={submit} className='w-[150px]' />
                                        <p className='text-center'>Please review all the information you previously chose in the past steps, and if all is okay, submit your preferences</p>
                                        <Link to="/WelcomePage">
                                            <button className='bg-[#79D7BE] text-white px-10 py-3 rounded-[56px] shadow-[0px_3px_12px_rgba(19,18,66,0.07)]'>Submit</button>
                                        </Link>
                                    </div>
                                </>
                            )}

                        </div>
                    </div>
                    <div className="flex justify-between items-center w-full mt-8 ">
                        <button className={`border border-[#79D7BE] text-[#79D7BE] px-10 py-3 rounded-[56px] ${step == 1 ? "hidden" : "block "}`} onClick={prevStep}>previous</button>
                        <button className={`bg-[#79D7BE] text-white px-10 py-3 rounded-[56px]  self-end ${step == 4 ? "hidden" : "ml-auto"} `} onClick={nextStep}>Next step</button>
                    </div>
                </div>



            </div>
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