import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../userContext";
import InputBox from "../InputBox";

const initialValues = {
  email: "sanoof",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please Enter Valid Email")
    .required("Please Enter Your Email Address"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Please Enter Your Password"),
});

const LoginForm = ({ setIsLogin }) => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await axios.get("http://localhost:3000/users");
      const admin = data.find(
        (user) =>
          values.email === user.email &&
          values.password === user.password &&
          user.email === "admin@gmail.com" &&
          user.password === "123456"
      );

      const user = data.find(
        (user) =>
          values.email === user.email &&
          values.password === user.password &&
          user.status === "active"
      );

      const blockedUser = data.find(
        (user) =>
          values.email === user.email &&
          values.password === user.password &&
          user.status === "blocked"
      );

      if (admin) {
        toast.success("Welcome Admin");
        localStorage.setItem("id", admin.id);
        setUser(admin);
        navigate("/dash");
      } else if (user) {
        toast.success("Login Successful");
        localStorage.setItem("id", user.id);
        setUser(user);
        setTimeout(() => navigate("/"), 1000);
      } else if (blockedUser) {
        toast.error("You are Blocked By Admin");
      } else {
        toast.error("Invalid Email or Password");
      }
    } catch (err) {
      console.error(err);
      toast.error("Login Failed");
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
    {({ isSubmitting, errors }) => (
      <Form className="w-full animate-fade-in">
        <h1 className="text-4xl font-bold mb-6">Login</h1>
        <InputBox type="email" name="email" placeholder="Email" icon="bxs-envelope" />
        {errors.email && <small>{errors.name}</small>}
        <InputBox type="password" name="password" placeholder="Password" icon="bxs-lock-alt" />
        <button
          type="submit"
          className="btn cursor-pointer w-full bg-stone-500 text-white rounded-lg font-semibold hover:bg-stone-300 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Login"}
        </button>
      </Form>
    )}
  </Formik>
  );
};

export default LoginForm;
