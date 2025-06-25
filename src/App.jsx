import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Prefrences from './Components/Interview/Prefrences'
import WelcomePage from './Components/Interview/WelcomePage'
import GuidelinesAndTips from './Components/Interview/GuidelinesAndTips'
import BeginInterview from './Components/Interview/BeginInterview'
import Interview from './Components/Interview/Interview'
import Registration from './Components/Authentication/Registration/Registration'
import Login from './Components/Authentication/Login/Login'
import Otp from './Components/Authentication/Otp/Otp'
import ForgetPassword from './Components/Authentication/ForgetPassword/ForgetPassword'
import VerifyOtp from './Components/Authentication/ForgetPassword/VerifyOtp'
import UpdatePassword from './Components/Authentication/ForgetPassword/UpdatePassword'
import CodeQuestion from './Components/Interview/CodeQuestion/CodeQuestion'
import CvGeneration from './Components/CvGeneration/CvGeneration'
import Report from './Components/Interview/Report/Report'
import Profile from './Components/Profile/Profile'
import DetailedReport from './Components/DetailedReport/DetailedReport'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import InterviewQuestions from './Components/Interview/InterviewQuestions/InterviewQuestions'
import Loader from './Components/Loader/Loader'
import Landing from './Components/ProblemSolving/Landing'
import DifficultySelection from './Components/ProblemSolving/DifficultySelection'
import ProblemSolvingInterview from './Components/ProblemSolving/ProblemSolvingInterview'

function App() {
  let routes = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { path: "register", element: <Registration /> },
        { path: "login", element: <Login /> },
        { path: "otp", element: <Otp /> },
        { path: "verify-otp", element: <VerifyOtp /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "updatePassword", element: <UpdatePassword /> },
        { path: "", element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: "home", element: <ProtectedRoutes><Home /> </ProtectedRoutes> },
        { path: "prefrences", element: <ProtectedRoutes><Prefrences /> </ProtectedRoutes> },
        { path: "WelcomePage", element: <ProtectedRoutes><WelcomePage /></ProtectedRoutes> },
        { path: "Guidelines-and-tips", element: <ProtectedRoutes><GuidelinesAndTips /></ProtectedRoutes> },
        { path: "Begin-Interview", element: <ProtectedRoutes><BeginInterview /> </ProtectedRoutes> },
        { path: "interview", element: <ProtectedRoutes><Interview /></ProtectedRoutes> },
        { path: "interviewq", element: <ProtectedRoutes><InterviewQuestions /></ProtectedRoutes> },
        { path: "Report", element: <ProtectedRoutes> <Report /> </ProtectedRoutes> },
        { path: "ProblemSolving", element: <CodeQuestion /> },
        { path: "Problem-Solving-Landing", element: <Landing /> },
        { path: "Problem-Solving-Interview", element: <ProblemSolvingInterview /> },
        { path: "DifficultySelection", element: <DifficultySelection /> },
        { path: "CV-generation", element: <ProtectedRoutes><CvGeneration /></ProtectedRoutes> },
        { path: "Profile", element: <ProtectedRoutes><Profile /> </ProtectedRoutes> },
        { path: "DetaildReport", element: <ProtectedRoutes><DetailedReport /></ProtectedRoutes> },

        { path: "dart", element: <Loader /> },

      ]
    },
    // {
    //   path: "", element: <Layout />, children: [
    //     { path: "home", element: <Home /> },
    //     { path: "prefrences", element: <Prefrences /> },
    //     { path: "WelcomePage", element: <WelcomePage /> },
    //     { path: "Guidelines-and-tips", element: <GuidelinesAndTips /> },
    //     { path: "Begin-Interview", element: <BeginInterview /> },
    //     { path: "interview", element: <Interview /> }
    //   ],
    // },

  ])

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>


    </>
  )
}

export default App
