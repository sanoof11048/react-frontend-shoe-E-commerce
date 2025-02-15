import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

export default function Contact() {
  const formik = useFormik({
    initialValues: {
      name: "",
      number: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters"),
      number: Yup.string()
        .matches(/^[0-9]+$/, "Phone Number must be numeric")
        .required("Phone Number is required")
        .min(10, "Phone Number Must be 10 Digits")
        .max(10, "Phone Number Must be 10 Digits"),
      message: Yup.string()
        .required("Message is required")
        .min(10, "Message must be at least 10 characters"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const formDataSend = new FormData();

      formDataSend.append("name", values.name);
      formDataSend.append("number", values.number);
      formDataSend.append("message", values.message);

      try {
        Swal.fire({
          title: "Loading...",
          text: "Please wait while we fetch the data.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbyRtalwDkFUXHycXDF5VrMVxuc95T6ahWwwutlW5qKvOxC2ObT2lZifTbPLw_nPCnGm/exec",
          // "https://script.google.com/macros/s/AKfycbxsdxL0fooufrcqwW5VEGSAgVWtYexmV-CoUguotifyETrOZJbU6j4HQ7C8HOjF6Gs/exec",
          {
            method: "POST",
            body: formDataSend,
          }
        );

        if (response.ok) {
          Swal.fire({
            title: "Success!",
            text: "Form submitted successfully",
            icon: "success",
            confirmButtonText: "OK",
            timer: 2000,
          });
        } else {
          throw new Error("Failed to submit form");
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong while submitting the form. Please try again later.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    },
  });

  return (
    <div
      id="contact"
      className="bg-[#0d0d2b] min-h-screen flex flex-col items-center py-10"
    >
      <div className="w-full max-w-4xl flex flex-col items-center">
        <h1 className="text-4xl text-white font-bold mb-4">
          Get in touch with us
        </h1>
        <p className="text-gray-400 text-center mb-8">
          We invite you to contact us for further assistance.
        </p>
      </div>

      <div
        style={{
          backgroundImage: `url("https://cdn.pixabay.com/photo/2019/08/30/06/03/telephone-4440525_1280.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="bg-white p-6 rounded-2xl shadow-md max-w-4xl md:w-full  flex flex-col md:flex-row"
      >
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4">
          {/* <img src="https://cdn.pixabay.com/photo/2019/08/30/06/03/telephone-4440525_1280.jpg" alt="Placeholder" className="rounded-lg shadow-lg mb-4 w-full" /> */}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission
            formik.handleSubmit();
          }}
          className="w-full md:w-1/2 flex flex-col space-y-4 md:p-4"
        >
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your name here"
              className={` p-3 rounded-lg border-0 bg-gray-2 focus:ring-none focus:outline-none md:w-full w-fit`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-xs font-semibold">
                {formik.errors.name}
              </div>
            ) : null}
          </div>

          <div>
            <input
              type="text"
              name="number"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Your Phone Number here"
              className={`p-3 rounded-lg border-0 focus:ring-none bg-gray-2  focus:outline-none md:w-full w-fit`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.number}
            />
            {formik.touched.number && formik.errors.number ? (
              <div className="text-red-400 text-xs font-semibold">
                {formik.errors.number}
              </div>
            ) : null}
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Your message here"
              className={`p-3 rounded-lg border-0 focus:ring-none bg-gray-2  focus:outline-none w-fit md:w-full h-32`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
            ></textarea>
            {formik.touched.message && formik.errors.message ? (
              <div className="text-red-500 text-xs font-semibold">
                {formik.errors.message}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none transition"
          >
            Send message
          </button>
        </form>
      </div>

      <div className="w-full max-w-4xl mt-10 text-center text-gray-400">
        <p>&copy; All Rights Reserved. ADOTZEE</p>
      </div>

      <div className="flex space-x-3 mt-4 ">
        <a
          href="https://www.facebook.com/share/1WeqyuRjTd/?mibextid=wwXIfr"
          rel="noopener noreferrer"
          target="_blank"
          className="group flex decoration-none  bg-blue-600 rounded-full p-2 items-center  shadow-md hover:bg-blue-700 transition-all duration-300 overflow-hidden w-8 h-8 hover:w-32"
        >
          <i className="fab fa-facebook text-white text-2xl ml-1.5"></i>
          <span className="ml-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            Connect
          </span>
        </a>

        <a
          rel="noopener noreferrer"
          href="https://www.instagram.com/adotzee.inn"
          target="_blank"
          className="group flex items-center decoration-none bg-blue-500 rounded-full p-2 shadow-md hover:bg-blue-600 transition-all duration-300 overflow-hidden w-8 h-8 hover:w-32"
        >
          <i className="fab fa-instagram text-white text-2xl ml-1.5"></i>
          <span className="ml-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            Connect
          </span>
        </a>

        <a
          href={`https://wa.me/918281060462?text=${encodeURIComponent(
            "Hello! I Need Admission"
          )}`}
          rel="noopener noreferrer"
          target="_blank"
          className="group decoration-none flex items-center bg-blue-600 rounded-full p-2 shadow-md hover:bg-blue-600 transition-all duration-300 overflow-hidden w-8 h-8 hover:w-32"
        >
          <i className="fa-brands fa-whatsapp text-white text-2xl ml-1.5"></i>
          <span className="ml-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            Connect
          </span>
        </a>
      </div>
    </div>
  );
}
