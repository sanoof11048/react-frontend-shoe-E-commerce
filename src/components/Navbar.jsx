import React, { useState, useEffect } from "react";
import logo from "../assets/logo222.png";
import { RiShoppingCartLine, RiUser3Line, RiMenu2Fill } from "react-icons/ri";
import { useNavigate } from "react-router";
import { useUser } from "./userContext";
import toast from "react-hot-toast";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false); 
  const [viewName, setViewName] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [showLogout, setShowLogout] = useState(false);
  const [isAdmin,setIsAdmin]=useState(false)

  useEffect(() => {
    if (user) {
      setViewName(user.name);
      axios.get(`http://localhost:3000/users/${user.id}`).then((res) => {
        const cart = res.data.cart;
        const cartCount = cart.length;
        if(user.id==1360){
          setIsAdmin(true)
        }
        setCartCount(cartCount);
      });
    }
  });

  const toCart = () => {
    if (user) {
      navigate("/cart");
    } else {
      toast("Please Login");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("id");
  };

  const login = () => {
    if (user) {
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <nav className="flex justify-between items-center p-4 bg-transparent w-full">
        <div className="md:hidden flex items-center">
          <button
            className="text-white bg-transparent"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <RiMenu2Fill size={24} />
          </button>
        </div>
        <div className="flex items-center justify-center w-full md:w-auto ps-5 ">
          <img
            className="w-8 h-8 me-3 cursor-pointer"
            onClick={() => navigate("/")}
            src={logo}
            alt="Logo"
          />
          <h2
            onClick={() => navigate("/")}
            className="font-bold text-2xl  text-white cursor-pointer tracking-widest"
          >
            PLASHOE
          </h2>
        </div>
        


        <div className="hidden md:flex space-x-6 justify-center  w-full ">
          <div
            className="text-white p-2 cursor-pointer hover:text-gray-900 hover:scale-110 transition-transform duration-300 ease-in-out"
            onClick={() => navigate("/")}
          >
            Home
          </div>
          <div
            className="relative hidden md:flex space-x-6"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <div
              className="text-white p-2 cursor-pointer hover:text-gray-900 hover:scale-110 transition-transform duration-300 ease-in-out"
              onClick={() => navigate("/products")}
            >
              Products
            </div>
            {showCategories && (
              <div className="absolute top-full left-0 bg-white z-20 shadow-md rounded p-2">
                <ul className="">
                  <li
                    className="cursor-pointer hover:text-gray-700 hover:bg-slate-300 p-3 mb-1 hover:rounded-lg"
                    onClick={() => navigate("/products")}
                  >
                    Men
                  </li>
                  <li
                    className="cursor-pointer hover:text-gray-700 hover:bg-slate-300 p-3 mb-1 hover:rounded-lg"
                    onClick={() => navigate("/products")}
                  >
                    Women
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div
            className="text-white p-2 ms-0 cursor-pointer hover:text-gray-900 hover:scale-110 transition-transform duration-300 ease-in-out"
            onClick={() =>{
              if(user){
                navigate("/orders")
                window.location.reload()
              }else{
                toast.error("Please Login")
              }
             
            } }
          >
            Orders
          </div>
          <div
            className="text-white p-2 cursor-pointer hover:text-gray-900 hover:scale-110 transition-transform duration-300 ease-in-out"
            onClick={() => navigate("/contact")}
          >
            Contact
          </div>
          {isAdmin&&(
            <div
            className="text-white p-2 cursor-pointer hover:text-gray-900 hover:scale-110 transition-transform duration-300 ease-in-out"
            onClick={() => navigate("/dash")}
          >
            Admin
          </div>

          )}
          
        </div>

        <div className="flex space-x-4">
          <div
            onClick={toCart}
            className="text-white flex cursor-pointer hover:text-gray-900 hover:scale-110 transition-transform duration-300 ease-in-out"
          >
            <RiShoppingCartLine size={24} />
            <div className="align-top bg-red-700 text-xs rounded-full h-4 absolute w-3.5  ms-4 ">
              {cartCount}
            </div>
          </div>
          {user &&(
            <div className="hidden md:flex">
            <p className="w-max">Hey,  {viewName}!</p>
          </div>
          )}
          
          <div
            onMouseEnter={() => setShowLogout(true)}
            onMouseLeave={() => setShowLogout(false)}
          >
            {user&&(<a
              onClick={login}
              className="text-white  cursor-pointer hover:text-gray-900 hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              {}
              <RiUser3Line size={24} />
            </a>)}
            {!user&&(<button
              onClick={login}
              className=" ms-2 cursor-pointer hover:text-gray-700 text-stone-500 h-6 text-sm px-4 py-3 items-center justify-center flex text-center hover:scale-105 transition-transform duration-300 ease-in-out"
            >Login
              
            </button>)}
            {showLogout && user&& (
              <div className="absolute right-4 top-12  bg-white z-20 shadow-md rounded ms-20 p-1">
                <ul className="">
                  <li
                    className="cursor-pointer hover:text-gray-700 hover:bg-slate-300 p-1 px-5 hover:rounded-lg"
                    onClick={() => {
                      localStorage.removeItem("id");
                      localStorage.clear()
                     setUser(null)
                      navigate('/')
                      window.location.reload();
                    }}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-gray-700">
          <button
            className="w-full rounded-none text-white py-2 bg-stone-400 hover:bg-gray-600"
            onClick={() => {
              setMenuOpen(false)
navigate('/')
            }
            }
          >
            Home
          </button>
          <button
            className="w-full rounded-none text-white py-2 bg-stone-400 hover:bg-gray-600"
            onClick={() => {
              navigate("/products")
              setMenuOpen(false)}}
          >
            Products
          </button>
          <button
            className="w-full rounded-none text-white py-2 bg-stone-400 hover:bg-gray-600"
            onClick={() =>
            {
              if(user){
                navigate("/orders")
                window.location.reload()
                setMenuOpen(false)
              }else{
                toast.error("Please Login")
                setMenuOpen(false)
              }
            }
              }
          >
            Orders
          </button>
          <button
            className="w-full rounded-none text-white py-2 bg-stone-400 hover:bg-gray-600"
            onClick={() => {
              navigate('/contact')
              setMenuOpen(false)}}
          >
            Contact
          </button>
          {isAdmin&&(
            <button
            className="w-full rounded-none text-white py-2 bg-stone-400 hover:bg-gray-600"
            onClick={() => {
              setMenuOpen(false)
              navigate("/dash")}}
          >
            Admin
          </button>

          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
