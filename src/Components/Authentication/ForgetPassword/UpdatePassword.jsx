import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import apiClient from '../../Api/Axios'


export default function UpdatePassword() {
    const [userMsg, setuserMsg] = useState("")
    const [isVisibile, setIsVisibile] = useState(false)
    const [isConVisibile, setIsConVisibile] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const email = location?.state?.email

    const schema = Yup.object({
        newPassword: Yup.string().required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/\d/, 'Password must contain at least one number')
            .matches(/[@$!%*?&#+-]/, 'Password must contain at least one special character'),
        confirmPassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('newPassword'), null], "Passwords must match")
    })

    const formik = useFormik({
        initialValues: {
            email: email,
            newPassword: "",
            confirmPassword: ""
        },
        validationSchema: schema,
        onSubmit: (values) => {
            console.log(values);
            forgetPassword(values)
        }
    })

    async function forgetPassword(values) {
        try {
            const response = await apiClient.post("Auth/forgot-password", values)
            console.log(response);
            setuserMsg(response.data.message)
            if (response.status == "200") {
                navigate("/")
            }
        } catch (error) {
            console.log(error);
            // setuserMsg(error.data.message)
        }
    }
    const togglePasswordVisiability = (state) => {
        setIsVisibile(!state)
    }

    const toggleConfirmPasswordVisiability = (state) => {
        setIsConVisibile(!state)
    }


    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-68px)] md:my-0 bg-[#152a4c]">
            <div className="bg-white rounded-2xl px-5 md:px-10 py-8 md:py-10 mx-5 my-10">
                <h1 className='font-bold text-2xl mb-2'>Your New Password</h1>
                <p className='text-[18px] text-[#988F89] font-light text-center pt-2'>Please use a Password that hasn’t been used before.</p>
                <form onSubmit={formik.handleSubmit} className='flex flex-col gap-8 mt-8'>
                    {/* password */}
                    <div className='flex flex-col w-full gap-4'>
                        <label htmlFor="newPassword" className='text-xl'>New Password</label>
                        <div className="relative">
                            <i className="fa-solid fa-key absolute top-1/2 transform -translate-y-1/2 text-xl px-5 py-6 text-[var(--teal-blue)] "></i>
                            <input type={isConVisibile ? "text" : "password"} name='newPassword' id='newPassword' value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter your password' className="w-full py-4 ps-14 pe-6 rounded-[12px] border-1 border-[#BFC8CA] focus:ring-[var(--teal-blue)] focus:border-[var(--teal-blue)] outline-none" />
                            {isConVisibile == true ? (
                                <i className="fa-regular fa-eye absolute top-1/2 end-2 transform -translate-y-1/2 text-xl px-5 py-6 text-[#2E5077] cursor-pointer" onClick={() => toggleConfirmPasswordVisiability(true)}></i>
                            ) : (
                                <i className="fa-regular fa-eye-slash absolute top-1/2 end-2 transform -translate-y-1/2 text-xl px-5 py-6 text-[#2E5077] cursor-pointer" onClick={() => toggleConfirmPasswordVisiability(false)}></i>
                            )}
                        </div>
                        {(formik.touched.newPassword && formik.errors.newPassword) ? (
                            <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                                <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    {formik.errors.newPassword}
                                </div>
                            </div>
                        ) : null}
                    </div>

                    {/* confirm password */}
                    <div className='flex flex-col w-full gap-4'>
                        <label htmlFor="confirmPassword" className='text-xl'>Confirm Password</label>
                        <div className="relative">
                            <i className="fa-solid fa-key absolute top-1/2 transform -translate-y-1/2 text-xl px-5 py-6 text-[var(--teal-blue)] "></i>
                            <input type={isVisibile ? "text" : "password"} name='confirmPassword' id='confirmPassword' value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter the password' className="w-full py-4 ps-14 pe-6 rounded-[12px] border-1 border-[#BFC8CA] focus:ring-[var(--teal-blue)] focus:border-[var(--teal-blue)] outline-none" />
                            {isVisibile == true ? (
                                <i className="fa-regular fa-eye absolute top-1/2 end-2 transform -translate-y-1/2 text-xl px-5 py-6 text-[#2E5077] cursor-pointer" onClick={() => togglePasswordVisiability(true)}></i>
                            ) : (
                                <i className="fa-regular fa-eye-slash absolute top-1/2 end-2 transform -translate-y-1/2 text-xl px-5 py-6 text-[#2E5077] cursor-pointer" onClick={() => togglePasswordVisiability(false)}></i>
                            )}
                        </div>
                        {(formik.touched.confirmPassword && formik.errors.confirmPassword) ? (
                            <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
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
                    <button type='submit' className="w-full h-14 rounded-xl text-white bg-gradient-to-r from-[var(--dark-blue)] to-[var(--teal-blue)]">Continue</button>
                    {userMsg && (
                        <div id="alert-border-2" className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 mt-3" role="alert">
                            <svg className="shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <div className="ms-3 text-sm font-medium">
                                {userMsg}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}
