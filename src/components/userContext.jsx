import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [curOrders, setCurOrders]= useState([])

  useEffect(() => {
    const userId = localStorage.getItem("id");

    if (userId) {
      axios.get(`http://localhost:3000/users/${userId}`).then((res) => {
        console.log(res.data);

        setUser(res.data);
        setCurOrders(res.data.orders)

      });
    }
  }, []);

  const priceHandle = (amountc) => {
    setAmount(amountc);
  };
  const handleOrders = () => {
    console.log("sanoof");
  };
  const toPurchase = (userCart) => {
    console.log(userCart)
    setOrders(userCart)
  };

  const confirmOrder=async ()=>{
    const userId = localStorage.getItem("id");
   if(userId){
    const updatedOrders=[...curOrders,...orders]

    await axios.patch(`http://localhost:3000/users/${userId}`, {orders :updatedOrders})
    await axios.patch(`http://localhost:3000/users/${userId}`, {cart :[]})


   }else{
    toast.error("Network Error")
   }


  }
; 

  return (
    <UserContext.Provider
      value={{
        setUser,
        user,
        priceHandle,
        amount,
        handleOrders,
        orders,
        toPurchase,
        confirmOrder,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
