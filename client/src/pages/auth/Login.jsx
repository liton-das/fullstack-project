import React, { useState } from "react";
import Loading from "../../components/ui/Loading";
import Inputs from "../../components/ui/Inputs";
import Button from "../../components/ui/Button";
import { useLoginMutation } from "../../services/api/api";
import { useNavigate } from "react-router";
import showMsg from "../../utils/getMessage";
const INITIAL_VALUE = {
  email: "",
  password: "",
};
const Login = () => {
  const [inputField, setInputField] = useState({ ...INITIAL_VALUE });
  const [login, { data, isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  if (isLoading) return <Loading />;
  const changehandler = (e) => {
    setInputField((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login(inputField).unwrap();
      showMsg.success(res?.data?.message);
      if (res?.success) {
        navigate("/dashboard");
      }
      setInputField(INITIAL_VALUE);
    } catch (e) {
      showMsg.error(e?.data?.message);
    }
  };
  return (
    <>
      <div className="bg-slate-100 w-full h-screen flex justify-center items-center">
        <div className="bg-white shadow-sm rounded-lg w-120 py-5">
          <h1 className="text-center text-2xl font-medium text-gray-800">Login</h1>
          <form onSubmit={submitHandler} className="px-8 mt-2 flex flex-col gap-2">
            <Inputs
              label={"Email"}
              type={"email"}
              placeholder={"Enter your valid email!"}
              name={"email"}
              value={inputField.email}
              onChange={changehandler}
            />
            <Inputs
              label={"Password"}
              type={"password"}
              placeholder={"Enter your valid password!"}
              name={"password"}
              value={inputField.otp}
              onChange={changehandler}
            />
            <Button children={"Submit"} type={"submit"} variant={"primary"} />
          <div className="flex flex-col gap-0.5">
            <p className="text-[13px] font-semibold ">Forgot Password? <a className="text-[13px] font-semibold text-violet-500" href="">Reset Password</a></p>
            <p className="text-[13px] font-semibold ">Don't Have An Account? <a className="text-[13px] font-semibold text-violet-500" href="/register">Register Here</a></p>
          </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
