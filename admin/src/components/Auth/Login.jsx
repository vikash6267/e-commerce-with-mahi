import React, { useState } from 'react'
import { login } from '../../services/operarions/auth'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

function Login() {
const {email ,setEmail} = useState("vikasmaheshwari6267@gmail.com");
const {password, setpass} = useState("123456")
const dispatch = useDispatch()
const navigate = useNavigate()
 

  const submit = () =>{
    dispatch(login("vikasmaheshwari6267@gmail.com", "Vikash@123", navigate))
    
  } 
  return (
    <div
    className='h-screen w-screen flex justify-center items-center'>
    
    <button className='bg-red-500 p-5 rounded-2xl' onClick={submit}>
      Click to login
    </button>
    </div>

    
  )
}

export default Login