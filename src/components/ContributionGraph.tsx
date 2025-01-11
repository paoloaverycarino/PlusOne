import React, { useState, useEffect } from "react";


const ContributionGraph: React.FC = () => {

  // Initialize an array representing 365 days of the year (can be dynamically populated)
  const [commitDays, setCommitDays] = useState<boolean[]>(new Array(365).fill(false));

  useEffect(() => {
    // Simulating commit data for the entire year (random commits)
    const simulatedCommitData = commitDays.map(() => Math.random() > 0.5); // Random commit or no commit
    setCommitDays(simulatedCommitData);
  }, []); // Empty dependency array to run once when the component mounts

  return (
    <div className="card glass bg-[#2c5335] bg-opacity-30 backdrop-blur-lg shadow-2xl w-[74rem] h-[5rem]">
      <div className="card-body text-center">

        <h3 className="font-bold font-neue text-sm text-white">Year Progress</h3>

        {/* Grid Layout for 52 Weeks x 7 Days */}
        <div className=" grid grid-cols-12 grid-rows-7 gap-1">
          {/* Loop through the 365 days */}
          {commitDays.map((hasCommit, index) => (
            <div key={index}className={`w-12 h-12 rounded-sm ${hasCommit ? "bg-green-500" : "bg-transparent border border-gray-300"}`}/>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ContributionGraph;