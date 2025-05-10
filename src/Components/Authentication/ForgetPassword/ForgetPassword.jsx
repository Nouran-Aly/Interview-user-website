import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import apiClient from '../../Api/Axios'

export default function ForgetPassword() {
    const [userMsg, setuserMsg] = useState("")
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: "",
        },
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
                navigate("/verify-otp", { state: { email: values.email } })
            }
        } catch (error) {
            console.log(error);
            setuserMsg(error.response.data.message)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-70px)] md:my-0 bg-[#152a4c]">
            <div className="bg-white rounded-2xl px-5 md:px-10 py-8 md:py-10 mx-5">
                <h1 className='font-bold text-2xl mb-2'>Forget Your Password</h1>
                <p className='text-[18px] text-[#988F89] font-light text-center pt-2'>Enter your email or your phone number for
                    verification  </p>
                <form onSubmit={formik.handleSubmit}>
                    <div className={`flex flex-col gap-4 w-full mt-12`}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='Enter your email' className="w-full py-4 px-4 rounded-[12px] border-1 border-[#BFC8CA] focus:ring-[#79D7BE] focus:border-[#79D7BE] outline-none" />
                    </div>
                    <button type='submit' className="w-full h-14 rounded-xl text-white mt-20 bg-red-500 bg-gradient">Continue</button>
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
