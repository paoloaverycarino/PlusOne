import React, { useState, useEffect } from "react";
import { db } from "../services/firebase"; // Path to your Firebase config
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useUser } from "../contexts/UserContext";

const ContributionGraph: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [loggedInDays, setLoggedInDays] = useState<Set<string>>(new Set()); // Store the logged-in dates
  const { username } = useUser();

  useEffect(() => {
    const dailyLoginsRef = collection(db, `counters/${username}/dailyLogins`);
    
    // Query for all documents where loggedIn is true
    const q = query(dailyLoginsRef, where("loggedIn", "==", true));

    const unsubscribe = onSnapshot(q, (querySnap) => {
      const loggedInDates: Set<string> = new Set();
      querySnap.forEach((docSnap) => {
        loggedInDates.add(docSnap.id); // doc ID is the date in MM-DD-YYYY format
      });
      setLoggedInDays(loggedInDates); // Set the logged-in dates
    });

    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, [username]);

  const getFormattedDate = (date: Date = new Date()) => {
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
      .getDate()
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
  };

  // Get the current year and months
  const currentYear = currentDate.getFullYear();
  const months = Array.from({ length: 12 }, (_, index) => new Date(currentYear, index, 1));

  // Function to navigate to the previous year
  const goToPreviousYear = () => {
    setCurrentDate(new Date(currentYear - 1, currentDate.getMonth(), 1));
  };

  // Function to navigate to the next year
  const goToNextYear = () => {
    setCurrentDate(new Date(currentYear + 1, currentDate.getMonth(), 1));
  };

  return (
    <div className="w-[100rem] p-4 bg-gradient-to-b from-[#A0E5EA] to-[#84DB6E] rounded-lg shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <button
          className="font-neue font-bold text-9xl text-gray-600 hover:text-gray-800"
          onClick={goToPreviousYear}
        >
          &lt;
        </button>
        <span className="text-9xl text-black font-bold">{currentYear}</span>
        <button
          className="text-9xl font-bold text-gray-600 hover:text-gray-800"
          onClick={goToNextYear}
        >
          &gt;
        </button>
      </div>

      {/* Displaying each month in a 6-column grid */}
      <div className="grid grid-cols-6 gap-2"> {/* 6 columns in each row */}
        {months.map((month, monthIndex) => {
          // Get the start and end of the month
          const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
          const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

          // Get the empty spaces for the first day of the month
          const startDay = startOfMonth.getDay();
          const emptySpaces = new Array(startDay).fill(null);

          // Get the days in the current month
          const daysInMonth = new Array(endOfMonth.getDate()).fill(null);

          return (
            <div key={monthIndex} className="w-[250px] p-2 bg-white border rounded-lg shadow-sm">
              <h3 className="text-center font-semibold mb-2">{month.toLocaleString("default", { month: "long" })}</h3>
              <div className="grid grid-cols-7 gap-1 text-center">
                {/* Days of the week */}
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="font-semibold text-gray-600">
                    {day}
                  </div>
                ))}

                {/* Empty spaces before the first day of the month */}
                {emptySpaces.map((_, index) => (
                  <div key={index} className="w-5 h-5"></div>
                ))}

                {/* Days in the current month as empty squares */}
                {daysInMonth.map((_, dayIndex) => {
                  const dayDate = new Date(
                    month.getFullYear(),
                    month.getMonth(),
                    dayIndex + 1
                  );
                  const formattedDate = getFormattedDate(dayDate);

                  return (
                    <div
                      key={dayIndex}
                      className={`w-5 h-5 border ${
                        loggedInDays.has(formattedDate)
                          ? "bg-green-500"
                          : "bg-white"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContributionGraph;