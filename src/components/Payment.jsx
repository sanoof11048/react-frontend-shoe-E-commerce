import React, { useState } from "react";
import Navbar from "./Navbar";
import { useUser } from "./userContext";
import { useNavigate } from "react-router";
import PaymentBg from '../assets/payment-bg.jpg'
import Footer from "../Base/footer";

function Payment() {
  const navigate = useNavigate();
  const { amount, confirmOrder } = useUser();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    confirmOrder()
    navigate("/credit");
  };

  return (
    <div>
    <div className="pb-14" 
    style={{
              backgroundImage: `url(${PaymentBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center ",
              backgroundRepeat: " no-repeat",
            }}
    >
      <Navbar />
      <div className="w-1/3 mx-auto bg-white rounded-lg shadow-lg p-10 mt-10 ">


        <h2 className="text-2xl font-semibold text-center mb-8">
          Pay for Order
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Your Full Name"
                required
              />
            </div>

            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@domain.com"
                required
              />
            </div>

            <div>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Address"
                rows="3"
                required
              />
            </div>
          </div>

          <div>
            
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full  p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={"COD"}>Cash On Delivery</option>
              <option value={"NetBanking"}>Net Banking</option>
            </select>
          </div>

          <>
            {paymentMethod === "NetBanking" && (
              <div className="mt-8 space-y-6">
                <div>
                  <label className="block text-gray-700">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1234 5678 9876 5432"
                    maxLength="16"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-gray-700">Expiry Date</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="MM/YY"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700">CVC</label>
                    <input
                      type="text"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="CVC"
                      maxLength="3"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </>

          <div className="mt-8">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Amount</span>
              <span>${amount}</span>
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              Confirm Payment
            </button>
          </div>
        </form>
      </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Payment;
