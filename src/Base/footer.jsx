import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-10 ">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-2">
        <div>
          <h2 className="text-xl font-bold text-white mb-4">About Us</h2>
          <p className="text-sm ps-20 pe-20">
            We are a leading company in providing high-quality services to our
            customers. Our mission is to deliver excellence and innovation.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
          <ul className="space-y-2 text-sm">
            <li> 1234 Street Name, City, State, Country</li>
            <li> +123 456 7890</li>
            <li> info@example.com</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-4">Follow Us</h2>
          <div className="flex space-x-4 justify-center ">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white  hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white  hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className=" text-gray-400 hover:text-white hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-sm">&copy; 2025 PLASHOE. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
