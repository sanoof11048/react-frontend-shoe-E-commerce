import React, { useState } from "react";
import "boxicons/css/boxicons.min.css";
import LoginForm from "./features/LoginForm";
import SignUpForm from "./features/SignUpForm";
import './SignUp_LogIn_Form.css'

const LoginSignup = () => {
  const [isActive, setIsActive] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-screen  h-screen flex justify-center items-center">
  
    <div
      className={`containerF  relative w-3/5 h-5/6  bg-white m-5 rounded-3xl shadow-lg overflow-hidden transition-all duration-700 ${isActive ? "active" : ""
        }`}
    >
      {/* Login Form */}
      <div
        className={`form-box absolute top-0 right-0 w-1/2 h-full bg-white flex flex-col justify-center items-center text-center p-10 transition-all duration-700 transform ${isActive ? "translate-x-full" : "translate-x-0"
          }`}
      >
        {isLogin ? (
          <LoginForm setIsLogin={setIsLogin} />
        ) : (
          <SignUpForm setIsLogin={setIsLogin} />
        )}
      </div>

      {/* Registration Form */}
      <div
        className={`form-box register absolute top-0 left-0 w-1/2 h-full bg-white flex flex-col justify-center items-center text-center p-10 transition-all duration-700 transform ${isActive ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {isLogin ? (
          <LoginForm setIsLogin={setIsLogin} />
        ) : (
          <SignUpForm setIsLogin={setIsLogin} setIsActive={setIsActive}  />
        )}
      </div>

      {/* Toggle Box */}
      <div className="toggle-box absolute w-full h-full">
        <div
          className={`toggle-panel toggle-top md:toggle-left absolute w-1/2 h-full flex flex-col justify-center items-center text-white transition-all duration-700 ${isActive ? "-translate-x-full" : "translate-x-0"
            }`}
        >
          <h1 className="text-3xl text-stone-500 font-bold mb-2">Welcome Back!</h1>          
          <p className="mb-5 text-stone-400">Don't have an account?</p>
          <button
            onClick={() => {
              setIsActive(true);
              setTimeout(() => {
                setIsLogin((prev) => !prev);
              }, 700)
            }}
            className="btn w-40 h-12 bg-transparent border-2 border-white hover:border-stone-500 text-stone-500 rounded-lg hover:bg-white hover:text-gray-500 transition"
          >
            Register
          </button>
        </div>
        <div
          className={`toggle-panel toggle-right absolute right-0 w-1/2 h-full flex flex-col justify-center items-center text-white  transition-all duration-700 ${isActive ? "translate-x-0" : "translate-x-full"
            }`}
        >

          <h1 className="text-3xl text-stone-500 font-bold mb-2">Hello, Welcome!</h1>
          <p className="mb-5 text-stone-400">Already have an account?</p>
          <button
            onClick={() => {
              setIsActive(false);
              setTimeout(() => {
                setIsLogin((prev) => !prev);
              }, 700)
            }}
            className="btn w-40 h-12 bg-transparent border-2 border-white hover:border-stone-500 text-stone-500 rounded-lg hover:bg-white hover:text-gray-500 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginSignup;