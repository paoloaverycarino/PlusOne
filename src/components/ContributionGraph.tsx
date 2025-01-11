import React, { useState, useEffect } from "react";


const ContributionGraph: React.FC = () => {

return (
    <>

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

    </>
  );

};

export default ContributionGraph;