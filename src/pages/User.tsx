import React from "react";
import CounterButton from "../components/CounterButton";

const User: React.FC = () => {
    return (
        <body className="flex items-center justify-center min-h-screen bg-[url('/images/backdrop.jpg')]">
        <div className="flex gap-4">

        {/* Card 2 - Avatar */}
        <div className="card bg-white bg-opacity-30 backdrop-blur-lg w-[32rem] h-[32rem] shadow-2xl">
        <div className="card-body flex flex-col items-center justify-between text-center">

            {/* Profile Picture w/ Username */}
            <div className="flex flex-col items-center w-full">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Profile" className="object-cover w-full h-full" />
                </div>
                <h2 className="text-xl font-neue font-bold text-center">Andy Tran</h2>
                </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 w-full">
                <div className="stats shadow">
                    <div className="stat bg-gradient-to-b from-[#ffffff] to-[#9cf2f8]">
                        <div className="stat-title">Total Page Views</div>
                        <div className="stat-value">89,400</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat bg-gradient-to-b from-[#ffffff] to-[#A0E5EA]">
                        <div className="stat-title">Total Page Views</div>
                        <div className="stat-value">89,400</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>
            </div>

            <div className="card bg-gradient-to-b from-[#A0E5EA] to-[#84DB6E] shadow-lg p-4 rounded-lg w-full">
                {/* Stats Title Section */}
                <h3 className="font-semibold text-sm text-white">GitHub Commit Graph</h3>

                {/* Grid Layout for Days of the Year (52 Weeks x 7 Days) */}
                <div className="grid grid-cols-7 grid-rows-52 gap-1 mt-4">
                    
                    {/* Loop through all 365 days, conditionally color each square */}
                    {/* Example for a day with commits */}
                    <div className="w-6 h-6 bg-green-400 rounded-sm"></div>  {/* Day with a commit */}
                    
                    {/* Example for a day without commits */}
                    <div className="w-6 h-6 bg-transparent border border-gray-300 rounded-sm"></div> {/* No commit */}
                    
                    {/* Repeat for each day of the year... */}

                    {/* Example data for more commit days */}
                    <div className="w-6 h-6 bg-green-500 rounded-sm"></div> {/* Day with a stronger commit activity */}
                    <div className="w-6 h-6 bg-green-600 rounded-sm"></div> {/* Day with a more intense commit activity */}
                    
                    {/* Add more squares here to represent each day */}
                </div>
                </div>

        </div>
        </div>

            {/* Card 1 - Total */}
            <div className="card glass bg-[#2c5335] bg-opacity-30 backdrop-blur-lg w-80 shadow-2xl">
                <div className="card-body items-center flex-col justify-between h-full text-center">
                    <h1 className="card-title font-neue font-bold text-8xl text-white">Total</h1>
                    <h1 className="card-title font-neue font-bold text-[20rem] text-white">0</h1>
                    <div className="card-actions">
                        <CounterButton />
                    </div>
                </div>
            </div>

        </div>
        </body>


    );
  };
  
  export default User;