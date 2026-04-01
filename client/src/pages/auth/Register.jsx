import React, { useState } from 'react'
import Inputs from '../../components/ui/Inputs'
import { useRegisterMutation } from '../../services/api/api'
import Button from '../../components/ui/Button'
import Loading from '../../components/ui/Loading'
import { useNavigate } from 'react-router'
import showMsg from '../../utils/getMessage'
const INITIAL_VALUE = {
  fullName:'',
  phone:'',
  email:'',
  password:''
}
const Register = () => {
  const [inputField,setInputField]=useState({...INITIAL_VALUE})
  const [register,{data,isLoading}] = useRegisterMutation()
  const navigate = useNavigate()
  if(isLoading) return <Loading/>
  const changehandler=(e)=>{
    setInputField((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }
  const submitHandler=async(e)=>{
    e.preventDefault()
    try {
      const res=await register(inputField).unwrap()
      showMsg.success(res.message)
      navigate('/verify-otp')
    } catch (e) {
      showMsg.error(e.data.message)
    }
  }
  console.log(inputField)
  return (
    <div className='bg-slate-100 w-full h-screen flex justify-center items-center'>
      <div className='bg-white shadow-sm rounded-lg w-120 py-5'>
        <h1 className='text-center text-2xl'>Register Form</h1>
        <form onSubmit={submitHandler} className='px-8 mt-2 flex flex-col gap-2'>
          <Inputs
           label={'Full Name'}
            type={'text'}
            placeholder={'Enter your full Name!'}
            name={'fullName'}
            value={inputField.fullName}
            onChange={changehandler}
          />
          <Inputs
           label={'Email'}
            type={'email'}
            placeholder={'Enter your valid email!'}
            name={'email'}
            value={inputField.email}
            onChange={changehandler}
          />
          <Inputs
           label={'Phone'}
            type={'text'}
            placeholder={'Enter your phone number!'}
            name={'phone'}
            value={inputField.phone}
            onChange={changehandler}
          />
          <Inputs
           label={'Password'}
            type={'password'}
            placeholder={'Enter your password!'}
            name={'password'}
            value={inputField.password}
            onChange={changehandler}
          />
          <Button
            children={'Submit'}
            type={'submit'}
            variant={'primary'}
          />
          <div className="flex flex-col gap-0.5">
            <p className="text-[13px] font-semibold ">Already Register? <a className="text-[13px] font-semibold text-violet-500" href="/login">Login Here</a></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
