import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useProductContext } from "./ProductContext";
import { useNavigate } from "react-router";
import axios from "axios";
import { useUser } from "./userContext";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Base/footer";
import { IoSearchCircle } from "react-icons/io5";
import Modal from "../Base/modal";

function Products() {
  const { user } = useUser();
  const { filterProducts, filterByCategory, toSearch} = useProductContext();
  const navigate = useNavigate();
  const [cate, setCate] = useState("All");
  const [cart, setCart] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toFilter = (category) => {
    if (category == "Male") {
      setCate("Men's");
    }
    if (category == "Female") {
      setCate("Women's");
    }
    if (category == "All") {
      setCate("All");
    }

    filterByCategory(category);
  };

  useEffect(() => {
    if (user) {
      const userId = user.id;
      axios.get(`http://localhost:3000/users/${userId}`).then((res) => {
        const inCart = res.data.cart;
        setCart(inCart);
      });
    }
  },[user]);

  const addToCart = (product) => {
    if (user) {
      const userId = user.id;
      const isProductInCart = user.cart.some(
        (cartItem) => cartItem.id === product.id
      );
      if (!isProductInCart) {
        setCart((prevCart) => {
          const updatedCart = [...prevCart, product];
          console.log(updatedCart);

          axios
            .patch(`http://localhost:3000/users/${userId}`, {
              cart: updatedCart,
            })
            .then(() => {
              toast.success("Added to Cart");
            })
            .catch((error) => {
              console.log(error);
              toast.error("Failed to add to cart.", { duration: 4000 });
            });
          return updatedCart;
        })
      } else {
        toast.error("Already in Cart", { duration: 7000 });
      }
    } else {
      const toastId = toast.custom(
        <div className=" w-full h-screen bg-transparent rounded-lg shadow-lg text-white flex items-center justify-center ">
          <div
            style={{ backgroundColor: "#2f2f2f" }}
            className=" w-1/3 rounded-lg p-5 "
          >
            <p className="text-xl font-semibold p-5 ">Please Login</p>
            <p className="pb-2">Log in or sign up to continue Your Shopping</p>
            <button
              onClick={() => {
                navigate("/login");
                toast.dismiss(toastId);
              }}
              className="bg-white hover:bg-slate-600 mb-3 text-slate-700 hover:text-gray-200 px-4 py-2 rounded-3xl w-2/3"
            >
              Log in
            </button>
            <button
              style={{ backgroundColor: "#2f2f2f" }}
              onClick={() => {
                navigate("/signup");
                toast.dismiss(toastId);
              }}
              className="border-gray-500 bg-red-600 hover:bg-slate-00 mb-3 text-white hover:text-gray-200 px-4 py-2 rounded-3xl w-2/3"
            >
              Sign up
            </button>
            <p
              onClick={() => toast.dismiss(toastId)}
              className="text-white text-base underline cursor-pointer p-4 hover:bg-text-600"
            >
              stay logged out
            </p>
          </div>
        </div>,
        {
          position: "center",
          pauseOnHover: false,
          style: {
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
          },
        }
      );
    }
  };


  

  return (
    <div>
      <div className="bg-stone-400">
        <Navbar />
      </div>

      <div className="bg-stone-400  shadow-md p-3 w-auto flex flex-col items-center ">
        <div className="">
          <button
            className={`bg-transparent hover:bg-white/10 backdrop-blur-sm focus:outline-none p-2 ${
              cate === "All"
                ? "border-b-gray-800 border-b-4 border-spacing-8 rounded-none focus:outline-none border-stone-400"
                : ""
            }`}
            onClick={() => toFilter("All")}
          >
            All
          </button>
          <button
            className={`bg-transparent hover:bg-white/10 backdrop-blur-sm focus:outline-none p-2 ${
              cate === "Men's"
                ? "border-b-gray-800 border-b-4 border-spacing-8 rounded-none focus:outline-none border-stone-400"
                : ""
            }`}
            onClick={() => toFilter("Male")}
          >
            Men
          </button>
          <button
            className={`bg-transparent hover:bg-white/10 backdrop-blur-sm focus:outline-none p-2 ${
              cate === "Women's"
                ? "border-b-gray-800 border-b-4 border-spacing-8 rounded-none focus:outline-none border-stone-400"
                : ""
            }`}
            onClick={() => toFilter("Female")}
          >
            Women
          </button>
        </div>
        <div
          style={{ color: "#2f2f2f" }}
          className="mt-5 items-center justify-between  w-1/2  px-0.5 py-0.5 bg-white   max-w-md rounded-3xl flex"
        >
          <input
            className="ms-5 focus:outline-none w-2/3 "
            placeholder="Search..."
            type="text"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          ></input>
          <div className="p-0 m-0 hover:scale-125 transition-transform duration-300 ease-in-out rounded-full ">
            <IoSearchCircle
              onClick={() => toSearch(searchValue)}
              size={42}
              style={{ color: "#2f2f2f" }}
            />
          </div>
        </div>
      </div>

      <div className="pb-20 " style={{ backgroundColor: "#2f2f2f" }}>
        <h1 className="pt-10 text-3xl md:text-4xl font-bold  text-gray-300  font-serif">
          {" "}
          {cate} Footwears
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-10   ">
          {filterProducts.map((product, index) => (
            <div
              key={index}
              className="p-1 max-w-sm cursor-pointer rounded-lg shadow-lg overflow-hidde bg-gray-50 hover:shadow-xl transition-shadow duration-300 mt-10"
            >
              <img
                onClick={() => handleProductClick(product)}
                className="w-full h-48 object-cover"
                src={product.image_url}
                alt={product.name}
              />

              <div onClick={() => handleProductClick(product)}>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-base mb-4">
                  Available Sizes : {product.size.toString()}
                </p>
                <p className="text-lg font-bold text-gray-900">
                  ${product.price}.00
                </p>{" "}
              </div>
              <button
                style={{ backgroundColor: "#2f2f2f" }}
                onClick={() => addToCart(product)}
                className="mt-1 mb-4 w-3/4 focus:outline-none text-white hover:bg-slate-50  hover:text-gray-100 font-medium rounded-lg text-sm px-5 py-2.5   hover:scale-105 transition-transform duration-200 ease-in-out "
              >
                to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        product={selectedProduct}
      />
      <Footer />
    </div>
  );
}

export default Products;
