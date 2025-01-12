import React from "react";
import CounterButton from "../components/CounterButton";
import ContributionGraph from "../components/ContributionGraph";
import UploadToday from "../components/UploadToday";
import { Link } from 'react-router-dom';

const User: React.FC = () => {
  return (

    <body className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="h-[90vh] flex items-center justify-center">
      <div className="flex gap-6 mb-4"> {/* Adds margin to separate the new card */}
        <div className="card bg-black w-[32rem] h-[32rem] shadow-2xl">
          <div className="card-body flex flex-col items-center space-y-4 text-center">

            <h1 className="card-title font-neue font-bold text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#FED90B] to-[#FF8C00] leading-[1.2]">Progress</h1>

            {/* Stats */}
            <div className="grid grid-cols-2 grid-rows-2 gap-6 w-full h-full">
              
              <div className="stats shadow col-span-1 row-span-2">
                <div className="card bg-white">
                  <UploadToday />
                </div>
              </div>


                <div className="stat flex items-center justify-center rounded-md bg-white transform transition-all duration-300 ease-in-out hover:scale-105">
                <Link to="/calendar" className="w-full h-full flex items-center justify-center">
                  <div className="stat-title font-neue font-bold text-black">Calendar Gallery</div>
                </Link>
              </div>

                <div className="stat flex items-center justify-center rounded-md bg-white transform transition-all duration-300 ease-in-out hover:scale-105">
                  <Link to="/training" className="w-full h-full flex items-center justify-center">
                    <div className="stat-title font-neue font-bold text-black">Training Regime</div>
                  </Link>
                </div>

            </div>
          </div>
        </div>

        {/* Card 1 - Total */}
        <div className="card glass bg-gradient-to-b from-[#7691CB] to-[#45FFF0] w-80 shadow-2xl">
          <div className="card-body items-center flex-col justify-between h-full text-center">
            <h1 className="card-title font-neue font-bold text-8xl text-white">Total</h1>
            <h1 className="card-title font-neue font-bold text-[20rem] text-white">0</h1>
            <div className="card-actions">
              <CounterButton />
            </div>
          </div>
        </div>

        <div className="card glass bg-gradient-to-b from-[#ED373A] to-[#6929A1] w-80 shadow-2xl">
          <div className="card-body items-center flex-col justify-between h-full text-center">
            <h1 className="card-title font-neue font-bold text-8xl text-white">
              Total
            </h1>
            <h1 className="card-title font-neue font-bold text-[20rem] text-white">
              0
            </h1>
            <div className="card-actions">
              <CounterButton />
            </div>
          </div>
        </div>
      </div>
    </div>

      <div className="h-screen flex justify-center items-center">
        <ContributionGraph />
      </div>

    </body>
  );
};

export default User;
