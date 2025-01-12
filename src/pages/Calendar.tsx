// src/pages/Calendar.tsx
import React, { useState, useEffect } from "react";
import { db } from "../services/firebase"; // Path to your Firebase config
import { doc, getDoc } from "firebase/firestore";
import { useUser } from "../contexts/UserContext";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
  const [imageURL, setImageURL] = useState<string | null>(null); // State to hold image URL for the clicked date
  const { username } = useUser();

  // Get the current year and month
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Get the number of days in the current month
  const getDaysInCurrentMonth = () => {
    // const startOfMonth = new Date(currentYear, currentMonth, 1);
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysArray = Array.from(
      { length: endOfMonth.getDate() },
      (_, i) => i + 1
    );
    setDaysInMonth(daysArray);
  };

  // Navigate to the previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  // Navigate to the next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Fetch the data for the clicked day (get image URL)
  const fetchDataForDay = async (dateString: string) => {
    console.log(username);
    console.log(dateString);
    const docRef = doc(db, `counters/${username}/dailyLogins/${dateString}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Assuming the data structure has a field 'imageUrl'
      const data = docSnap.data();
      if (data && data.imageURL) {
        setImageURL(data.imageURL); // Update the image URL state
      } else {
        console.log("Field 'dataURL' does not exist in the document.");
        setImageURL(null); // Clear the image URL state
      }
    } else {
      console.log("No data for this day");
      setImageURL(null); // Clear the image URL state
    }
  };

  // Use useEffect to get the days in the current month
  useEffect(() => {
    getDaysInCurrentMonth();
  }, [currentDate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {/* Container for the calendar and image viewer */}
      <div className="flex items-start justify-center space-x-8">
        {/* Left: Calendar Grid */}
        <div className="w-1/2 p-4">
          <div className="flex justify-between items-center w-full mb-6">
            <button
              onClick={goToPreviousMonth}
              className="px-4 py-2 text-lg font-bold bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              &lt; Previous
            </button>
            <span className="text-xl font-semibold">{`${currentDate.toLocaleString(
              "default",
              {
                month: "long",
              }
            )} ${currentYear}`}</span>
            <button
              onClick={goToNextMonth}
              className="px-4 py-2 text-lg font-bold bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Next &gt;
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-4 w-full">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="flex items-center justify-center font-semibold text-gray-600"
              >
                {day}
              </div>
            ))}
            {/* Blank spaces for the first week */}
            {(() => {
              const startOfMonth = new Date(currentYear, currentMonth, 1);
              const startDay = startOfMonth.getDay();
              const blankSpaces = [];
              for (let i = 0; i < startDay; i++) {
                blankSpaces.push(
                  <div key={`blank-${i}`} className="h-20"></div>
                );
              }
              return blankSpaces;
            })()}

            {/* Days of the current month */}
            {daysInMonth.map((day) => {
              const formattedDate = `${(currentMonth + 1)
                .toString()
                .padStart(2, "0")}-${day
                .toString()
                .padStart(2, "0")}-${currentYear}`;

              return (
                <div
                  key={day}
                  className="w-16 h-16 border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer"
                  onClick={() => fetchDataForDay(formattedDate)} // Pass formatted date
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: 9:16 Image Viewer in Phone Mockup */}
        <div className="w-1/2 p-4">
          <div className="mockup-phone relative bg-white shadow-xl">
            <div className="camera"></div>
            <div className="display">
              <div className="artboard artboard-demo phone-1 w-full h-full flex items-center justify-center">
                {imageURL ? (
                  <div className="relative w-full h-0 pb-[177.78%] bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={imageURL}
                      alt="Daily Image"
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <p className="text-center text-lg font-semibold text-gray-500">
                    No Image Avaiable
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
