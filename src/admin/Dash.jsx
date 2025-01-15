import React, { useEffect, useState } from "react";
import SideDash from "./SideDash";
import AdminNav from "./AdminNav";
import { motion } from "framer-motion";
import { useUser } from "../components/userContext";
import bgimg from "../assets/adminalert.webp";
import { useNavigate } from "react-router";
import axios from "axios";

function Dash() {
  const [userData, setUserData] = useState(0);
  const [orderData, setOrderData] = useState(0);
  const [revenueData, setRevenueData] = useState(0);
  const navigate = useNavigate();

  const { user } = useUser();

  useEffect(() => {
    if (user && user.id === "1360") {
      axios
        .get("http://localhost:3000/users")
        .then((res) => {
          const users = res.data;
          const count = users.length;
          setUserData(count - 1);
          let orderCount=0
          users.map(
            (user) => orderCount += user.orders.length
          );
          setOrderData(orderCount);
          let revenue = 0
          users.map((user)=> {
            user.orders.map((order) => {
              // if (order.price) {
              console.log(order.price)
               revenue= revenue + order.price;
              // }
            });
            // return totalRevenue;
            setRevenueData(revenue);
          })
          
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);
  if (!user || user.id !== "1360") {
    return (
      <div className="flex w- justify-center  ">
        <img className="w-full h-full" src={bgimg} />
        <button
          className="absolute top-10 text-gray-500"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen  bg-gray-200"
      initial={{ opacity: 0 }} // Initial state (before the page appears)
      animate={{ opacity: 1 }} // Animate to full opacity
      exit={{ opacity: 0 }} // When the page exits, fade out
      transition={{ duration: 0.5 }}
    >
      <div className="flex min-h-screen">
        <div className="w-1/5 bg-gray-600 text-white">
          <SideDash />
        </div>

        <div className="w-full sm:w-4/5 bg-gray-100 flex flex-col">
          <div className="container mx-auto px-6 py-10 flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10">
              Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-teal-400 to-teal-600 p-6 rounded-xl text-white text-center hover:scale-105 transform transition">
                <h2 className="text-xl sm:text-2xl font-bold">Total Users</h2>
                <p className="text-3xl sm:text-4xl mt-4">{userData}</p>
              </div>

              <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-xl text-white text-center hover:scale-105 transform transition">
                <h2 className="text-xl sm:text-2xl font-bold">Total Orders</h2>
                <p className="text-3xl sm:text-4xl mt-4">{orderData}</p>
              </div>

              <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-xl text-white text-center hover:scale-105 transform transition">
                <h2 className="text-xl sm:text-2xl font-bold">Total Revenue</h2>
                <p className="text-3xl sm:text-4xl mt-4">${revenueData}</p>
              </div>

              {/* <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-6 rounded-xl text-white text-center hover:scale-105 transform transition">
                <h2 className="text-xl sm:text-2xl font-bold">Pending Orders</h2>
                <p className="text-3xl sm:text-4xl mt-4">150</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Dash;
