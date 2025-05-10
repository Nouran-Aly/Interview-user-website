import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import Select from "react-select";

const languageOptions = [
    { value: "python", label: "Python" },
    { value: "cpp", label: "C++" },
    { value: "javascript", label: "JavaScript" },
    { value: "java", label: "Java" },
    // Add more as needed
];

const defaultCode = {
    python: "print('Hello, world!')",
    cpp: "#include <iostream>\nint main() { std::cout << \"Hello, world!\"; return 0; }",
    javascript: "console.log('Hello, world!');",
    java: "public class Main { public static void main(String[] args) { System.out.println(\"Hello, world!\"); } }",
};

export default function CodeQuestion({ onRunCode }) {
    const [language, setLanguage] = useState(languageOptions[0]);
    const [code, setCode] = useState(defaultCode[language.value]);
    const [theme, setTheme] = useState("vs-dark"); // Default theme

    const handleLanguageChange = (selected) => {
        setLanguage(selected);
        setCode(defaultCode[selected.value]); // Load default code
    };


    const toggleTheme = () => {
        // Toggle theme between 'vs-dark' and 'vs' (light theme)
        setTheme((prevTheme) => (prevTheme === "vs-dark" ? "vs" : "vs-dark"));
    };

    const handleRun = () => {
        // Call backend or parent handler
        onRunCode({ code, language: language.value });
    };

    return (
        <div>
            <div className="flex m-5">
                <Select
                    options={languageOptions}
                    value={language}
                    onChange={handleLanguageChange}
                    styles={{ container: (base) => ({ ...base, width: 200 }) }}
                />
                <button onClick={handleRun} className="ml-4">
                    Run Code
                </button>
                <button onClick={toggleTheme} className="ml-4">
                    Toggle Theme
                </button>
            </div>

            <Editor
                height="400px"
                defaultLanguage={language.value}
                value={code}
                onChange={(value) => setCode(value)}
                theme={theme}
                options={{
                    // fontSize,
                    lineNumbers: "on",
                }}
            />
        </div>
    );
}
