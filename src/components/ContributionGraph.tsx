import React, { useState, useEffect } from "react";


const ContributionGraph: React.FC = () => {

    const days = new Array(365).fill(false); // You can modify this array to represent commit days

return (
    <>

<div className="card bg-gradient-to-b from-[#A0E5EA] to-[#84DB6E] shadow-lg p-4 rounded-lg w-full">
        {/* Stats Title Section */}
        <h3 className="font-semibold text-sm text-white">GitHub Commit Graph</h3>

        {/* Grid Layout for Days of the Year (52 Weeks x 7 Days) */}
        <div className="grid grid-cols-7 gap-1 mt-4" style={{ gridTemplateRows: "repeat(52, 1fr)" }}>
          {/* Loop through the days array to generate squares */}
          {days.map((_, index) => {
            // Calculate if the day should have a commit (you can modify this logic)
            const hasCommit = Math.random() > 0.5; // Example random condition for commit days
            const commitIntensity = Math.floor(Math.random() * 4); // Example random intensity

            // Assign colors based on commit intensity
            let commitClass = "bg-transparent border border-gray-300"; // Default for no commit
            if (hasCommit) {
              if (commitIntensity === 0) commitClass = "bg-green-400";
              if (commitIntensity === 1) commitClass = "bg-green-500";
              if (commitIntensity === 2) commitClass = "bg-green-600";
              if (commitIntensity === 3) commitClass = "bg-green-700";
            }

            return (
              <div key={index} className={`w-4 h-4 ${commitClass} rounded-sm`} />
            );
          })}
        </div>
      </div>

    </>
  );

};

export default ContributionGraph;