import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EmployeeForm from './components/EmployeeForm'
import AllEmployees from './components/AllEmployes'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import AddPosition from './components/AddPosition'
import Positions from './components/Positions'
import SignInSide from './components/SignIn'
import Login from './components/Login'
function App() {
  
  return (
    <>
       <BrowserRouter>
          <Routes>
            <Route path="/allEmployee" element={<AllEmployees />} ></Route>
            <Route path="/formEmployee" element={<EmployeeForm />}></Route>
            <Route path="/position" element={<Positions />}></Route>
            <Route path="/" element={<SignInSide />} ></Route>
          </Routes>
          <Outlet />
        </BrowserRouter>
    </>
  )
}

export default App
