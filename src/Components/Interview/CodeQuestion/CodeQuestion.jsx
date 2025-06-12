import React, { useEffect, useState, version } from "react";
import Editor from "@monaco-editor/react";
import Select from "react-select";
import apiClient from "../../Api/Axios";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { CountdownCircleTimer } from "react-countdown-circle-timer";


export default function CodeQuestion() {
    const [languageOptions, setlanguageOptions] = useState([])
    const [language, setLanguage] = useState(languageOptions);
    const [results, setResults] = useState([]);
    const [problems, setProblems] = useState([]);
    const [paginationData, setPaginationData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [codeMap, setCodeMap] = useState({});
    const [languageMap, setLanguageMap] = useState({});
    const [outputMap, setOutputMap] = useState([]);

    const navigate = useNavigate()
    // const [version, setVersion] = useState("");
    // const [code, setCode] = useState(defaultCode[language.value]);
    const [code, setCode] = useState();
    const [theme, setTheme] = useState("vs-dark"); // Default theme
    const [output, setOutput] = useState("")
    const location = useLocation();
    // const problems = location?.state?.problems || [];
    const interviewId = location?.state?.interviewId || [];
    const remainingTime = location?.state?.remainingTime || 1800;
    const [timeLeft, setTimeLeft] = useState(remainingTime)

    // console.log(interviewId, remainingTime);

    const handleLanguageChange = (selected) => {
        console.log(selected, "Selected");
        setLanguage(selected);
        setCode();
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "vs-dark" ? "vs" : "vs-dark"));
    };

    const getProblems = async (currentPage = 1) => {
        try {
            const response = await apiClient.get(`interviewquestions/${interviewId}/problemsolvingquestions`, {
                // const response = await apiClient.get(`interviewquestions/${"1118"}/problemsolvingquestions`, {
                params: {
                    page: currentPage,
                    pageSize: 1
                }
            })
            console.log(response);
            setProblems(response.data.items)
            setPaginationData(response.data.pagination)

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getProblems()
    }, [])

    useEffect(() => {
        if (interviewId) {
            getProblems(currentPage)
        }
    }, [interviewId])


    const handleRun = async (problemId) => {
        const currentCode = codeMap[problemId] || "";
        const currentLanguage = languageMap[problemId];

        console.log(currentCode, currentLanguage.value, currentLanguage.version);
        try {
            const response = await apiClient.post(`problem-solving/${problemId}/run`, {
                code: currentCode ? currentCode : "no code",
                language: currentLanguage.value,
                version: currentLanguage.version
            });
            console.log(response);
            setOutputMap((prev) => ({
                ...prev,
                [problemId]: response?.data?.data?.output
            }));
            console.log(response?.data?.data?.output);

        } catch (error) {
            console.log(error.response);
        }
    };

    const handleSubmit = async (problemId) => {
        console.log(interviewId, problemId);
        const currentCode = codeMap[problemId] || "";
        const currentLanguage = languageMap[problemId];
        try {
            const response = await apiClient.post(`problem-solving/interview/${interviewId}/problem/${problemId}/submit`, {
                code: currentCode ? currentCode : "no code",
                language: currentLanguage.value,
                version: currentLanguage.version
            });
            console.log(response);
            if (response.status === 200) {
                toast.success("Submitted! You can submit again if needed.")
                // setResults(response.data.data.results)
                setResults(response.data.data)
            }
            // setOutput(response?.data?.data?.output)
        } catch (error) {
            console.log(error.response);
            toast.error("Something Went Wrong")
        }
        // }
    };

    useEffect(() => {
        if (problems.length > 0 && problems[0].languages) {
            const langs = problems[0].languages.map(lang => ({
                value: lang.language,
                label: `${lang.language} (v${lang.version})`,
                version: lang.version,
            }));
            setlanguageOptions(langs);
            // setLanguage(langs[0]);

            // Load previously written code for this problem
            const currentProblemId = problems[0].id;
            setCodeMap((prev) => ({
                ...prev,
                [currentProblemId]: prev[currentProblemId] || "",  // fallback to empty string
            }));
            setLanguageMap((prev) => ({
                ...prev,
                [currentProblemId]: prev[currentProblemId] || langs[0], // default to first language
            }));
        }
    }, [problems]);


    async function submitInterview(id) {
        console.log("submitInterview");

        const result = await Swal.fire({
            title: "Are You Sure You Want to Submit Interview?",
            text: "You Won't Be Able to Edit This Answers After Submission",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes Do It",
            cancelButtonText: "No, Cancel",
            customClass: {
                confirmButton: '!bg-[#2E5077] text-white hover:bg-[#e68b10] px-4 py-2 rounded',
                cancelButton: '!bg-[#d33] text-white hover:bg-red-700 px-4 py-2 rounded ms-2',
            },
            buttonsStyling: false
        })
        if (result.isConfirmed) {
            console.log("confirmed");
            try {
                const response = await apiClient.post(`InterviewQuestions/${id}/submit`)
                console.log(response, "interview submitted");
                if (response.status === 200) {
                    toast.success("Interview Submitted Successfully")
                    setTimeout(() => {
                        navigate('/Report', { state: { data: response.data } })
                    }, 1000);
                }
            } catch (error) {
                console.log(error.response);
                toast.error(error.response.data.message)
            }
        }
    }

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber)
        getProblems(pageNumber)
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };


    return (
        <div>
            <ToastContainer position="bottom-right" autoClose={300} />
            <div className="flex flex-col justify- items- px-5 md:px-15 py-5">
                {/* paginations */}
                {paginationData && (
                    <div className="mt-10 mb-8 w-full">
                        <div className="flex flex-col md:flex-row md:justify-between  gap-4 flex-wrap bg-white py-4 px-6 rounded-xl shadow-lg bg-gradient-to-r from-[var(--dark-blue)] to-[var(--teal-blue)]">
                            <div className="flex justify-center items-center flex-wrap gap-4">
                                {[...Array(paginationData.total)].map((_, index) => (
                                    <>

                                        <button
                                            key={index}
                                            onClick={() => handlePagination(index + 1)}
                                            className={`min-w-[100px] px-6 py-3 rounded-full text-base font-semibold transition duration-300
                                             ${currentPage === index + 1
                                                    ? 'bg-[#4DA1A9] text-white shadow-md scale-105'
                                                    : 'bg-[#F4F4F4] text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            🚀 Problem {index + 1}
                                        </button>
                                    </>
                                ))}
                            </div>
                            {/* submit button */}
                            <button
                                type="button"
                                className="self-center md:self-end bg-[#152a4c] text-white px-6 py-3 rounded-4xl font-bold transform transition duration-300 hover:scale-105 ease-in-out"
                                onClick={() => {
                                    submitInterview(interviewId)
                                }}
                            >
                                Submit Interview
                            </button>
                        </div>
                    </div>
                )}

                {/* timer */}
                <div className="flex justify-center items-center ">
                    <CountdownCircleTimer
                        isPlaying
                        duration={remainingTime}
                        colors="#4DA1A9"
                        trailColor="#eee"
                        strokeWidth={13}
                        size={120}
                    >
                        {({ remainingTime }) => {
                            setTimeout(() => setTimeLeft(remainingTime), 0)
                            return (
                                <>
                                    <div style={{ fontSize: "20px", color: "#333" }}>
                                        {formatTime(remainingTime)}
                                    </div>
                                </>
                            )

                        }}
                    </CountdownCircleTimer >
                </div >
            </div>

            {/* problems */}
            {problems.length > 0 ? problems?.map((problem, index) => (
                <div key={problem.id} className="flex flex-col gap-5 px-5 md:px-15 py-10">
                    <div className="grid lg:grid-cols-2 gap-5 w-full">
                        <div className="flex flex-col gap-6">
                            {/* language */}
                            <div className="flex items-center gap-3">
                                <p>Language:</p>
                                <Select
                                    options={languageOptions}
                                    value={languageMap[problem.id]}
                                    onChange={(selectedLang) =>
                                        setLanguageMap((prev) => ({
                                            ...prev,
                                            [problem.id]: selectedLang,
                                        }))
                                    } styles={{ container: (base) => ({ ...base, width: 200 }) }}
                                />
                            </div>
                            <div className="flex">
                                {/* title */}
                                <p className="font-semibold">{problem.title}</p>
                                {/* difficulty */}
                                {problem.difficulty == 1 ? (
                                    <p className="bg-green-100 text-green-800 px-2 rounded-lg ms-2 font-medium">EASY</p>
                                ) : problem.difficulty == 2 ? (
                                    < p className="bg-yellow-100 text-yellow-800 px-2 rounded-lg ms-2 font-medium">MEDIUM</p>
                                ) : problem.difficulty == 3 ? (
                                    < p className="bg-red-100 text-red-800 px-2 rounded-lg ms-2 font-medium">Hard</p>
                                ) : null}
                            </div>
                            <p className="text-gray-800">{problem.description}</p>
                            {/* constraints */}
                            <div className="flex flex-col gap-4">
                                <p className="text-gray-800 font-semibold">Constraints</p>
                                <div className="flex flex-col md:flex-row flex-wrap gap-3">
                                    {problem.constraints.split("\n").map((constraint, index) => (
                                        <p key={index} className="text-gray-800 bg-[#EEF4FC] border border-[#E1E8F0] rounded-xl px-3 py-2">{constraint}</p>
                                    ))}
                                </div>
                            </div>
                            {/* Example */}
                            <div className="flex flex-col gap-4">
                                <p className="text-gray-800 font-semibold">Example</p>
                                <div className="flex flex-col gap-2">
                                    <p className="text-gray-500">Input</p>
                                    <div className="flex flex-wrap gap-3">
                                        <p key={index} className="text-gray-800 bg-[#EEF4FC] border border-[#E1E8F0] rounded-xl px-3 py-2">{problem.sampleInput}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-gray-500">Output</p>
                                    <div className="flex flex-wrap gap-3">
                                        <p key={index} className="text-gray-800 bg-[#EEF4FC] border border-[#E1E8F0] rounded-xl px-3 py-2">{problem.sampleOutput}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex justify-end gap-3 ">
                                <button onClick={toggleTheme} className="ml-4 text-sm px-1 md:px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                                    {theme === "vs-dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
                                </button>
                                <button onClick={() => handleRun(problem.id)} className="border border-green-500 text-green-700 px-1 md:px-3 py-1.5 rounded-md hover:bg-green-50 transition">
                                    Run Code
                                </button>
                                <button onClick={() => handleSubmit(problem.id)} className="border border-blue-500 text-blue-700 px-1 md:px-3 py-1.5 rounded-md hover:bg-blue-50 transition">
                                    Submit
                                </button>
                            </div>
                            <Editor
                                className="rounded-xl shadow-md border border-gray-300 h-full min-h-[40vh]"
                                defaultLanguage={language.value}
                                value={codeMap[problem.id] || ""}
                                onChange={(value) =>
                                    setCodeMap((prev) => ({
                                        ...prev,
                                        [problem.id]: value,
                                    }))
                                }
                                theme={theme}
                                options={{
                                    fontSize: 14,
                                    lineNumbers: "on",
                                    minimap: { enabled: false }, // cleaner look
                                    scrollBeyondLastLine: false,
                                    wordWrap: "on",
                                    automaticLayout: true, // adapts to container

                                    // added options from your JSON:
                                    autoClosingBrackets: "languageDefined",
                                    autoClosingQuotes: "languageDefined",
                                    autoIndent: "full",
                                    formatOnPaste: true,
                                    formatOnType: true,
                                    cursorBlinking: "blink",
                                    smoothScrolling: true,
                                    glyphMargin: true,
                                    folding: true,
                                    foldingHighlight: true,
                                    highlightActiveIndentation: true,
                                    bracketPairColorization: true,
                                    renderLineHighlight: "line",
                                    renderWhitespace: "selection",
                                    suggestOnTriggerCharacters: true,
                                    quickSuggestions: {
                                        other: "on",
                                        comments: "off",
                                        strings: "off",
                                    },
                                    wordSeparators: "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?",
                                    inlayHints: {
                                        enabled: "on",
                                    },
                                }}
                            />
                        </div>

                    </div>
                    {/* output display */}
                    < div className="mt-4 mb-10" >
                        <h3 className="font-bold mb-3">Output:</h3>
                        <pre className="bg-gray-100 p-4 rounded shadow text-sm whitespace-pre-wrap">
                            {outputMap[problem.id] ? outputMap[problem.id] : "Run To See Output"}
                        </pre>
                    </div >
                </div >
            ))
                : <Loader />
            }

            {/* {
                results && results?.results?.length > 0 ? (
                    <div className="flex flex-col gap-4 px-5 md:px-15 pb-10">
                        <p className="text-3xl font-semibold text-center ">Test Cases</p>
                        <p className="bg-red-600 text-white py-2 px-3 w-fit rounded-sm">Answer: {results.passed}/{results.total}</p>
                        <div className="grid grid-cols-2 gap-6">
                            {results.results?.map((result, index) => (
                                <div key={index} className="bg-gray-100 p-4 rounded shadow relative border border-red-600">
                                    <p className="absolute -top-[1px] p-0 right-10 bg-white w-fit py-2 px-5 rounded-b-3xl border-s border-e border-b border-red-600">{result.status}</p>
                                    <div className="grid sm:grid-cols-2 items-center gap-6 py-10 lg:py-0">
                                        <div>
                                            <p className="text-sm text-gray-500">Input</p>
                                            <p className="font-mono text-gray-800">{result?.input || "No Input"}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Output</p>
                                            <p className="font-mono text-gray-800">{result.output || "No Output"}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Expected</p>
                                            <p className="font-mono text-gray-800">{result.expected || "No Expect Result"}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Actual</p>
                                            <p className="font-mono text-gray-800">{result.actual || "No Actual"}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Memory</p>
                                            <p className="font-mono text-gray-800">{result.memory || "No Memory"}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Time</p>
                                            <p className="font-mono text-gray-800">{result.time || "No Time"}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null
            } */}

        </div >
    );
}
