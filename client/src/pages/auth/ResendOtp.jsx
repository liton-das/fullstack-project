import React, { useState } from 'react'
import Inputs from '../../components/ui/Inputs'
import Button from '../../components/ui/Button'
import { useResendOtpMutation } from '../../services/api/api'
import Loading from '../../components/ui/Loading'
import showMsg from '../../utils/getMessage'
import { useNavigate } from 'react-router'
const INITIAL_VALUE ={
    email:''
}
const ResendOtp = () => {
const [inputField,setInputField]=useState({...INITIAL_VALUE})
const [resendOtp,{isError,isLoading}]=useResendOtpMutation()
const navigate = useNavigate()
if(isLoading) return <Loading/>
// changeHandler 
const changehandler=(e)=>{
    setInputField((prev)=>({
        ...prev,
        [e.target.name]:e.target.value
    }))
}
// submitHandler 
const submitHandler=async(e)=>{
    e.preventDefault()
    try {
        const res = await resendOtp(inputField).unwrap()
        showMsg.success(res?.message)
        navigate('/verify-otp')
    } catch (e) {
        showMsg.error(e?.data?.message)
    }
}
  return (
    <>
      <div className="bg-slate-100 w-full h-screen flex justify-center items-center">
            <div className="bg-white shadow-sm rounded-lg w-120 py-5">
              <h1 className="text-center text-2xl font-medium text-gray-800">Verify Otp</h1>
              <form onSubmit={submitHandler} className="px-8 mt-2 flex flex-col gap-2">
                <Inputs
                  label={"Email"}
                  type={"email"}
                  placeholder={"Enter your valid email!"}
                  name={"email"}
                  value={inputField.email}
                  onChange={changehandler}
                />
                <Button children={"Submit"} type={"submit"} variant={"primary"} />
                <div className="flex flex-col gap-0.5">
                  <p className="text-[13px] font-semibold ">
                    Already Verifyed?{" "}
                    <a className="text-[13px] font-semibold text-violet-500" href="/login">
                      Login Here
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
    </>
  )
}

export default ResendOtp
