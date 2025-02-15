import React from "react";
import Home1 from "../assets/home.jpg";
import { useNavigate } from "react-router";

function About() {
  const navigate = useNavigate();
  const toProducts = () => {
    navigate("/products");
  };
  return (
    <div>
      <section
        className=" bg-gray-100 text-center h-screen px-10 py-44"
        style={{
          backgroundImage: `url(${Home1})`,
          backgroundSize: "cover ",
          backgroundPosition: "center",
          backgroundRepeat: " no-repeat",
        }}
      >
        <div className=" text-center">
          <div className="  max-w-4xl m-auto  justify-center  text-center  ">
            <h2 className="text-3xl md:text-4xl font-bold mb-8  font-serif">
              Better for People & the Planet
            </h2>

            <p className="text-lg mb-8 mt-10 text-slate-900 font-sans font-extralight">
              We bring you top-quality, comfortable, and durable shoes that
              cater to your lifestyle and preferences. Whether you're on the go
              or dressing up, we have the perfect pair for you.
            </p>

            <button onClick={toProducts} className="bg-stone-500 mt-10 mb-10">
              Browse Products
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
