import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Intro from "../components/homeComponents/Intro";
import About from "../components/homeComponents/About";
import Services from "../components/homeComponents/Services";
import Contact from "../components/homeComponents/Contact";
import { useNavigate } from "react-router-dom";
import AdmissionModal from "../components/homeComponents/contactModal";

function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <Navbar />
      <Intro />
      <About />
      <Services />
      <Contact />
      <div>
        {openContact && (
          <div
            onMouseLeave={() => setOpenContact(false)}
            className="z-50 hidden md:flex flex-col items-end fixed bottom-20 right-4 space-x-3 opacity-100 mt-4 transition-all duration-500 ease-in-out transform"
          >
            <a
              href="https://www.facebook.com/share/1WeqyuRjTd/?mibextid=wwXIfr"
              rel="noopener noreferrer"
              target="_blank"
              className="group decoration-none flex items-center content-center mb-2  bg-blue-600 rounded-full p-2   shadow-md hover:bg-blue-700 transition-all duration-800 overflow-hidden w-8 h-8 hover:w-28"
            >
              <i className="fab fa-facebook text-white text-2xl ml-1.5"></i>
              <span className="ml-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Connect
              </span>
            </a>

            <a
              rel="noopener noreferrer"
              href="https://www.instagram.com/adotzee.inn"
              target="_blank"
              className="group flex items-center bg-blue-500 mb-2 decoration-none rounded-full p-2 shadow-md hover:bg-blue-600 transition-all duration-800 overflow-hidden w-8 h-8 hover:w-28"
            >
              <i className="fab fa-instagram text-white text-2xl ml-1.5"></i>
              <span className="ml-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Connect
              </span>
            </a>

            <a
              href={`https://wa.me/918281060462?text=${encodeURIComponent(
                "Hello! I Need Admission"
              )}`}
              rel="noopener noreferrer"
              target="_blank"
              className="group decoration-none flex items-center bg-blue-600 mb-2 rounded-full p-2 shadow-md hover:bg-blue-600 transition-all duration-800 overflow-hidden w-8 h-8 hover:w-28"
            >
              <i className="fa-brands fa-whatsapp text-white text-2xl ml-1.5"></i>
              <span className="ml-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Connect
              </span>
            </a>
          </div>
        )}
        <a
          onClick={() => setIsModalOpen(true)}
          onMouseEnter={() => setOpenContact(true)}
          className="z-49 animate-bounce fixed bottom-4 right-4 bg-secondary text-white p-3 rounded-full shadow-lg hover:shadow-xl transition duration-300"
        >
          <i className="fa-solid fa-message text-white text-2xl"></i>
        </a>
      </div>

      <AdmissionModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

export default Home;
