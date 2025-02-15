import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Formik, Form, Field } from "formik";
import Validation from "./Validation";
import axios from "axios";
import toast from 'react-hot-toast';
import Footer from "../Base/footer";
import sign from "../assets/sign.jpg";
import logo from "../assets/logo22.png";

const initialValues = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
  cart: [],
  orders: [],
  status:"active",
};

const SignUp = () => {
  const notifySuccess = () => toast.success("SignUp Completed");
  const notifyError = () => toast.error("SignUp Completed Not");
  const notiftySame = ()=> toast.error("User Already Exist")

  const navigate = useNavigate();

  return (
    <div className="overflow-hidden">
      <div
        className=" pb-20"
        style={{
          backgroundImage: `url(${sign})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="float-start w-full flex items-center mt-5 ms-10 ">
          <img onClick={() => navigate("/")} className="w-8 h-8" src={logo} />
          <h2
            onClick={() => navigate("/")}
            className="font-bold text-2xl ps-3 font-sans tracking-widest"
          >
            PLASHOE
          </h2>
        </div>
        <h1 className="text-5xl font-bold  mb-3 text-center text-gray-800">
          Sign Up
        </h1>
        <p className="italic text-gray-600 mb-5">
          Your adventure begins here. Let's get started!
        </p>

        <div className="max-w-lg mx-auto bg-white/ backdrop-blur-sm p-8 rounded-lg shadow-md w-full">
          <Formik
            validationSchema={Validation}
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              axios.get("http://localhost:3000/users").then((res) => {
                const checkData = res.data.find(
                  (item) => item.email === values.email
                );
                if (checkData) {
                  notiftySame()
                }
                else{
                  axios
                  .post("http://localhost:3000/users", values)
                  .then(() => {
                    setSubmitting(false);
                    notifySuccess();
                    setTimeout(() => {
                      navigate("/login");
                    }, 2000);
                  })
                  .catch((err) => {
                    notifyError();
                    console.log(err);
                    setSubmitting(false);
                  });
                }
              });

              
            }}
          >
            {({ errors }) => (
              <Form>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Field
                      placeholder="Enter your username"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0"
                      type="text"
                      name="name"
                      
                    ></Field>
                    {errors.name && <small>{errors.name}</small>}
                  </div>

                  <div>
                   
              
                    <Field
                    placeholder="Enter Email Address"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0"
                      type="email"
                      name="email"
                    ></Field>
                    {errors.email && <small>{errors.email}</small>}
                  </div>

                  <div>
                   
                    <Field
                    placeholder="Password"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0"
                      type="password"
                      name="password"
                    ></Field>
                    {errors.password && <small>{errors.password}</small>}
                  </div>

                  <div>
                    {/* <label className="block text-sm font-medium text-gray-700"></label> */}
                    <Field
                     placeholder="Confirm Password"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0"
                      type="password"
                      name="cpassword"
                    ></Field>
                    {errors.cpassword && <small>{errors.cpassword}</small>}
                  </div>

                  <div>
                    <a
                      onClick={() => {
                        navigate("/login");
                      }}
                      className="cursor-pointer text-sm mb-5 pb-5 text-gray-900 hover:text-white"
                    >
                      Already Have a Account?
                    </a>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full py-2 px-4 cursor-pointer text-white bg-gray-800 hover:bg-gray-900 focus:outline-none   font-medium rounded-lg text-sm  dark:bg-gray-800 dark:hover:bg-gray-700  hover:text-gray-300 "
                    >
                      Register
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
