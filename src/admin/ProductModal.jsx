import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import "sweetalert2/dist/sweetalert2.min.css";

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
    }
  }, [isOpen, product]);

  const updateProduct = async () => {
    try {
      await axios.put(
        `http://localhost:3000/products/${editProduct.id}`,
        editProduct
      );
      console.log("set");
      toast.success("Product updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Failed to update product. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleSave = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to save changes to this product.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateProduct();

        closeModal();

        Swal.fire("Saved!", "The product has been updated.", "success");
      }
    });
  };

  const handleSizeChange = (size) => {
    setEditProduct((prevProduct) => {
      const updatedSizes = prevProduct.size.includes(size)
        ? prevProduct.size.filter((item) => item !== size)
        : [...prevProduct.size, size];
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
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Edit Product - {editProduct.name}
        </h2>
        <div className="space-y-4">
          {/* Name */}
          <div className="flex w-full justify-center space-x-6 ">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                className="mt-1  w-full border rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={editProduct.name}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, name: e.target.value })
                }
              />
            </div>

            <div className="w-1/2">
              <label className=" text-sm block font-medium text-gray-700">
                Category
              </label>
              <select
                className="mt-1  w-full border rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={editProduct.category}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, category: e.target.value })
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              className="mt-1 block w-full border rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={editProduct.image_url}
              onChange={(e) =>
                setEditProduct({ ...editProduct, image_url: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              className="mt-1 block w-full border rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows="3"
              value={editProduct.description}
              onChange={(e) =>
                setEditProduct({ ...editProduct, description: e.target.value })
              }
            />
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sizes
            </label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[5, 6, 7, 8, 9, 10, 11, 12].map((size) => (
                <div key={size} className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={editProduct.size.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm">{size}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price & Stock */}
          <div className="flex space-x-6">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                className="mt-1 block w-full border rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    price: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                className="mt-1 block w-full border rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={editProduct.stock}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    stock: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
