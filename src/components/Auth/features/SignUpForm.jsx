import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import InputBox from "../InputBox";

const initialValues = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
  cart: [],
  orders: [],
  status: "active",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "*Username must be at least 3 characters")
    .required("*Username is required"),
  email: Yup.string()
    .email("*Invalid email address")
    .required("*Email is required"),
  password: Yup.string()
    .min(6, "*Password must be at least 6 characters")
    .required("*Password is required"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "*Passwords must match")
    .required("*Confirm Password is required"),
});

const SignUpForm = ({ setIsLogin , setIsActive}) => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await axios.get("http://localhost:3000/users");
      const userExists = data.some((user) => user.email === values.email);

      if (userExists) {
        toast.error("User Already Exists");
      } else {
        await axios.post("http://localhost:3000/users", values);
        toast.success("SignUp Successful");
        setTimeout(() => {
          setIsActive(false);
              setTimeout(() => {
                setIsLogin((prev) => !prev);
              }, 700)
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      toast.error("SignUp Failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
  >
    {({ isSubmitting }) => (
      <Form className="w-full animate-fade-in">
        <h1 className="text-4xl font-bold mb-6">Registration</h1>
        <InputBox type="text" name="name" placeholder="Username" icon="bxs-user" />
        <InputBox type="email" name="email" placeholder="Email" icon="bxs-envelope" />
        <InputBox type="password" name="password" placeholder="Password" icon="bxs-lock-alt" />
        <InputBox
          type="password"
          name="cpassword"
          placeholder="Confirm Password"
          icon="bxs-lock-alt"
        />
        <button
          type="submit"
          className="btn cursor-pointer w-full bg-stone-500 text-white rounded-lg font-semibold hover:bg-stone-300 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Register"}
        </button>
      </Form>
    )}
  </Formik>
  );
};

export default SignUpForm;
