import React, { useEffect, useState } from "react";

const Timer: React.FC = () => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const calculateTimeLeft = () => {
    const now = new Date();
    // Calculate the next midnight (00:00) of the next day
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0); // Set to midnight of the next day

    const timeDifference = nextMidnight.getTime() - now.getTime();

    if (timeDifference > 0) {
      const remainingHours = Math.floor(timeDifference / (1000 * 3600));
      const remainingMinutes = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));
      const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      // Set the remaining time
      setHours(remainingHours);
      setMinutes(remainingMinutes);
      setSeconds(remainingSeconds);
    } else {
      // Reset to 0 if the time difference is negative (shouldn't happen)
      setHours(0);
      setMinutes(0);
      setSeconds(0);
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

    <div className="flex flex-col justify-center items-center">

      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">

            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": hours } as React.CSSProperties}></span>
            </span>
            hours
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": minutes } as React.CSSProperties}></span>
            </span>
            min
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={{ "--value": seconds } as React.CSSProperties}></span>
            </span>
            sec
          </div>
      </div>

      <h1 className="text-white font-mono pt-4">
        Get Your Dailies!
      </h1>
    </div>
  );
};

export default Timer;

