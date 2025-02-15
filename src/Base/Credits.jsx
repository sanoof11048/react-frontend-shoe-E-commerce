import React from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router'
import CreditBg from '../assets/credit.png'

function Credits() {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen'  style={{
                  backgroundImage: `url(${CreditBg})`,
                  backgroundSize: "100%",
                  backgroundPosition: "center ",
                  backgroundRepeat: " no-repeat",
                }}>

<Navbar/>
 <div className="flex flex-col items-center justify-center  text-whit">
      
    <div className="text-center p-6 bg-white bg-opacity-70 rounded-lg shadow-lg">
        <h1 className="text-4xl font-semibold mb-4 text-gray-800">
            Thank you for purchasing from <span className="text-blue-600">plashoe.com</span>
        </h1>
        <h2 className="text-2xl font-medium text-gray-800">
            Stay with us for more amazing deals!
        </h2>
        <button className='mt-2 bg-transparent text-black underline hover:bg-white/5' onClick={()=>navigate('/')}>Back to Shop</button>
    </div>
</div>
    </div>
   

  )
}

export default Credits