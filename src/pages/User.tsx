import React from "react";
import CounterButton from "../components/CounterButton";

const User: React.FC = () => {
    return (
       <body className="flex items-center justify-center min-h-screen bg-white] ">
        <div className="card glass bg-gradient-to-b from-[#A0E5EA] to-[#84DB6E] w-80 shadow-xl">
            <div className="card-body items-center text-center">
                <h1 className="card-title font-neue font-bold text-7xl text-white">Total</h1>
                <h1 className="card-title font-neue font-bold text-9xl text-white">0</h1>
                <div className="card-actions">
                <button className="btn btn-wide bg-white bg-opacity-20 backdrop-blur-lg text-white font-bold py-2 px-6 rounded-lg shadow-lg border-2 border-white hover:bg-opacity-40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">+1</button>
                <CounterButton />
                </div>
            </div>
        </div>


      </body>

    );
  };
  
  export default User;