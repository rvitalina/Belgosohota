import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PermissionsTable from './components/PermissionsTable'
import MainNavigation from './components/MainNavigation'
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HunterProfile from './pages/HunterProfile'
import News from './pages/News'
import RegistrationPage from './pages/RegistrationPage'

const router = createBrowserRouter([
  {
    path: "/", element: <MainNavigation />, children: [
      { path: "/registration", element: <RegistrationPage /> },
      { path: "/permissions_to_buy", element: <PermissionsTable /> },
      { path: '/hunter/profile', element: <HunterProfile/> }, 
      {path: '/news', element: <News/>}
    ]
  }
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}
