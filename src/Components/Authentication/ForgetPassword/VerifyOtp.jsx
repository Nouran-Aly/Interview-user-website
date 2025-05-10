import { useFormik } from 'formik'
import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from '../Otp/otp.module.css'
import apiClient from '../../Api/Axios'

export default function VerifyOtp() {
    const [userMsg, setuserMsg] = useState("")
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputs = useRef([]);


    const navigate = useNavigate()
    const location = useLocation()
    const email = location?.state?.email

    const formik = useFormik({
        initialValues: {
            email: email,
            otp: ""
        },
        onSubmit: (values) => {
            console.log(values);
            confirmOtp(values)
        }
    })

    async function confirmOtp(values) {
        try {
            const response = await apiClient.post("Auth/verify-otp", values)
            console.log(response);
            if (response.status == "200") {
                navigate("/updatepassword", { state: { email: email } })
            }
        } catch (error) {
            console.log(error);
            setuserMsg(error.response.data.message)

        }
    }

    const handleChange = (e, index) => {
        const value = e.target.value.slice(-1);
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputs.current[index + 1].focus();
        }

        if (newOtp.join('').length === 6) {
            formik.setFieldValue('otp', newOtp.join(''));
        }
    };


    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-70px)] md:my-0 bg-[#152a4c]">
            <div className="bg-white rounded-2xl px-5 md:px-10 py-8 md:py-10">
                <h1 className='font-bold text-xl text-center'>Forget Your Password ?</h1>
                <p className='text-[14px] text-[#988F89] font-light pt-2 text-center'>We have sent code to <span className='font-medium'>{email}</span> to verify your registration </p>
                <form onSubmit={formik.handleSubmit}>
                    <div className={`${styles.otp} flex justify-center items-center`}>
                        <div className={`flex justify-center items-center gap-4 md:gap-8 w-full mt-12 mb-8`}>
                            {otp.map((digit, idx) => (
                                <input
                                    key={idx}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(e, idx)}
                                    ref={(el) => (inputs.current[idx] = el)}
                                    className="w-10 h-10 border border-gray-400 text-center rounded-md"
                                />
                            ))}
                        </div>
                    </div>
                    <button type='submit' className={` w-full h-14 rounded-xl text-white mt-20 bg-red-500 bg-gradient `}>Continue</button>
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
