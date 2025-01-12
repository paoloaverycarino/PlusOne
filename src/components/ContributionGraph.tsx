import React, { useState } from "react";

const ContributionGraph: React.FC = () => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

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
      <div className="w-[100rem] p-4 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <button
            className="text-lg font-bold text-gray-600 hover:text-gray-800"
            onClick={goToPreviousYear}
          >
            &lt;
          </button>
          <span className="text-9xl font-bold">{currentYear}</span>
          <button
            className="text-lg font-bold text-gray-600 hover:text-gray-800"
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
                  {daysInMonth.map((_, index) => (
                    <div
                      key={index}
                      className="w-5 h-5 border border-gray-300 bg-white"
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

export default ContributionGraph;