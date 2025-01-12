import React, { useEffect, useState } from "react";

const Timer: React.FC = () => {
  const [days, setDays] = useState<number>(0);

  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-12-31T23:59:59"); // Target date (end of 2026)
    const now = new Date();
    const timeDifference = targetDate.getTime() - now.getTime();
  
    if (timeDifference > 0) {
      const remainingDays = Math.floor(timeDifference / (1000 * 3600 * 24));
      setDays(remainingDays);
    } else {
      setDays(0); // If the target date has passed, show 0 days
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    // Initial call to set the time immediately
    calculateTimeLeft();

    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, []);

  return (
    <div className="flex flex-col p-2 bg-white rounded-box text-neutral-content text-center w-[20rem]">
      <span
        className="font-neue font-bold text-black text-5xl transition-transform duration-300 ease-in-out transform hover:scale-110"
      >
        {days}
      </span>
      <span className="text-black font-neue font-medium">days left until Dec 31, 2026</span>
    </div>
  );
};

export default Timer;
