import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./userContext.jsx";
import axios from "axios";
import Navbar from "./Navbar.jsx";
import Footer from "../Base/footer.jsx";

function Cart() {
  const { user, priceHandle , toPurchase} = useUser();
  const navigate = useNavigate();
  const [userCart, setUserCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/users/${user.id}`)
        .then((response) => {
          const updatedCart = response.data.cart.map((product) =>
           (!product.itemcount)
              ? { ...product, itemcount: 1}
              : product
          );
          setUserCart(updatedCart);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user cart", error);
          setLoading(false);
        });
    }
  },[user]);
  useEffect(() => {
    const calculateTotal = userCart.reduce((sum, product) => {
      return sum + product.price * (product.itemcount || 1);
    }, 0);
    setPrice(calculateTotal);
    priceHandle(calculateTotal);

  }, [userCart]);

  const handleRemove = (productId) => {
    console.log(productId);
    const updatedCart = userCart.filter((product) => product.id !== productId);
    
    axios
      .patch(`http://localhost:3000/users/${user.id}`, { cart: updatedCart })
      .then(() => {
        setUserCart(updatedCart);
        console.log("Deleted");
      })
      .catch((error) => {
        console.error("Error updating the cart", error);
      });
  };
  const handleInc = (productId) => {
    const updatedCart = userCart.map((product) =>
      product.id === productId
        ? { ...product, itemcount: (product.itemcount || 1) + 1 }
        : product
    );
  
    axios
      .patch(`http://localhost:3000/users/${user.id}`, { cart: updatedCart })
      .then(() => {
        setUserCart(updatedCart);
        console.log("Cart updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating the cart", error);
      });
  };
  
  const handleDec = (productId) => {
    const updatedCart = userCart.map((product) =>
      product.id === productId
        ? {
            ...product,
            itemcount: Math.max(1, (product.itemcount || 1) - 1),
          }
        : product
    );
  
    axios
      .patch(`http://localhost:3000/users/${user.id}`, { cart: updatedCart })
      .then(() => {
        setUserCart(updatedCart);
        console.log("Cart updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating the cart", error);
      });
  };
  

  return (
    <div>
      <div className="bg-stone-400 pb-10">
        <Navbar />
        <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-8">Your Cart</h1>

        {loading ? (
          <p className="mb-52">Some Errors are Found, Try Again Later!</p>
        ) : userCart.length === 0 ? (
          <p className="text-center justify-center mb-52">
            Your cart is empty.
          </p>
        ) : (
          <div>
            <ul>
              {userCart.map((product, index) => (
               <li key={index} className="flex justify-center items-center py-3">
               <div className="flex flex-col md:flex-row items-center md:w-2/4 w-5/6 pb-3 md:pb-0 bg-[#fafafa] rounded-2xl ps-10 pe-10">
                 <div>
                   <img
                     src={product.image_url}
                     alt={product.name}
                     className="w-60 h-60 m-2 object-cover mr-4"
                   />
                 </div>
             
                 <div className=" mt-4 md:mt-0">
                   <h3 className="text-xl text-center mb-4">{product.name}</h3>
                   <p className="text-gray-600 text-sm">
                     Sizes: {product.size.toString()} 
                   </p>
                   <p className="text-gray-900 font-bold mb-5">${product.price}.00</p>
                   <div className="mb-2 flex justify-center text-center">
                     <p className="text-xs mt-1 me-1">Quantity : </p>
                     <button
                       onClick={() => handleDec(product.id)}
                       className="bg-stone-200 px-1.5 py-0.5 rounded-md text-sm text-center me-2"
                     >
                       -
                     </button>
                     {product.itemcount }
                     <button
                       onClick={() => handleInc(product.id)}
                       className="bg-stone-200 px-1.5 py-0.5 rounded-md text-xs text-center ms-2"
                     >
                       +
                     </button>
                   </div>
             
                   <button
                     onClick={() => handleRemove(product.id)}
                     className="text-gray-700 mb-2 text-xs"
                   >
                     Remove from Cart
                   </button>
                 </div>
               </div>
             </li>
             
              ))}
            </ul>

            <div className="mt-6">
              <h2 className="text-2xl font-bold text-gray-900 mt-4 ">
                Total Amount :{" "}
                <span className="text-2xl font-bold text-white">${price}</span>
              </h2>

              <button
                className="text-black"
                onClick={() =>{
                  navigate("/payment")
                  // handleOrders(userCart)
                  toPurchase(userCart)
                } }
              >
                Check Out
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
