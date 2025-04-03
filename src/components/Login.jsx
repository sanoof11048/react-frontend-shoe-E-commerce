import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";
import axios from "axios";
import * as Yup from "yup";
import Footer from "../Base/footer";
import bgshoe from "../assets/bg-shoe.jpg";
import logo22 from "../assets/logo22.png";
import { useUser } from "./userContext";

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const ValidationLogin = Yup.object({
    email: Yup.string()
      .email("Please Enter Valid Email")
      .required("Please Enter Your Email Address"),
    password: Yup.string().min(6).required("Please Enter 6 Characters"),
  });
  return (
    <div className="overflow-hidden">
      <div
        className="pb-20"
        style={{
          backgroundImage: `url(${bgshoe})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="float-start w-full flex items-center mt-5 ms-10 ">
          <img className="w-8 h-8" src={logo22} />
          <h2 className="font-bold text-2xl ps-3 font-sans tracking-widest">
            PLASHOE
          </h2>
        </div>
        <h2 className="text-2xl font-bold  mb-5 text-center">Log In </h2>
        <p className="mb-5 text-center italic text-gray-700">
          "Step into a world of style and comfort – your perfect pair is just a
          login away."
        </p>
        <div className=" max-w-lg mx-auto bg-white/ backdrop-blur-md p-8 rounded-lg shadow-md w-full mt-10 ">
          <Formik
            validationSchema={ValidationLogin}
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              axios
                .get("http://localhost:3000/users")
                .then((res) => {
                  console.log(res)
                  const adminData = res.data.find(
                    (user) =>
                      values.email === user.email &&
                      values.password === user.password &&
                      values.email === "admin@gmail.com" &&
                      values.password === "123456"
                  );
                  const userData = res.data.find(
                    (user) =>
                      values.email === user.email &&
                      values.password === user.password &&
                      user.status === "active"
                  );
                  const errData = res.data.find(
                    (user) =>
                      values.email === user.email &&
                      values.password !== user.password
                  );
                  const blockedUser = res.data.find(
                    (user)=>
                      values.email === user.email &&
                      values.password === user.password &&
                      user.status==="blocked"
                    
                  );

                  if (adminData) {
                    toast.success("welcome admin");
                    localStorage.setItem("id", adminData.id);
                    setUser(adminData)
                    console.log("admin")
                    console.log(adminData.id)
                    navigate("/dash")
                  } else if (userData) {
                    toast.success("Login Success");
                    localStorage.setItem("id", userData.id);
                    console.log(userData)
                    setUser(userData)
                    setTimeout(() => {
                      navigate("/");
                    }, 1000);
                  } else if (errData) {
                    toast.error("Invalid Password");
            
                  }
                  else if (blockedUser) {
                    toast.error("You are Blocked By Admin");
            
                  } else {
                    toast("OOPS! You don't have an account", {
                      icon: "😬",
                    });
                  }
                  setSubmitting(false);
                })
                .catch((err) => {
                  console.log(err);
                  setSubmitting(false);
                  toast.error("Invalid Email or Password");
                });

            }}
          >
            {({ errors }) => (
              <Form>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-sm font-medium float-start text-white mb-1">
                      E-mail Adderss
                    </label>
                    <Field
                      type="email"
                      name="email"
                      //   placeholder="Enter Your Email Address"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0"
                    ></Field>
                    {errors.email && <small>{errors.email}</small>}
                  </div>

                  <div>
                    <label className=" text-sm font-medium float-start text-white">
                      Enter the Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      //   placeholder="Enter the Password"
                      className="mt-1 block w-full px-4 py-2 border 
                rounded-md focus:outline-none focus:ring-0"
                    ></Field>
                    {errors.password && <small>{errors.password}</small>}
                  </div>
                  <div>
                    <a
                      onClick={() => {
                        navigate("/signUp");
                      }}
                      className="cursor-pointer text-sm mb-5 pb-5 text-white hover:text-gray-800 focus:outline-none focus:ring-0"
                    >
                      Need to Create a Account?
                    </a>
                    <button
                      type="submit"
                      className="w-full py-2 px-4 mt-3 cursor-pointer bg-black text-white rounded-md  focus:outline-none "
                    >
                      Login
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
}

export default Login;
