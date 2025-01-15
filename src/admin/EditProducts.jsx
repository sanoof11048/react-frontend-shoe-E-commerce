import React, { useState, useEffect } from "react";
import axios from "axios";
import SideDash from "./SideDash";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import bgimg from "../assets/adminalert.webp";
import { useUser } from "../components/userContext";
import { useNavigate } from "react-router";
import ProductModal from "./ProductModal";
import AddProduct from "./AddProduct";
import { IoSearchCircle } from "react-icons/io5";

function EditProducts() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      // http://localhost:3000/products?_page=1&_limit=10
      .then((response) => {
        if (category === "All") {
          setTotalProducts(response.data.length);
          setProducts(response.data);
        } else {
          const updatedProd = response.data.filter(
            (product) => product.category === category
          );
          setTotalProducts(updatedProd.length);
          setProducts(updatedProd);
        }
      })
      .catch((err) => console.error("Error fetching products", err));
  }, [category]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const toFilter = (category) => {
    setCategory(category);
    setCurrentPage(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeAddProduct = () => {
    setIsAddProductOpen(false);
  };
  const handleAddProduct = () => {
    setIsAddProductOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/products/${id}`)
          .then(() => {
            setProducts(products.filter((product) => product.id !== id));
            Swal.fire("Deleted!", "The product has been deleted.", "success");
          })
          .catch((err) =>
            Swal.fire("Error", "Error deleting product", "error")
          );
      }
    });
  };


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!user || user.id !== "1360") {
    return (
      <div className="flex justify-center">
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
      className="min-h-screen bg-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex min-h-screen">
        <div className="w-1/5 bg-gray-600 text-white p-4">
          <SideDash />
        </div>

        <div className="flex-1 p-6 bg-gray-300">
          <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-center w-full">
                Product List
              </h2>
              <button
                onClick={handleAddProduct}
                className="ml-auto bg-indigo-500 text-white hover:text-gray-400 px-4 py-2 rounded-lg hover:bg-indigo-600 whitespace-nowrap"
              >
                Add Product
              </button>
            </div>

            <div className="bg-stone-400 shadow-md p-3 w-auto flex justify-between items-center">
              <div className="">
                <button
                  className={`bg-transparent hover:bg-white/10 backdrop-blur-sm focus:outline-none p-2 ${
                    category === "All"
                      ? "border-b-gray-800 border-b-4 border-spacing-8 rounded-none focus:outline-none border-stone-400"
                      : ""
                  }`}
                  onClick={() => toFilter("All")}
                >
                  All
                </button>
                <button
                  className={`bg-transparent hover:bg-white/10 backdrop-blur-sm focus:outline-none p-2 ${
                    category === "Male"
                      ? "border-b-gray-800 border-b-4 border-spacing-8 rounded-none focus:outline-none border-stone-400"
                      : ""
                  }`}
                  onClick={() => toFilter("Male")}
                >
                  Men
                </button>
                <button
                  className={`bg-transparent hover:bg-white/10 backdrop-blur-sm focus:outline-none p-2 ${
                    category === "Female"
                      ? "border-b-gray-800 border-b-4 border-spacing-8 rounded-none focus:outline-none border-stone-400"
                      : ""
                  }`}
                  onClick={() => toFilter("Female")}
                >
                  Women
                </button>
              </div>
              <div className="ml-auto ">
                <label className="text-sm me-1">Products/Page: </label>
                <select
                  className="mt-1 ring-0  focus:outline-none rounded-lg p-1 border-none"
                  value={productsPerPage}
                  onChange={(e) => setProductsPerPage(e.target.value)}
                >
                  <option disabled></option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
              </div>
            </div>

            <table className="table-auto w-full border-collapse border bg-[#fafafa] border-gray-300">
              <thead className="bg-gray-600 text-white">
                <tr>
                  <th className="py-2 px-4">Image</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="py-2 px-4 w-8 h-8">
                      <img src={product.image_url} alt={product.name} />
                    </td>
                    <td className="py-2 px-4">{product.name}</td>
                    <td className="py-2 px-4">${product.price}.00</td>
                    <td className="py-5 px-8 flex justify-center items-center gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
              >
                Prev
              </button>
              <span className="px-4 py-2 text-lg">{`${currentPage} of ${totalPages}`}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-500 text-white rounded-md ml-2"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddProduct
        openAddProduct={isAddProductOpen}
        closeAddProduct={closeAddProduct}
      />
      <ProductModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        product={selectedProduct}
      />
    </motion.div>
  );
}

export default EditProducts;
