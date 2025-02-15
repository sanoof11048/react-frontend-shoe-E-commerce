import React, { useState } from "react";
import Footer from "./footer";
import toast from 'react-hot-toast';
import logo22 from "../assets/logo22.png";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";

function ContactForm() {
  const navigate = useNavigate();
  const notifyOk = () => toast("Thank you for your message!");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataSend = new FormData();

    formDataSend.append("name", formData.name);
    formDataSend.append("email", formData.email);
    formDataSend.append("subject", formData.subject);
    formDataSend.append("message", formData.message);
    try {
      const response = fetch(
        "https://script.google.com/macros/s/AKfycbwIrf3Z1oLRjVwSQPyXRuYC52T5kp3sRo6IuDMw20C64boxhDxvRNANoQWgX6V3zxpz/exec",
        {
          method: "POST",
          body: formDataSend,
        }
      );

      if (response.ok) {
        alert("Form submitted successfully");
        window.location.reload();
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }

    notifyOk();
  };

  return (
    <div>
      <div
        className="pb-10"
        style={{
          backgroundImage: `url("https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-cta-image-bg.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* <div  className=" w-auto flex items-center pt-7 ps-10  ">
          <img className="w-8 h-8 cursor-pointer" onClick={handleClick} src={logo22} />
          <h2 onClick={handleClick} className="font-bold cursor-pointer text-2xl ps-3 text-white font-sans tracking-widest">
            PLASHOE
          </h2>
        </div>  */}
        <Navbar />
        <h2 className="text-2xl font-bold text-white text-center mb-4 mt-4">
          Contact Us
        </h2>
        <p className="italic text-sm mb-3 text-gray-300">
          Feel free to Contact me by submitting the form below and we will get
          back to you as soon as possible
        </p>

        <div className=" text-gray-900 mb-20 max-w-md mx-auto bg-white/ backdrop-blur-sm p-8 rounded-lg shadow-md w-full mt-10 ">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
            
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className=" block w-full ps-4 px-2 py-1 border bg-gray-300 rounded-md focus:outline-none  "
              />
            </div>

            <div className="mb-3">
              
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className=" block w-full ps-4 px-2 py-1 border bg-gray-300 rounded-md focus:outline-none  "
              />
            </div>

            <div className="mb-3">
             
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className=" block w-full ps-4 px-2 py-1 border bg-gray-300 rounded-md focus:outline-none  "
              />
            </div>

            <div className="mb-3">
               
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows="4"
                className=" mb-5 block w-full ps-4 px-2 py-1 border bg-gray-300 rounded-md focus:outline-none  "
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="hover:bg-stone-500 bg-stone-300 text-stone-600  hover:text-white px-4 py-2 rounded"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>   

      <Footer />
    </div>
  );
}

export default ContactForm;
