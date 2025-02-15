import React, { useEffect, useState } from "react";
import { useUser } from "./userContext";
import Navbar from "./Navbar";
import axios from "axios";

function Orders() {
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if(user){
      console.log(user.orders)
      setProducts(user.orders);
    }
  }, [user]);

  const handleRemove = (productId) => {
    const updatedOrders = products.filter((product) => product.id !== productId);
    axios
      .patch(`http://localhost:3000/users/${user.id}`, { orders: updatedOrders })
      .then(() => {
        setProducts(updatedOrders);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating the cart", error);
      });
  };
  return (
    <div>
      <div className=" bg-brown-300">
      <Navbar />
      </div>
      <div className="bg-beige pt-4 min-h-screen">
        <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-8 ">Your Orders</h1>
        {products.map((product, index) => (
          <li key={index} className="flex justify-center items-center py-3">
               <div className="flex flex-col md:flex-row  items-center md:w-2/4 w-5/6 pb-3 md:pb-0 bg-[#fafafa]  rounded-2xl ps-10 pe-10">
               <img
                src={product.image_url}
                alt={product.name}
                className="w-60 h-60 m-2  object-cover mr-4"
              />
                 <div className=" mt-4 md:mt-0">
                 <h3 className="text-xl text-center mb-4">{product.name}</h3>
                <p className="text-gray-600 text-sm"> Sizes: {product.size.toString()}</p>
                <p className="text-gray-900 font-bold ">
                  ${product.price}.00
                </p>
                {product.itemcount &&(
                  <p className="text-gray-600 text-sm mb-5 ">Quantity: {product.itemcount}</p>

                )} 
                 {!product.itemcount &&(
                  <p className="text-gray-600 text-sm  ">Quantity: 1</p>

                )} 
                {product.status &&(
                  <p className="text-gray-600 text-sm mb-5 ">Status: {product.status}</p>

                )} 
                 {!product.status &&(
                  <p className="text-gray-600 text-sm mb-5 ">Status: Pending</p>

                )} 
                {/* <p  className="text-gray-600 text-sm mb-5 ">
                 Quantity: {product.itemcount}
                </p> */}
               

                <button
                  onClick={() => handleRemove(product.id)}
                  className="text-gray-700 hover: text-xs"
                >
                  Cancel the Order
                </button>
              </div>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}

export default Orders;
