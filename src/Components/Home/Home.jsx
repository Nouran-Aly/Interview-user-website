import React, { useEffect, useState } from 'react'
import img from '../../assets/Illusttration.png'
import left from '../../assets/left.png'
import right from '../../assets/right.png'
import styles from './Home.module.css'
import { Link, useNavigate } from 'react-router-dom'
import mobile from '../../assets/mobile.png'
import mobile2 from '../../assets/mobile2.png'
import mobile3 from '../../assets/mobile3.png'
import apiClient from '../Api/Axios'

export default function Home() {
    const [prefrences, setPrefrences] = useState([])
    const navigate = useNavigate()

    const getPrefrences = async () => {
        try {
            const response = await apiClient.get("Auth/preferences")
            console.log(response);
            setPrefrences(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handlePrefences = () => {
        if (prefrences) {
            navigate("/WelcomePage")
        } else {
            navigate("/prefrences")
        }
    }

    useEffect(() => {
        getPrefrences()

    }, [])

    return (
        // <div className='xl:px-36 p-8'>
        <div className=''>
            {/* header */}
            <div className="flex flex-col-reverse lg:flex-row justify-between items-center flex-wrap xl:px-36 px-8">
                <div className="left-side flex flex-col gap-4 w-full lg:w-1/2 ">
                    <h1 className="font-extrabold text-5xl lg:text-6xl text-[#333333]    lg:w-[420px] leading-[1.3]">
                        Warm Up Before Your
                        <span className="relative inline-block md:px-2 py-1 hover:-rotate-2    ">
                            <span className="absolute inset-0 bg-[#2E5077] -rotate-[50px] "></span>
                            <span className="relative text-white">Next Interview</span>
                        </span>
                    </h1>
                    <div className="flex items-center gap-3 my-10">
                        <div className="line h-full w-0.5 py-5 bg-[#2E5077] rounded-2xl"></div>
                        <p className='font-medium text-[#828282] text-xl'>We help you prepare for interviews </p>
                    </div>
                    <div className="flex items-center gap-8 ">
                        <button onClick={handlePrefences} className={`bg-gradient-to-r from-[var(--dark-blue)] to-[var(--teal-blue)] py-4 px-4 lg:px-8 rounded-[10px] text-white text-lg font-medium hover:opacity-80 duration-300`}>Start Interview</button>
                        <div onClick={() => {
                            document.getElementById("features")?.scrollIntoView({ behavior: 'smooth' })
                        }} className="flex items-center gap-2 cursor-pointer">
                            <svg className="w-6 h-6 text-[#2E5077] " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z" clipRule="evenodd" />
                            </svg>
                            <p className='text-[#2E5077] font-bold text-lg'>Know More</p>
                        </div>
                    </div>
                </div>
                <div className="right-side w-full lg:w-1/2 flex justify-center items-center">
                    <img src={img} />
                </div>
            </div>
            {/* features */}
            <div id="features" className="pt-16 lg:py-40 relative">
                {/* <div className="py-30 lg:py-40"> */}
                <img src={left} className='w-[250px] absolute top-0 hidden lg:block' />
                <div className="xl:px-36 p-8">
                    <div className="flex justify-center ">
                        <div className="text-3xl lg:text-4xl font-bold text-[#152A4C] lg:w-[500px] text-center line-height-lg ">
                            <h2>IntervYou comes with new <span className='text-[var(--teal-blue)]'>features</span>  like:</h2>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 py-4 lg:my-8">
                        <div className="flex flex-col items-center gap-6 py-10 px-2 rounded-xl duration-300 hover:bg-[#F6F4F0]">
                            <div className="icon grid h-15 w-15 bg-[#FFE7F2] rounded-full">
                                <svg className="w-6 h-6 text-[#FF75B7] m-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                            <p className='text-[#252B42] font-bold text-xl text-center'>Personalized Interview Preparation</p>
                            <p className='text-[#737373] text-center text-lg'>Tailored mock interviews and resources based on the user’s selected job role or skill level</p>
                        </div>
                        <div className="flex flex-col items-center gap-6 py-10 px-2 rounded-xl duration-300 hover:bg-[#F6F4F0]">
                            <div className="icon grid h-15 w-15 bg-[#E5F0FF] rounded-full">
                                <svg className="w-6 h-6 text-[#5E9DFF] m-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
                                </svg>
                            </div>
                            <p className='text-[#252B42] font-bold text-xl text-center'>Knowledge Gap Identification</p>
                            <p className='text-[#737373] text-center text-lg'>Assesses users’ knowledge, weaknesses, and provides actionable feedback</p>
                        </div>
                        <div className="flex flex-col items-center gap-6 py-10 px-2 rounded-xl duration-300 hover:bg-[#F6F4F0]">
                            <div className="icon grid h-15 w-15 bg-[#E2FFF2] rounded-full">
                                <svg className="w-6 h-6 text-[#2DFF9C] m-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m10.051 8.102-3.778.322-1.994 1.994a.94.94 0 0 0 .533 1.6l2.698.316m8.39 1.617-.322 3.78-1.994 1.994a.94.94 0 0 1-1.595-.533l-.4-2.652m8.166-11.174a1.366 1.366 0 0 0-1.12-1.12c-1.616-.279-4.906-.623-6.38.853-1.671 1.672-5.211 8.015-6.31 10.023a.932.932 0 0 0 .162 1.111l.828.835.833.832a.932.932 0 0 0 1.111.163c2.008-1.102 8.35-4.642 10.021-6.312 1.475-1.478 1.133-4.77.855-6.385Zm-2.961 3.722a1.88 1.88 0 1 1-3.76 0 1.88 1.88 0 0 1 3.76 0Z" />
                                </svg>
                            </div>
                            <p className='text-[#252B42] font-bold text-xl text-center'>Comprehensive Guidance and Resources</p>
                            <p className='text-[#737373] text-center text-lg'>Structured learning paths tailored to specific roles</p>
                        </div>
                    </div>
                </div>
                <img src={right} className='w-[200px] absolute right-0 bottom-0 hidden lg:block' />

            </div>

            {/* journey */}
            <div className="xl:px-36 p-8">
                {/* <div className="text-4xl lg:text-5xl font-medium text-[#333333] lg:w-[600px] mb-8 line-height-lg "> */}
                <div className="text-3xl md:text-4xl font-bold text-[#152A4C] mb-8">
                    <h2>Let’ checkout your <span className='text-[var(--teal-blue)]' >Hiring </span>  journey:</h2>
                </div>
                <div className="py-10 flex flex-col gap-16">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-28">
                        <div className="flex flex-col gap-3">
                            <p className='text-5xl'>1 <span className='text-[var(--teal-blue)]'>.</span></p>
                            <p className='font-bold text-xl text-[#252B42]'>Mock Interviews</p>
                            <p className='text-[#828282] font-bold'>Simulated interviews designed to replicate real-world job interview pressure and questions. Users receive AI-generated questions tailored to their role and detailed feedback to improve performance.</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className='text-5xl'>2 <span className='text-[var(--teal-blue)]'>.</span></p>
                            <p className='font-bold text-xl text-[#252B42]'>AI-Powered CV Generation </p>
                            <p className='text-[#828282] font-bold'>A smart CV builder that creates professional, ATS-compliant resumes. Users can easily customize their information and download polished, recruiter-friendly documents.</p>
                        </div>
                        <div className="lg:flex flex-col justify-between gap-3 hidden">
                            <div className={`${styles.journeyIcon} grid`}>
                                <svg className="w-8 h-8 m-auto text-2xl text-[#2E5077]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.03v13m0-13c-2.819-.831-4.715-1.076-8.029-1.023A.99.99 0 0 0 3 6v11c0 .563.466 1.014 1.03 1.007 3.122-.043 5.018.212 7.97 1.023m0-13c2.819-.831 4.715-1.076 8.029-1.023A.99.99 0 0 1 21 6v11c0 .563-.466 1.014-1.03 1.007-3.122-.043-5.018.212-7.97 1.023" />
                                </svg>
                            </div>
                            <div className={`${styles.journeyIcon} grid self-end`}>
                                <svg className="w-8 h-8 m-auto text-2xl text-[#2E5077]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-28">
                        <div className="flex flex-col gap-3">
                            <p className='text-5xl'>3 <span className='text-[var(--teal-blue)]'>.</span></p>
                            <p className='font-bold text-xl text-[#252B42]'>Progress Tracking </p>
                            <p className='text-[#828282] font-bold'>A performance dashboard that tracks user improvement over time. Users can review previous mock interviews, analyze strengths and weaknesses, and monitor their readiness level.</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className='text-5xl'>4 <span className='text-[var(--teal-blue)]'>.</span></p>
                            <p className='font-bold text-xl text-[#252B42]'>Personalized Study Recommendations </p>
                            <p className='text-[#828282] font-bold'>The system provides targeted learning suggestions based on individual weaknesses. Users receive daily guidance to strengthen their interview skills.</p>
                        </div>
                        <div className="lg:flex flex-col justify-between gap-3 hidden">
                            <div className={`${styles.journeyIcon} grid`}>
                                <svg className="w-12 h-12 m-auto text-2xl text-[#2E5077]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16 17-4-4-4 4m8-6-4-4-4 4" />
                                </svg>
                            </div>
                            <div className={`${styles.journeyIcon} grid self-end`}>
                                <svg className="w-8 h-8 m-auto text-2xl text-[#2E5077]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7h1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h11.5M7 14h6m-6 3h6m0-10h.5m-.5 3h.5M7 7h3v3H7V7Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-28">
                        <div className="flex flex-col gap-3">
                            <p className='text-5xl'>5 <span className='text-[var(--teal-blue)]'>.</span></p>
                            <p className='font-bold text-xl text-[#252B42]'>Problem Solving Zone </p>
                            <p className='text-[#828282] font-bold'>An interactive space offering technical problem-solving challenges. Users can practice coding, logic, and analytical questions relevant to their field.</p>
                        </div>
                        <div className="flex flex-col gap-3">
                        </div>
                        <div className="lg:flex flex-col justify-between gap-3 hidden">
                            <div className={`${styles.journeyIcon} grid`}>
                                <svg className="w-8 h-8 m-auto text-2xl text-[#2E5077]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8v8a5 5 0 1 0 10 0V6.5a3.5 3.5 0 1 0-7 0V15a2 2 0 0 0 4 0V8" />
                                </svg>
                            </div>
                            <div className={`${styles.journeyIcon} grid self-end`}>
                                <svg className="w-8 h-8 m-auto text-2xl text-[#2E5077]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.193-.538 1.193H5.538c-.538 0-.538-.6-.538-1.193 0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365Zm-8.134 5.368a8.458 8.458 0 0 1 2.252-5.714m14.016 5.714a8.458 8.458 0 0 0-2.252-5.714M8.54 17.901a3.48 3.48 0 0 0 6.92 0H8.54Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* app */}
            <div className="xl:px-36 p-8 pb-32">
                <div className="flex flex-col gap-12">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#152A4C]">
                                Unlock More with the IntervYou Mobile App
                            </h2>

                            <p className="text-lg text-[#263238] max-w-3xl self-center">
                                Take your learning beyond simulations. The IntervYou mobile app provides daily tools, tasks, and community features to support your growth anytime, anywhere.
                            </p>

                            <div className="">
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.nub.intervyou&pcampaignid=web_share"
                                    className="bg-[var(--dark-blue)] text-white px-12 py-4 rounded-3xl font-bold hover:opacity-85 hover:scale-105 transition-all shadow-md"
                                >
                                    Download the App
                                </a>
                            </div>
                        </div>
                        <img src={mobile} alt="" className='w-1/4' />

                    </div>


                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="flex flex-col gap-4 bg-[#F6F4F0] p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                            <h3 className="text-xl font-semibold text-[#152A4C]">Personalized Roadmap</h3>
                            <p className="text-[#263238] text-base">
                                Study roadmap based on your interview performance with daily quizzes to keep you improving every step of the way.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 bg-[#F6F4F0] p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                            <h3 className="text-xl font-semibold text-[#152A4C]">Community Blog</h3>
                            <p className="text-[#263238] text-base">
                                Connect, share content, and engage with others from similar technical backgrounds — all in one place.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 bg-[#F6F4F0] p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                            <h3 className="text-xl font-semibold text-[#152A4C]">TimeWise Tasks</h3>
                            <p className="text-[#263238] text-base">
                                Stay consistent with daily tasks tailored to your schedule and preferences — without the overwhelm.
                            </p>
                        </div>

                    </div>



                </div>




            </div >
        </div >

    )
}
