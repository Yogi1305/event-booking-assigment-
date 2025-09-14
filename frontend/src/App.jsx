
import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"

import Home from "./component/Home"
import Login from "./component/Login"
import BookingPage from "./component/BookingPage"
import MyBookingPage from "./component/MyBookingPage"
import Register from "./component/Register"
import CreateEvent from "./component/CreateEvent"
import Navbar from "./component/Navbar"
import { Outlet } from "react-router-dom"


const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Outlet />
      </div>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { path: "/home", element: <Home/> },
      { path: "/login", element: <Login /> },
      { path: "/booking/:eventId", element: <BookingPage /> },
      { path: "/mybooking", element: <MyBookingPage /> },
      { path: "/register", element: <Register /> },
      { path: "/createevent", element: <CreateEvent /> },
    ],
  },
])

function App() {
  return (
    <div className="w-screen h-screen">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
