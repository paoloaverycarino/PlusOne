import React, { useState, useEffect } from "react";


const ContributionGraph: React.FC = () => {

    const days = new Array(365).fill(false); // You can modify this array to represent commit days

return (
    <>
      <div className="card glass bg-[#2c5335] bg-opacity-30 backdrop-blur-lg shadow-2xl w-[53rem]">
        <div className="card-body text-center">
          <h3 className="font-bold font-neue text-sm text-white">Year Progress</h3>
        </div>
      </div>
    </>
  );

};

export default ContributionGraph;