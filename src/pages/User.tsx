import React from "react";
import CounterButton from "../components/CounterButton";
import ContributionGraph from "../components/ContributionGraph";
import UploadToday from "../components/UploadToday";

const User: React.FC = () => {
  return (
    <body className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="flex gap-4 mb-4"> {/* Adds margin to separate the new card */}

        <div className="card bg-black w-[32rem] h-[32rem] shadow-2xl">
          <div className="card-body flex flex-col items-center space-y-4 text-center">

            <h1 className="card-title font-neue font-bold text-8xl text-white">Progress</h1>

            {/* Stats */}
            <div className="grid grid-cols-2 grid-rows-2 gap-6 w-full h-full">
              
              <div className="stats shadow col-span-1 row-span-2">
                <div className="card bg-gradient-to-b from-[#ffffff] to-[#9cf2f8]">
                </div>
              </div>


                <div className="stat flex items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#A0E5EA]">
                    <div className="stat-title font-neue font-bold text-black">Calendar Gallery</div>

              </div>

              <div className="stats shadow">
                <div className="stat flex items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#A0E5EA]">
                    <div className="stat-title font-neue font-bold text-black">Training Regime</div>
                </div>
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

      {/* New Long Card Underneath */}
      <ContributionGraph />
    </body>
  );
};

export default User;
