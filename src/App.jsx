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

function App() {
  let routes = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { path: "", element: <Home /> },
        { path: "prefrences", element: <Prefrences /> },
        { path: "WelcomePage", element: <WelcomePage /> },
        { path: "Guidelines-and-tips", element: <GuidelinesAndTips /> },
        { path: "Begin-Interview", element: <BeginInterview /> },
        { path: "interview", element: <Interview /> }
      ],
    },

  ])

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>


    </>
  )
}

export default App
