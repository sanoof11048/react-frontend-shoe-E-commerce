import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import bgimg from "../assets/adminalert.webp"
import { useUser } from "../components/userContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";


const AddProduct=({ openAddProduct, closeAddProduct})=> {
  const {user}=useUser()
  const navigate=useNavigate()
  const [newProduct, setNewProduct] = useState({
    category: "",
    name: "",
    description: "",
    price: 0,
    size: [],
    stock: 0,
    image_url: "",
  });
  if (!openAddProduct) return null;
  if(!user || user.id!=="1360"){
    return(
      <div className="flex justify-center  ">
        <img className="w-full h-full" src={bgimg}/>
        <button className="absolute top-10 text-gray-500" onClick={()=>navigate(-1)}>Go Back</button>
    </div>
    )
  }

  const handleAddProduct = () => {
    axios
      .post("http://localhost:3000/products", newProduct)
      toast.success("Product added successfully")
      .then((response) => {
        toast.success("Product added successfully")
        // Swal.fire("Success!", "Product added successfully", "success");
        setNewProduct({
          category: "",
          name: "",
          description: "",
          price: 0,
          size: [],
          stock: 0,
          image_url: "",
        });

        // closeAddProduct()
      })
      .catch((err) => Swal.fire("Error", "Error adding product", "error"));
  };

  const handleSizeChange = (size) => {
    setNewProduct((prevProduct) => {
      const updatedSizes = prevProduct.size.includes(size)
        ? prevProduct.size.filter((item) => item !== size)
        : [...prevProduct.size, size];
      return {
        ...prevProduct,
        size: updatedSizes,
      };
    });
  };
   
     

  return (
    <div
    className="absolute  inset-x-0 inset-y-0  bg-gray-800 bg-opacity-50 min-h-fit   z-50"
    onClick={ closeAddProduct}
  >
    <div className="p-6 bg-gray-300  mx-auto  rounded-lg max-w-4xl h-full w-full" onClick={(e) => e.stopPropagation()}>
     
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
        <form onSubmit={handleAddProduct}>
          <div className="flex justify-center space-x-4">
          <div className="mb-4 w-1/2">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="w-1/2">
              <label className=" text-sm block font-medium text-gray-700">
                Category
              </label>
              <select
              required
                className="mt-1  w-full border rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

           {/* Sizes */}
           <div>
            <label className="block text-sm font-medium text-gray-700">
              Sizes
            </label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[4,5, 6, 7, 8, 9, 10, 11, 12].map((size) => (
                <div key={size} className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={newProduct.size.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm">{size}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4 flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
              required
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input
              required
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              value={newProduct.image_url}
              onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default AddProduct;
