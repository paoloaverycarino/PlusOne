import React from "react";
import CounterButton from "../components/CounterButton";
import ContributionGraph from "../components/ContributionGraph";
import UploadToday from "../components/UploadToday";

const User: React.FC = () => {
  return (
    <body className="flex flex-col items-center justify-center min-h-screen bg-[#262b70]">
      <div className="flex gap-4 mb-4">
        <div className="card bg-white bg-opacity-30 backdrop-blur-lg w-[32rem] h-[32rem] shadow-2xl">
          <div className="card-body flex flex-col items-center space-y-4 text-center">
            {/* Profile Picture w/ Username */}
            <div className="flex flex-col items-center w-full">
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
              <h2 className="text-xl font-neue font-bold text-center">
                Andy Tran
              </h2>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 w-full h-full">
              <div className="stats shadow">
                <div className="stat bg-gradient-to-b from-[#ffffff] to-[#9cf2f8]">
                  <div className="stat-title">Total Page Views</div>
                  <div className="stat-value">89,400</div>
                  <div className="stat-desc">21% more than last month</div>
                </div>
              </div>

              <div className="stats shadow">
                <div className="stat flex items-center bg-gradient-to-b from-[#ffffff] to-[#A0E5EA]">
                  <span className="text-5xl">🔥</span>
                  <div className="text-6xl font-neue font-bold text-red-600">
                    42
                  </div>
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
          </div>
        </div>
        {/* Card 1 - Total */}
        <div className="card glass bg-[#2c5335] bg-opacity-30 backdrop-blur-lg w-80 shadow-2xl">
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
