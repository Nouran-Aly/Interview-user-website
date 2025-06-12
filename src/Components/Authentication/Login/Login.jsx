import React, { useState } from 'react'
import styles from '../Authentication.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import apiClient from '../../Api/Axios'

export default function Login() {
    const [isVisibile, setIsVisibile] = useState(false)
    const [userMessage, setuserMessage] = useState("")
    const [userError, setuserError] = useState("")
    const [isLoading, setisLoading] = useState(false)
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            console.log(values);
            login(values)
        }
    })

    async function login(values) {
        setisLoading(true)
        return apiClient.post("Auth/login", values)
            .then((res) => {
                setisLoading(false)
                console.log(res);
                console.log(res.data);
                if (res.status == 200) {
                    navigate('/home')
                    localStorage.setItem('userToken', JSON.stringify(res.data))
                }
            })
            .catch((err) => {
                setisLoading(false)
                console.log(err);
                console.log(err.response);
                setuserError(err.response.data)
            })
    }


    const togglePasswordVisiability = (state) => {
        setIsVisibile(!state)
    }


    return (
        <div className='bg-[#152a4c] min-h-screen w-full flex justify-content-center items-center'>
            <div className="flex w-full mx-0 my-10 md:mx-16">
                <div className='w-full md:w-1/2 px-8 py-15 md:p-13 bg-amber-10 bg-white rounded-s-4xl rounded-e-4xl md:rounded-e-none  '>
                    <p className='text-3xl font-bold pb-7'>Welcome Back</p>
                    <p className='text-xl text-[#A4ADAF]'>Please Sign In With Your Account</p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col w-full gap-8 mt-7">
                            {/* email */}
                            <div className='flex flex-col w-full gap-4'>
                                <label htmlFor="email" className='text-xl'>Email</label>
                                <div className="relative">
                                    <i className="fa-regular fa-paper-plane absolute top-1/2 transform -translate-y-1/2 text-xl px-5 py-6 text-[#4DA1A9] "></i>
                                    <input type="email" name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter your email' className="w-full py-4 px-14 rounded-[12px] border-1 border-[#BFC8CA] focus:ring-[#4DA1A9] focus:border-[#4DA1A9] outline-none" />
                                </div>
                                {(formik.touched.email && formik.errors.email) ? (
                                    <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                        <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                        </svg>
                                        <span className="sr-only">Info</span>
                                        <div>
                                            {formik.errors.email}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                            {/* password */}
                            <div className='flex flex-col w-full gap-4'>
                                <label htmlFor="password" className='text-xl'>Password</label>
                                <div className="relative">
                                    <i className="fa-solid fa-key absolute top-1/2 transform -translate-y-1/2 text-xl px-5 py-6 text-[#4DA1A9] "></i>
                                    <input type={isVisibile ? "text" : "password"} name='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter your password' className="w-full py-4 ps-14 pe-6 rounded-[12px] border-1 border-[#BFC8CA] focus:ring-[#4DA1A9] focus:border-[#4DA1A9] outline-none" />
                                    {isVisibile == true ? (
                                        <i className="fa-regular fa-eye absolute top-1/2 end-2 transform -translate-y-1/2 text-xl px-5 py-6 text-[#2E5077] cursor-pointer" onClick={() => togglePasswordVisiability(true)}></i>
                                    ) : (
                                        <i className="fa-regular fa-eye-slash absolute top-1/2 end-2 transform -translate-y-1/2 text-xl px-5 py-6 text-[#2E5077] cursor-pointer" onClick={() => togglePasswordVisiability(false)}></i>
                                    )}
                                </div>
                                {(formik.touched.password && formik.errors.password) ? (
                                    <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                        <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                        </svg>
                                        <span className="sr-only">Info</span>
                                        <div>
                                            {formik.errors.password}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                            <Link to="forgetPassword" className='self-end underline'>Forget Password?</Link>

                        </div>
                        {isLoading ? (
                            <button type='submit' className={`bg-gradient-to-r from-[var(--dark-blue)] to-[var(--teal-blue)] py-4 text-lg rounded-xl text-white mt-10 w-full`}><i className='fa-solid fa-spin fa-spinner'></i></button>
                        ) : (
                            <button type='submit' className={`bg-gradient-to-r from-[var(--dark-blue)] to-[var(--teal-blue)] py-4 text-lg rounded-xl text-white mt-10 w-full`}> Login</button>
                        )}
                        {userMessage &&
                            <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                                {userMessage}
                            </div>
                        }
                        {userError &&
                            <div className="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {userError}
                            </div>
                        }
                    </form>

                </div>
                <div className={`w-1/2 bg-gradient-to-r from-[var(--dark-blue)] to-[var(--teal-blue)] hidden md:block rounded-r-4xl`}>

                </div>
            </div>
        </div>
    )
}
