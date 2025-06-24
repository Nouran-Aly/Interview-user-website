import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './CvGeneration.module.css'
import html2pdf from 'html2pdf.js';
import axios from 'axios';
import { ErrorMessage, Field, FieldArray, Form, Formik, useFormik } from 'formik';
import Loader from '../Loader/Loader'
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup'


export default function CvGeneration() {
    const [suggestions, setSuggestions] = useState([])
    const [loading, setLoading] = useState(false)
    const [isSuggested, setIsSuggested] = useState(false)

    const initialValues = {
        name: "",
        title: "",
        email: "",
        phone: "",
        address: "",
        linkedin: "",
        github: "",
        introduction: "",
        skills: [""],
        education: [
            {
                degree: "",
                institution: "",
                year: ""
            }
        ],
        experience: [
            {
                title: "",
                company: "",
                years: "",
                description: "",
                Projects: [
                    {
                        title: "",
                        duration: "",
                        description: ""
                    }
                ]
            }
        ]
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name Is Required"),
        title: Yup.string().required("Title Is Required"),
    })


    async function BuildCV(values) {
        console.log(values);
        const formData = new FormData();
        // JSON file as Blob under 'file' key
        formData.append("file", new Blob([JSON.stringify(values)], { type: "application/json" }), "data.json");
        console.log(JSON.stringify(values, null, 2));
        try {
            const response = await axios.post(
                "https://gemini-api-caller-340958319193.us-central1.run.app/generate_cv_template3",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    responseType: "blob"
                }
            );
            const contentType = response.headers["content-type"];
            if (contentType.includes("application/json")) {
                const reader = new FileReader();
                reader.onload = () => {
                    try {
                        const json = JSON.parse(reader.result);
                        console.log("Server JSON Response:", json);
                    } catch (err) {
                        console.error("Failed to parse JSON:", err);
                    }
                };
                reader.readAsText(response.data);
            } else {
                const pdfBlob = new Blob([response.data], { type: contentType });
                const url = URL.createObjectURL(pdfBlob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "GeneratedCV.pdf";
                document.body.appendChild(link);
                link.click();
                URL.revokeObjectURL(url);
            }

        } catch (error) {
            if (error.response && error.response.data instanceof Blob && error.response.data.type === "application/json") {
                const reader = new FileReader();
                reader.onload = () => {
                    try {
                        const json = JSON.parse(reader.result);
                        console.log("Server JSON Error Response:", json);
                        toast.error(json.error)
                    } catch (err) {
                        console.error("Failed to parse JSON error:", err);
                    }
                };
                reader.readAsText(error.response.data);
            } else {
                console.log("Error:", error.response || error);
            }
        }
    }

    async function generateAISuggestions(values) {
        setLoading(true)
        try {
            const response = await axios.post("https://gemini-api-caller-340958319193.us-central1.run.app/generate_suggestions_gemini", values)
            console.log(response.data);
            setSuggestions(response.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    return (
        <>
            {loading ? <Loader /> : null}
            <ToastContainer position='bottom-right' autoClose={2000} />
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {({ values, form, setFieldValue, errors, touched }) => (
                    <Form>
                        <div className={`${styles.cv} py-5 md:py-15 px-10 md:px-20 !bg-white`}>
                            <div className='flex justify-end'>
                                <button type="submit" onClick={() => BuildCV(values)} className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2">
                                    <svg class="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z" />
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                    </svg>

                                    Build CV
                                </button>

                                <button type="button" onClick={() => {
                                    generateAISuggestions(values)
                                    setIsSuggested(true)
                                }} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2">
                                    <svg class="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.872 9.687 20 6.56 17.44 4 4 17.44 6.56 20 16.873 9.687Zm0 0-2.56-2.56M6 7v2m0 0v2m0-2H4m2 0h2m7 7v2m0 0v2m0-2h-2m2 0h2M8 4h.01v.01H8V4Zm2 2h.01v.01H10V6Zm2-2h.01v.01H12V4Zm8 8h.01v.01H20V12Zm-2 2h.01v.01H18V14Zm2 2h.01v.01H20V16Z" />
                                    </svg>
                                    AI Suggestions
                                </button>
                            </div>

                            <div className="flex flex-col gap-20 p-10 rounded-2xl">
                                {/* personal info */}
                                <div className="grid grid-cols-1 justify-between gap-4 w-full flex-wrap" >
                                    <div className='flex flex-col gap-4 mb-5'>
                                        <div className="flex flex-col gap-1">
                                            <Field name="name" className="font-semibold text-xl " placeholder="Your Name" />
                                            {errors.name && touched.name && (
                                                <p className="text-red-500 text-sm">{errors.name}</p>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <Field name="title" className='text-[#3F424D]' placeholder='Your Title' />
                                            {errors.title && touched.title && (
                                                <p className="text-red-500 text-sm">{errors.title}</p>
                                            )}
                                        </div>
                                        {isSuggested ?
                                            <div className="mt-6 p-5 border border-gray-300 rounded-xl bg-white shadow-sm space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <svg class="w-5 h-5 text-indigo-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.872 9.687 20 6.56 17.44 4 4 17.44 6.56 20 16.873 9.687Zm0 0-2.56-2.56M6 7v2m0 0v2m0-2H4m2 0h2m7 7v2m0 0v2m0-2h-2m2 0h2M8 4h.01v.01H8V4Zm2 2h.01v.01H10V6Zm2-2h.01v.01H12V4Zm8 8h.01v.01H20V12Zm-2 2h.01v.01H18V14Zm2 2h.01v.01H20V16Z" />
                                                    </svg>
                                                    <p className="text-lg font-semibold text-gray-700">AI Suggested Title</p>
                                                </div>

                                                <button
                                                    type='button'
                                                    className={`px-4 py-3 text-sm rounded-lg border transition focus:outline-none text-left
                                                            bg-indigo-50 text-indigo-700 border-indigo-300 hover:bg-indigo-100 `}
                                                >
                                                    {suggestions.title}
                                                </button>
                                            </div>
                                            : null}
                                    </div>
                                    <div className='flex justify-between items-center flex-wrap gap-4 w-full'>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-[#3D6BF4] " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z" />
                                                <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z" />
                                            </svg>
                                            <Field type="email" name="email" className='font-semibold' placeholder='Email' />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z" />
                                            </svg>
                                            <Field type="text" name="phone" className='font-semibold' placeholder='Phone Number' />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-[#D41503] " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clipRule="evenodd" />
                                            </svg>
                                            <Field type="text" name="address" className='font-semibold' placeholder='Location' />
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clipRule="evenodd" />
                                            </svg>
                                            <Field type="text" name="github" className='font-semibold' placeholder='GitHub' />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clipRule="evenodd" />
                                                <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                                            </svg>
                                            <Field type="text" name="linkedin" className='font-semibold' placeholder='linkedin' />
                                        </div>



                                    </div>
                                </div>
                                {/* description */}
                                <div className='w-full'>
                                    <div className="flex items-center gap-2 border-b border-gray-400 pb-5">
                                        <svg class="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
                                        </svg>
                                        <p className='font-semibold text-3xl'>Introduction</p>
                                    </div>
                                    <Field as="textarea" name="introduction" id="introduction" rows={5} className='text-xl py-3 resize-none h-full w-full' placeholder="Write a short introduction for your CV, start with your job title or main skill, followed by your key achievements or experiences, and then your career goals. Make sure it's concise, typically 2-3 sentences, and tailored to the role you're applying for, highlighting how your skills and experiences make you a perfect fit for the position."></Field>
                                    {isSuggested ? suggestions && (() => {
                                        const alreadyAdded = values.introduction.includes(suggestions.introduction);
                                        return (
                                            <div className="mt-6 p-5 border border-gray-300 rounded-xl bg-white shadow-sm space-y-4">

                                                <div className="flex items-center gap-2">
                                                    <svg class="w-5 h-5 text-indigo-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.872 9.687 20 6.56 17.44 4 4 17.44 6.56 20 16.873 9.687Zm0 0-2.56-2.56M6 7v2m0 0v2m0-2H4m2 0h2m7 7v2m0 0v2m0-2h-2m2 0h2M8 4h.01v.01H8V4Zm2 2h.01v.01H10V6Zm2-2h.01v.01H12V4Zm8 8h.01v.01H20V12Zm-2 2h.01v.01H18V14Zm2 2h.01v.01H20V16Z" />
                                                    </svg>
                                                    <p className="text-lg font-semibold text-gray-700">AI Suggested Introduction</p>
                                                </div>

                                                <p className="text-sm text-gray-500 pb-5">
                                                    Click the button to add AI's suggested introduction to your profile.
                                                </p>

                                                <button
                                                    type='button'
                                                    onClick={() => {
                                                        if (!alreadyAdded) {
                                                            // setFieldValue('introduction', values.introduction + ' ' + suggestions.introduction);
                                                            setFieldValue('introduction', suggestions.introduction);
                                                        }
                                                    }}
                                                    disabled={alreadyAdded}
                                                    className={`px-4 py-3 text-sm rounded-lg border transition focus:outline-none text-left ${alreadyAdded
                                                        ? 'bg-green-100 text-green-700 border-green-300 cursor-not-allowed'
                                                        : 'bg-indigo-50 text-indigo-700 border-indigo-300 hover:bg-indigo-100'
                                                        }`}
                                                >
                                                    {/* {alreadyAdded ? "✓ Already Added" : "Add Suggested Introduction"} */}
                                                    {alreadyAdded ? "✓ " : ""}{suggestions.introduction}

                                                </button>
                                            </div>
                                        );
                                    })() : null}
                                </div>



                                <FieldArray name="experience">
                                    {({ push, remove, form }) => (
                                        <div>
                                            <div className="flex items-center gap-2 border-b border-gray-400 pb-5">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                                </svg>
                                                <p className='font-semibold text-3xl'>Work Experience</p>
                                            </div>
                                            {form.values.experience.map((experience, index) => (
                                                <div key={index}>
                                                    <div className='flex flex-col mt-5 gap-2'>
                                                        <div className="flex justify-between items-center gap-2">
                                                            <Field type="text" name={`experience[${index}.company]`} className='text-2xl font-semibold w-full' placeholder='Company Name' />
                                                            <button type='buttton' onClick={() => remove(index)}
                                                                className="w-6 h-6 rounded-full flex justify-center items-end border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                                            >
                                                                x
                                                            </button>
                                                        </div>
                                                        <div className="flex justify-between items-center gap-2">
                                                            <Field type="text" name={`experience[${index}.title]`} className='text-[#0F47F1] w-full' placeholder='Role at the company' />
                                                            <Field type="text" name={`experience[${index}.years]`} className='text-[#656A7B] text-right' placeholder='2022 - Present' />
                                                        </div>
                                                    </div>
                                                    <Field as="textarea" name={`experience[${index}.description]`} id="" className='text-xl w-full mt-3' placeholder="Include a concise overview of your key responsibilities, highlighting your direct impact on the organization, such as improved processes, cost savings, or revenue generation."></Field>
                                                    {/* projects */}
                                                    <p className="font-semibold text-lg py-5 text-center">Projects You Have Worked On</p>
                                                    <FieldArray name={`experience[${index}].Projects`}>
                                                        {({ push: pushProject, remove: removeProject }) => (
                                                            <>
                                                                <div >
                                                                    {/* {experience?.projects && */}
                                                                    {experience?.Projects && experience?.Projects?.map((project, projectIndex) => (
                                                                        <div key={projectIndex} className="flex flex-col gap-3 border-b border-gray-300 py-5">
                                                                            <Field type="text" name={`experience[${index}].Projects[${projectIndex}].title]`} className='text-xl font-semibold' placeholder='Project Title' />
                                                                            <Field type="text" name={`experience[${index}].Projects[${projectIndex}].duration]`} className='text-[#656A7B] text-righttext-xl font-semibold' placeholder='Duration' />
                                                                            <Field as="textarea" name={`experience[${index}].Projects[${projectIndex}].description]`} className='text-base' placeholder='Description' />
                                                                            <button type="button" onClick={() => removeProject(projectIndex)} className="text-red-500 hover:underline self-end">Remove Project</button>

                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <button type="button" onClick={() => pushProject({ title: '', duration: '', description: '' })} className='mt-4 text-blue-500 flex w-full items-center justify-center'>+ Add Project</button>
                                                            </>

                                                        )}
                                                    </FieldArray>


                                                </div>
                                            ))}
                                            <button type="button" onClick={() => push('')} className='mt-4 text-blue-500 flex justify-end w-full'>+ Add Experience</button>

                                        </div>
                                    )}

                                </FieldArray>

                                {/* Technical skills */}
                                <FieldArray name="skills">
                                    {({ push, remove, form }) => (
                                        <div>
                                            <div className="flex items-center gap-2 border-b border-gray-400 pb-5">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                                                </svg>

                                                <p className='font-semibold text-3xl'>Technical skills</p>
                                            </div>
                                            <div className='flex flex-col gap-3 mt-5 w-full'>
                                                {form.values.skills.map((skill, index) => (
                                                    <div key={index} className='flex justify-between w-full'>
                                                        <Field type="text" name={`skills[${index}]`} className='text-xl font- w-full' placeholder='Add Skill' />
                                                        <button type='buttton' onClick={() => remove(index)}
                                                            className="w-6 h-6 rounded-full flex justify-center items-center border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                                        >
                                                            x
                                                        </button>
                                                    </div>

                                                ))}
                                                <button type="button" onClick={() => push('')} className="mt-4 text-blue-500">
                                                    + Add Skill
                                                </button>
                                                {isSuggested ? suggestions && (
                                                    <div className="mt-6 p-5 border border-gray-300 rounded-xl bg-white shadow-sm space-y-4">

                                                        <div className="flex items-center gap-2">
                                                            <svg class="w-5 h-5 text-indigo-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.872 9.687 20 6.56 17.44 4 4 17.44 6.56 20 16.873 9.687Zm0 0-2.56-2.56M6 7v2m0 0v2m0-2H4m2 0h2m7 7v2m0 0v2m0-2h-2m2 0h2M8 4h.01v.01H8V4Zm2 2h.01v.01H10V6Zm2-2h.01v.01H12V4Zm8 8h.01v.01H20V12Zm-2 2h.01v.01H18V14Zm2 2h.01v.01H20V16Z" />
                                                            </svg>
                                                            <p className="text-lg font-semibold text-gray-700">AI Suggested Skills</p>
                                                        </div>

                                                        <p className="text-sm text-gray-500 pb-4">
                                                            Click on a skill to quickly add it to your technical skills list.
                                                        </p>

                                                        <div className="flex flex-wrap gap-3">
                                                            {suggestions.industry_relevant_skills?.map((skill, index) => {
                                                                const alreadyAdded = form.values.skills.includes(skill);
                                                                return (

                                                                    <button
                                                                        type="button"
                                                                        key={index}
                                                                        onClick={() => !alreadyAdded && push(skill)}
                                                                        disabled={alreadyAdded}
                                                                        className={`px-4 py-1.5 text-sm rounded-full border transition focus:outline-none ${alreadyAdded
                                                                            ? 'bg-green-100 text-green-700 border-green-300 cursor-not-allowed'
                                                                            : 'bg-indigo-50 text-indigo-700 border-indigo-300 hover:bg-indigo-100'
                                                                            }`}
                                                                    >
                                                                        {alreadyAdded ? "✓ " : ""}{skill}
                                                                    </button>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                ) : null}



                                            </div>
                                        </div>
                                    )}

                                </FieldArray>

                                {/* Education */}
                                <FieldArray name="education">
                                    {({ push, remove, form }) => (
                                        <div>
                                            <div className="flex items-center gap-2 border-b border-gray-400 pb-5">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                                                </svg>
                                                <p className='font-semibold text-3xl'>Education</p>
                                            </div>
                                            <div className="flex flex-col">
                                                {form.values.education.map((education, index) => (
                                                    <div className='flex flex-col justify-between my-5 gap-3'>
                                                        <div className="flex justify-between gap-2">
                                                            <Field type="text" name={`education[${index}].institution`} className='text-2xl font-semibold' placeholder='Institution' />
                                                            <Field type="text" name={`education[${index}].year`} className='text-[#656A7B] text-right' placeholder='Year' />
                                                        </div>
                                                        <div className="flex justify-between gap-2">
                                                            <Field type="text" name={`education[${index}].degree`} className='text-[#0F47F1] w-full' placeholder='Degree' />
                                                            <button type='buttton' onClick={() => remove(index)}
                                                                className="w-6 h-6 rounded-full flex justify-center items-center border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                                            >
                                                                x
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}

                                                <button type="button" onClick={() => push('')} className='mt-4 text-blue-500'>+ Add Education</button>
                                            </div>

                                            {/* <textarea name="" id="" className='text-xl min-w-full min-h-[100px]' placeholder="Write concisely about your academic journey, focusing on how your studies have enhanced your professional skills and prepared you for your chosen career. Be sure to mention your degree, major, any minors, honors or awards you received, and how these specifically contributed to your development."></textarea> */}
                                        </div>
                                    )}
                                </FieldArray>


                                {/* <button type='submit' className='bg-green-300 p-5'>Submit</button> */}

                            </div>
                        </div>
                    </Form >
                )}


            </Formik >

        </>

    )
}
