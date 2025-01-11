import React from "react";
import CounterButton from "../components/CounterButton";

const User: React.FC = () => {
    return (
        <body className="flex items-center justify-center min-h-screen bg-[#1B1A2B]">
        <div className="flex gap-4">

            {/* Card 2 - Avatar */}
            <div className="card glass bg-gradient-to-b from-[#A0E5EA] to-[#84DB6E] w-[32rem] h-[32rem] shadow-2xl">
                <div className="card-body items-center justify-center text-center">
                    <div className="avatar">
                        <div className="w-100 rounded-full">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Card 1 - Total */}
            <div className="card glass bg-gradient-to-b from-[#A0E5EA] to-[#84DB6E] w-80 shadow-2xl">
                <div className="card-body items-center flex-col justify-between h-full text-center">
                    <h1 className="card-title font-neue font-bold text-8xl text-white">Total</h1>
                    <h1 className="card-title font-neue font-bold text-[20rem] text-white">0</h1>
                    <div className="card-actions">
                        <button className="font-neue font-bold btn btn-wide bg-white bg-opacity-20 backdrop-blur-lg text-white font-bold py-2 px-6 rounded-lg shadow-lg border-2 border-white hover:bg-opacity-40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
                            +1
                        </button>
                    </div>
                </div>
            </div>

        </div>
        </body>


    );
  };
  
  export default User;