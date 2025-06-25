import React, { useEffect, useState } from 'react'
import styles from '../Authentication.module.css'
import { ErrorMessage, useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { data, useNavigate } from 'react-router-dom'
import apiClient from '../../Api/Axios'
import img from '../../../assets/register.png'

export default function Registration() {
    const [isVisibile, setIsVisibile] = useState(false)
    const [isConVisibile, setIsConVisibile] = useState(false)
    const [userMessage, setuserMessage] = useState("")
    const [userError, setuserError] = useState("")
    const [isLoading, setisLoading] = useState(false)
    const navigate = useNavigate()
    const age = new Date
    age.setFullYear(age.getFullYear() - 18)

    const mySchema = Yup.object({
        fullName: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        gender: Yup.string().required('Gender is required'),
        dateOfBirth: Yup.string().required('Date of birth is required').max(age, "You are not eligible to register"),
        password: Yup.string().required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/\d/, 'Password must contain at least one number')
            .matches(/[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]/, 'Password must contain at least one special character'),
        confirmPassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password'), null], "Passwords must match")
    })

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            gender: "",
            dateOfBirth: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: mySchema,
        onSubmit: (values) => {
            console.log(values);
            register(values)
        }
    })

    async function register(values) {
        setisLoading(true)
        try {
            const response = await apiClient.post("Auth/register/web", values)
            console.log(response);
            setisLoading(false)
            navigate('/otp', { state: { email: response.data.email } })
            // setuserError(response.response.data.errors)

        } catch (error) {
            console.log(error);
            setisLoading(false)
            console.log(error.response.data);
            // error.response.data.errors.map((err) => setuserError(err))
            setuserError(error.response.data.errors)
        }
    }


    const togglePasswordVisiability = (state) => {
        setIsVisibile(!state)
    }

    const toggleConfirmPasswordVisiability = (state) => {
        setIsConVisibile(!state)
    }

    return (
        <div className='bg-[#152a4c] min-h-screen w-full flex justify-content-center items-center'>
            <div className="flex w-full mx-8 my-10 md:mx-16">
                <div className='w-full md:w-1/2 px-8 py-15 md:p-13 bg-amber-10 bg-white rounded-s-4xl rounded-e-4xl md:rounded-e-none  '>
                    <p className='text-3xl font-bold pb-7'>Create Account </p>
                    <p className='text-xl text-[#A4ADAF]'>Register with your valid email address </p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col w-full gap-8 mt-7">
                            {/* full name */}
                            <div className='flex flex-col w-full gap-4'>
                                <label htmlFor="fullName" className='text-xl'>Full Name</label>
                                <div className="relative">
                                    <i className="fa-regular fa-paper-plane absolute top-1/2 transform -translate-y-1/2 text-xl px-5 py-6 text-[#4DA1A9] "></i>
                                    <input type="text" name='fullName' id='fullName' value={formik.values.fullName} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter your full name' className="w-full py-4 px-14 rounded-[12px] border-1 border-[#BFC8CA] focus:ring-[#4DA1A9] focus:border-[#4DA1A9] outline-none" />
                                </div>
                                {(formik.touched.fullName && formik.errors.fullName) ? (
                                    <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                        <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                        </svg>
                                        <span className="sr-only">Info</span>
                                        <div>
                                            {formik.errors.fullName}
                                        </div>
                                    </div>
                                ) : null}
                            </div>

                            {/* email */}
                            <div className='flex flex-col w-full gap-4'>
                                <label htmlFor="email" className='text-xl'>Email</label>
                                <div className="relative">
                                    <i className="fa-solid fa-envelope absolute top-1/2 transform -translate-y-1/2 text-xl px-5 py-6 text-[#4DA1A9] "></i>
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

                            {/* gender */}
                            <div className='flex flex-col gap-4'>
                                <label htmlFor="gender" className='text-xl'>Gender</label>
                                <div className="w-full flex items-center gap-6">
                                    <div className="w-1/2 flex items-center ps-4 border border-[#BFC8CA] rounded-sm">
                                        <input id="male" type="radio" value="Male" name="gender" checked={formik.values.gender == "Male"} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-4 h-4 accent-blue-950" />
                                        <label htmlFor="male" className={`w-full py-4 ms-2 text-sm font-medium text-[#BFC8CA] dark:text-gray-300 ${formik.values.gender == "Male" ? "text-gray-800" : "text-[#BFC8CA]"} `}>Male</label>
                                    </div>

                                    <div className="w-1/2 flex items-center ps-4 border border-[#BFC8CA] rounded-sm">
                                        <input id="female" type="radio" value="Female" name="gender" checked={formik.values.gender == "Female"} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-4 h-4 accent-blue-950" />
                                        <label htmlFor="female" className={`w-full py-4 ms-2 text-sm font-medium dark:text-gray-300 ${formik.values.gender == "Female" ? "text-gray-800" : "text-[#BFC8CA]"}`}>Female</label>
                                    </div>
                                </div>
                                {(formik.touched.gender && formik.errors.gender) ? (
                                    <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                        <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                        </svg>
                                        <span className="sr-only">Info</span>
                                        <div>
                                            {formik.errors.gender}
                                        </div>
                                    </div>
                                ) : null}
                            </div>

                            {/* Date of birth */}
                            <div className='flex flex-col w-full gap-4'>
                                <label htmlFor="dateOfBirth" className='text-xl'>Date of birth</label>
                                <div className="relative">
                                    <i className="fa-solid fa-calendar-days absolute top-1/2 transform -translate-y-1/2 text-xl px-5 py-6 text-[#4DA1A9] "></i>
                                    <input type="date" name='dateOfBirth' id='dateOfBirth' onChange={(e) => formik.setFieldValue('dateOfBirth', e.target.value)} onBlur={formik.handleBlur} placeholder='Enter your date of birth' className="w-full py-4 ps-14 pe-6 rounded-[12px] border-1 border-[#BFC8CA] focus:ring-[#4DA1A9] focus:border-[#4DA1A9] outline-none" />
                                </div>

                                {(formik.touched.dateOfBirth && formik.errors.dateOfBirth) ? (
                                    <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                        <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                        </svg>
                                        <span className="sr-only">Info</span>
                                        <div>
                                            {formik.errors.dateOfBirth}
                                        </div>
                                    </div>
                                ) : null}
                            </div>

                            {/* password */}
                            <div className='flex flex-col w-full gap-4'>
                                <label htmlFor="password" className='text-xl'>Password</label>
                                <div className="relative">
                                    <i className="fa-solid fa-key absolute top-1/2 transform -translate-y-1/2 text-xl px-5 py-6 text-[#4DA1A9] "></i>
                                    <input type={isConVisibile ? "text" : "password"} name='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter your password' className="w-full py-4 ps-14 pe-6 rounded-[12px] border-1 border-[#BFC8CA] focus:ring-[#4DA1A9] focus:border-[#4DA1A9] outline-none" />
                                    {isConVisibile == true ? (
                                        <i className="fa-regular fa-eye absolute top-1/2 end-2 transform -translate-y-1/2 text-xl px-5 py-6 text-[#2E5077] cursor-pointer" onClick={() => toggleConfirmPasswordVisiability(true)}></i>
                                    ) : (
                                        <i className="fa-regular fa-eye-slash absolute top-1/2 end-2 transform -translate-y-1/2 text-xl px-5 py-6 text-[#2E5077] cursor-pointer" onClick={() => toggleConfirmPasswordVisiability(false)}></i>
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

                            {/* confirm password */}
                            <div className='flex flex-col w-full gap-4'>
                                <label htmlFor="confirmPassword" className='text-xl'>Confirm Password</label>
                                <div className="relative">
                                    <i className="fa-solid fa-key absolute top-1/2 transform -translate-y-1/2 text-xl px-5 py-6 text-[#4DA1A9] "></i>
                                    <input type={isVisibile ? "text" : "password"} name='confirmPassword' id='confirmPassword' value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter the password' className="w-full py-4 ps-14 pe-6 rounded-[12px] border-1 border-[#BFC8CA] focus:ring-[#4DA1A9] focus:border-[#4DA1A9] outline-none" />
                                    {isVisibile == true ? (
                                        <i className="fa-regular fa-eye absolute top-1/2 end-2 transform -translate-y-1/2 text-xl px-5 py-6 text-[#2E5077] cursor-pointer" onClick={() => togglePasswordVisiability(true)}></i>
                                    ) : (
                                        <i className="fa-regular fa-eye-slash absolute top-1/2 end-2 transform -translate-y-1/2 text-xl px-5 py-6 text-[#2E5077] cursor-pointer" onClick={() => togglePasswordVisiability(false)}></i>
                                    )}
                                </div>
                                {(formik.touched.confirmPassword && formik.errors.confirmPassword) ? (
                                    <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                        <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                        </svg>
                                        <span className="sr-only">Info</span>
                                        <div>
                                            {formik.errors.confirmPassword}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        {isLoading ? (
                            <button type='button' className={`bg-gradient-to-r from-[var(--dark-blue)] to-[var(--teal-blue)] py-4 text-lg rounded-xl text-white mt-10 w-full`}><i className='fa-solid fa-spin spin'></i></button>
                        ) : (
                            <button type='submit' className={`bg-gradient-to-r from-[var(--dark-blue)] to-[var(--teal-blue)] py-4 text-lg rounded-xl text-white mt-10 w-full`}>Sign in</button>
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
                <div className={`w-1/2 bg-gradient-to-r from-[var(--dark-blue)] to-[var(--teal-blue)] hidden md:flex justify-center items-center rounded-r-4xl`}>
                    <img src={img} alt="" className='flex justify-center items-center' />
                </div>
            </div >
        </div >
    )
}
