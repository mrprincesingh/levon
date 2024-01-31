import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import Home from '../component/Home/Home'
import Login from '../component/Login/Login'
import Signup from '../component/signUp/Signup'
import Student from '../component/Student/Student'
import Teacher from '../component/teacher/Teacher'
import ReqAuth from './ReqAuh'



const MainRoute = () => {
  return (
  <Routes>
          <Route path="/" element={ <Home />} /> 
          <Route path="/login" element={ <Login />} /> 
          <Route path="/signup" element={ <Signup />} /> 
          <Route path="/student" element={ 
            <Student />
          } /> 
          <Route path="/teacher" element={ 
            <Teacher />
         } /> 
  </Routes>
  )
}

export default MainRoute