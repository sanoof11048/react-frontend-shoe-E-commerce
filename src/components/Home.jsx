import React from "react";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";
import About from "../Base/about";
import Footer from "../Base/footer";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <div className="bg-stone-500 ">
          <Navbar />
        </div>

        <About />
        <Footer />
      
      </div>
    </div>
  );
}

export default Home;
