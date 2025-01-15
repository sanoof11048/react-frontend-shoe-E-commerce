import React from "react";

const Modal = ({ isOpen, closeModal, product }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-5 rounded-lg w-3/4 max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
        <img
          className="w-full h-64 object-cover mb-4"
          src={product.image_url}
          alt={product.name}
        />
        <p className="text-lg text-gray-700 mb-4">
          Available Sizes: {product.size.toString()}
        </p>
        <p className="text-xl font-bold text-gray-900 mb-4">
          ${product.price}.00
        </p>
        <p className="text-md text-gray-800">{product.description}</p>
        <button
          onClick={closeModal}
          className="mt-4 w-full bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
