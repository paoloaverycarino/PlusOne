import React, { useState, useEffect } from "react";
import HomeButton from "../components/HomeButton";
import { db } from "../services/firebase"; // Path to your Firebase config
import { doc, getDoc } from "firebase/firestore";
import { useUser } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingScreen"; // Import the LoadingSpinner component

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // State to track selected date
  const [imageURL, setImageURL] = useState<string | null>(null); // State to hold image URL for the clicked date
  const [loginStatuses, setLoginStatuses] = useState<Record<string, boolean>>(
    {}
  ); // State to track login status for each day
  const [loading, setLoading] = useState<boolean>(false); // State to track loading status
  const { username } = useUser();

  // Get the current year and month
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Get the number of days in the current month
  const getDaysInCurrentMonth = () => {
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
    setSelectedDate(null); // Reset selected date
  };

  // Navigate to the next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    setSelectedDate(null); // Reset selected date
  };

  // Fetch login status for each day of the current month
  const fetchLoginStatusesForMonth = async () => {
    setLoading(true); // Show the spinner

    const statuses: Record<string, boolean> = {};

    for (let day = 1; day <= daysInMonth.length; day++) {
      const formattedDate = `${(currentMonth + 1)
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}-${currentYear}`;

      const docRef = doc(
        db,
        `counters/${username}/dailyLogins/${formattedDate}`
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        statuses[formattedDate] = data?.loggedIn || false;
      } else {
        statuses[formattedDate] = false; // No data for this day
      }
    }

    setLoginStatuses(statuses); // Update the state with all login statuses
    setLoading(false); // Hide the spinner once loading is done
  };

  // Fetch image for the clicked day
  const fetchImageForDay = async (dateString: string) => {
    setSelectedDate(dateString); // Update selected date
    const docRef = doc(db, `counters/${username}/dailyLogins/${dateString}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data?.imageURL) {
        setImageURL(data.imageURL);
      } else {
        console.log("Field 'imageURL' does not exist in the document.");
        setImageURL(null);
      }
    } else {
      console.log("No data found for this day.");
      setImageURL(null); // Reset the image URL if no data is found
    }
  };

  // Use useEffect to get the days in the current month and login statuses for all days
  useEffect(() => {
    getDaysInCurrentMonth();
    fetchLoginStatusesForMonth(); // Fetch login statuses for all days
  }, [currentDate, daysInMonth.length]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="absolute top-5 left-5">
          <HomeButton />
        </div>
        <div className="flex items-start justify-center space-x-8">
          {/* Left: Calendar Grid */}
          <div className="w-1/2 p-4 border">
            <div className="flex justify-between items-center w-full mb-6">
              <button
                onClick={goToPreviousMonth}
                className="px-4 py-2 text-sm text-white glass font-bold bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                &lt; Previous
              </button>
              <span className="text-2xl font-neue text-black font-bold">{`${currentDate.toLocaleString(
                "default",
                {
                  month: "long",
                }
              )} ${currentYear}`}</span>
              <button
                onClick={goToNextMonth}
                className="px-4 py-2 text-sm glass text-white font-bold bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Next &gt;
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-4 w-full">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day) => (
                  <div
                    key={day}
                    className="flex items-center justify-center font-semibold text-gray-600"
                  >
                    {day}
                  </div>
                )
              )}
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
                const isLoggedIn = loginStatuses[formattedDate];

                return (
                  <div
                    key={day}
                    className={`w-16 h-16 border-2 rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-300 ease-in-out ${
                      selectedDate === formattedDate
                        ? "glass bg-blue-500 text-white"
                        : isLoggedIn
                        ? "bg-green-500 text-white" // Green for logged-in days
                        : "bg-white border-gray-300 hover:bg-gray-200"
                    }`}
                    onClick={() => fetchImageForDay(formattedDate)}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
            {/* View All Images Button */}
            <div className="flex justify-center mt-6">
              <Link to="/gallery">
                <button
                  className="px-6 py-3 glass text-white bg-green-500 rounded-lg font-bold text-lg 
               hover:bg-green-600 hover:scale-105 active:scale-110 
               transition-transform duration-200"
                >
                  View All Images
                </button>
              </Link>
            </div>
          </div>

          {/* Right: Image Viewer */}
          <div className="w-1/2 p-4">
            <div className="mockup-phone relative bg-black shadow-2xl">
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
                      No Image Available
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Show the loading spinner while data is loading */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-white z-50 scale-150">
            <LoadingSpinner />
          </div>
        )}
    </>
  );
};

export default Calendar;