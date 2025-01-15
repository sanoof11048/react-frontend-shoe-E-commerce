import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductModal = ({ isOpen, closeModal, product }) => {
  const [editProduct, setEditProduct] = useState({
    id: "",
    category: "",
    name: "",
    description: "",
    price: 0,
    size: [], 
    stock: 0,
    image_url: "",
  });


  useEffect(() => {
    if (isOpen) {
      setEditProduct(product);
      console.log(product);
    }
  }, [isOpen]);

  const UpdateProduct=()=>{
    axios.put(`http://localhost:3000/products/${editProduct.id}`, editProduct)

  }

  // Handle size change
  const handleSizeChange = (size) => {
    setEditProduct((prevProduct) => {
      const updatedSizes = prevProduct.size.includes(size)
        ? prevProduct.size.filter((item) => item !== size) // Remove size if already selected
        : [...prevProduct.size, size]; // Add size if not already selected

      return {
        ...prevProduct,
        size: updatedSizes,
      };
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="absolute  inset-x-0 inset-y-0  bg-gray-800 bg-opacity-50 min-h-fit   z-50"
      onClick={closeModal}
    >
      <div  
        className="bg-white mx-auto p-6 rounded-lg max-w-4xl h-full w-full "
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Edit Product ID: {editProduct.id}
        </h2>

        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={editProduct.name}
              onChange={(e) =>
                setEditProduct({ ...editProduct, name: e.target.value })
              }
            />
          </div>

          {/* Image URL Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Image Url:</label>
            <input
              value={editProduct.image_url}
              onChange={(e) =>
                setEditProduct({ ...editProduct, image_url: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows="3"
              value={editProduct.description}
              onChange={(e) =>
                setEditProduct({ ...editProduct, description: e.target.value })
              }
            />
          </div>

          {/* Gender Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Gender:</label>
            <select
              value={editProduct.category}
              onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Size Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Available Sizes:</label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {[6, 7, 8, 9, 10, 11, 12].map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`size-${size}`}
                    name="shoe-size"
                    value={size}
                    checked={editProduct.size.includes(size)} // Check if the size is selected
                    onChange={() => handleSizeChange(size)} // Toggle size selection
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded"
                  />
                  <label htmlFor={`size-${size}`} className="text-sm text-gray-700">
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price and Stock Fields in One Line */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Price:</label>
              <input
                type="number"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: e.target.value })
                }
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Stock:</label>
              <input
                type="number"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={editProduct.stock}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, stock: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={closeModal}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("Product updated", editProduct)
              UpdateProduct()
              closeModal();
            }}
            className={
               "bg-gray-400 text-white px-4 py-2 rounded-lg focus:outline-none"}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
