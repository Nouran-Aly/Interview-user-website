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
        { path: "", element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "prefrences", element: <Prefrences /> },
        { path: "WelcomePage", element: <WelcomePage /> },
        { path: "Guidelines-and-tips", element: <GuidelinesAndTips /> },
        { path: "Begin-Interview", element: <BeginInterview /> },
        { path: "interview", element: <Interview /> },
        { path: "Report", element: <Report /> },
        // { path: "", element: <CodeQuestion /> },
        { path: "CV-generation", element: <CvGeneration /> },
        { path: "Profile", element: <Profile /> },
        { path: "DetaildReport", element: <DetailedReport /> },
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
