import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './CvGeneration.module.css'
import html2pdf from 'html2pdf.js';


export default function CvGeneration() {
    const cvRef = useRef(null);
    const handleDownloadPDF = () => {
        if (!cvRef.current) return;

        const element = cvRef.current;

        const opt = {
            margin: 0.5,
            filename: 'my-cv.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        };

        html2pdf().set(opt).from(element).save();
    };


    return (
        <>
            {/* <button
                onClick={handleDownloadPDF}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Download as PDF
            </button> */}

            <div ref={cvRef} className={`${styles.cv} flex flex-col py-5 md:py-15 px-10 md:px-40 gap-10`}>


                {/* personal info */}
                <div className="flex items-center gap-4">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center text-center w-60 h-60 p-5 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                    <div className='flex flex-col gap-4'>
                        <input type="text" className='font-semibold text-xl' placeholder='Your Name' />
                        <input type="text" className='text-[#3F424D]' placeholder='A short but captivating headline' />
                        <div className="flex items-center gap-2">
                            <svg class="w-5 h-5 text-[#D41503] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clip-rule="evenodd" />
                            </svg>
                            <input type="text" className='font-semibold' placeholder='USA' />
                        </div>
                        <div className="flex items-center gap-2">
                            <svg class="w-5 h-5 text-[#3D6BF4] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z" />
                                <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z" />
                            </svg>
                            <input type="text" className='font-semibold' placeholder='Email' />
                        </div>
                        <div className="flex items-center gap-2">
                            <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd" />
                            </svg>
                            <input type="text" className='font-semibold' placeholder='GitHub' />
                        </div>
                    </div>
                </div>
                {/* description */}
                <textarea name="" id="" rows={4} className='text-xl py-3 resize-none' placeholder="Write a short introduction for your CV, start with your job title or main skill, followed by your key achievements or experiences, and then your career goals. Make sure it's concise, typically 2-3 sentences, and tailored to the role you're applying for, highlighting how your skills and experiences make you a perfect fit for the position."></textarea>
                {/* work experience */}
                <div>
                    <div className="flex items-center gap-2 border-b border-gray-400 pb-5">
                        <svg class="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M4 4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2v14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2V5a1 1 0 0 1-1-1Zm5 2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1Zm-5 4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1Zm-3 4a2 2 0 0 0-2 2v3h2v-3h2v3h2v-3a2 2 0 0 0-2-2h-2Z" clip-rule="evenodd" />
                        </svg>
                        <p className='font-semibold text-3xl'>Work Experience</p>
                    </div>
                    <div className='flex justify-between mt-5'>
                        <div className="flex flex-col gap-2">
                            <input type="text" className='text-2xl font-semibold' placeholder='Company Name' />
                            <input type="text" className='text-[#0F47F1]' placeholder='Role at the company' />
                        </div>
                        <input type="text" className='text-[#656A7B]' placeholder='2022 - Present' />
                    </div>
                    <ul className="space-y-2 mt-3">
                        <li>
                            <textarea name="" id="" className='text-xl w-full' placeholder="Include a concise overview of your key responsibilities, highlighting your direct impact on the organization, such as improved processes, cost savings, or revenue generation."></textarea>
                        </li>
                        <li>
                            <textarea name="" id="" className='text-xl w-full' placeholder="Detail significant projects or initiatives you've led or contributed to, emphasizing the skills you utilized and the tangible outcomes or achievements resulting from your efforts."></textarea>
                        </li>
                    </ul>
                </div>
                {/* Technical skills */}
                <div>
                    <div className="flex items-center gap-2 border-b border-gray-400 pb-5">
                        <svg class="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M4 4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2v14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2V5a1 1 0 0 1-1-1Zm5 2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1Zm-5 4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1Zm-3 4a2 2 0 0 0-2 2v3h2v-3h2v3h2v-3a2 2 0 0 0-2-2h-2Z" clip-rule="evenodd" />
                        </svg>
                        <p className='font-semibold text-3xl'>Technical skills</p>
                    </div>
                    <div className='flex justify-between mt-5'>
                        <div className="flex flex-col gap-2">
                            <input type="text" className='text-2xl font-semibold' placeholder='Skill 1' />
                        </div>
                    </div>
                    <ul className="space-y-2 mt-3">
                        <li>
                            <textarea name="" id="" className='text-xl w-full' placeholder="Proficiency in specific design software (e.g., Adobe Creative Suite, Sketch, Figma), UX/UI design, HTML/CSS, prototyping, wireframing, etc."></textarea>
                        </li>
                        <li>
                            <textarea name="" id="" className='text-xl w-full' placeholder="Briefly describe your level of proficiency in each skill and any notable achievements or experiences that demonstrate your abilities."></textarea>
                        </li>
                    </ul>
                </div>
                {/* Soft skills */}
                <div>
                    <div className="flex items-center gap-2 border-b border-gray-400 pb-5">
                        <svg class="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M4 4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2v14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2V5a1 1 0 0 1-1-1Zm5 2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1Zm-5 4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1Zm-3 4a2 2 0 0 0-2 2v3h2v-3h2v3h2v-3a2 2 0 0 0-2-2h-2Z" clip-rule="evenodd" />
                        </svg>
                        <p className='font-semibold text-3xl'>Soft skills</p>
                    </div>
                    <div className='flex justify-between mt-5'>
                        <div className="flex flex-col gap-2">
                            <input type="text" className='text-2xl font-semibold' placeholder='Skill 1' />
                        </div>
                    </div>
                    <ul className="space-y-2 mt-3">
                        <li>
                            <textarea name="" id="" className='text-xl w-full' placeholder="Look at the job description and note any soft skills mentioned. Common ones for design roles might include communication, teamwork, problem-solving, creativity, adaptability, and time management."></textarea>
                        </li>
                        <li>
                            <textarea name="" id="" className='text-xl w-full' placeholder="Instead of merely listing your soft skills, provide brief examples that demonstrate these skills in action."></textarea>
                        </li>
                    </ul>
                </div>
                {/* Education */}
                <div>
                    <div className="flex items-center gap-2 border-b border-gray-400 pb-5">
                        <svg class="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M4 4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2v14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2V5a1 1 0 0 1-1-1Zm5 2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1Zm-5 4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1Zm-3 4a2 2 0 0 0-2 2v3h2v-3h2v3h2v-3a2 2 0 0 0-2-2h-2Z" clip-rule="evenodd" />
                        </svg>
                        <p className='font-semibold text-3xl'>Education</p>
                    </div>
                    <div className='flex justify-between my-5'>
                        <div className="flex flex-col gap-2">
                            <input type="text" className='text-2xl font-semibold' placeholder='University 1' />
                            <input type="text" className='text-[#0F47F1]' placeholder='Major of Studies' />
                        </div>
                        <input type="text" className='text-[#656A7B]' placeholder='2014 - 2017' />
                    </div>
                    <textarea name="" id="" className='text-xl min-w-full min-h-[100px]' placeholder="Write concisely about your academic journey, focusing on how your studies have enhanced your professional skills and prepared you for your chosen career. Be sure to mention your degree, major, any minors, honors or awards you received, and how these specifically contributed to your development."></textarea>
                </div>
                {/* Languages */}
                <div>
                    <div className="flex items-center gap-2 border-b border-gray-400 pb-5">
                        <svg class="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M4 4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2v14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2V5a1 1 0 0 1-1-1Zm5 2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1Zm-5 4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1Zm-3 4a2 2 0 0 0-2 2v3h2v-3h2v3h2v-3a2 2 0 0 0-2-2h-2Z" clip-rule="evenodd" />
                        </svg>
                        <p className='font-semibold text-3xl'>Languages</p>
                    </div>
                    <div className='flex justify-between my-5'>
                        <div className='flex flex-col gap-2'>
                            <input type="text" className='text-[#656A7B] font-bold text-xl' placeholder='English' />
                            <input type="text" className='text-[#0F47F1]' placeholder='Fluent' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <input type="text" className='text-[#656A7B] font-bold text-xl' placeholder='English' />
                            <input type="text" className='text-[#0F47F1]' placeholder='Fluent' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <input type="text" className='text-[#656A7B] font-bold text-xl' placeholder='English' />
                            <input type="text" className='text-[#0F47F1]' placeholder='Fluent' />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
