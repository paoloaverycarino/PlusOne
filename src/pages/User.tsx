import React, { useState, useEffect } from "react";
import CounterButton from "../components/CounterButton";
import ContributionGraph from "../components/ContributionGraph";
import UploadToday from "../components/UploadToday";
import { Link } from "react-router-dom";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useUser } from "../contexts/UserContext";

const User: React.FC = () => {
  const { username } = useUser();
  const [user1Counter, setUser1Counter] = useState<number>(0);
  const [user2Counter, setUser2Counter] = useState<number>(0);
  const [user1LoggedIn, setUser1LoggedIn] = useState<boolean>(false);
  const [user2LoggedIn, setUser2LoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (username) {
      getUserCounter();
      fetchLoggedInStatus();
    }
  }, [username]);

  const fetchLoggedInStatus = async () => {
    const today = new Date();
    const formattedDate = `${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today
      .getDate()
      .toString()
      .padStart(2, "0")}-${today.getFullYear()}`;

    const user1LoginRef = doc(
      db,
      `counters/user1/dailyLogins/${formattedDate}`
    );
    const user2LoginRef = doc(
      db,
      `counters/user2/dailyLogins/${formattedDate}`
    );

    try {
      const user1LoginSnap = await getDoc(user1LoginRef);
      const user2LoginSnap = await getDoc(user2LoginRef);

      if (user1LoginSnap.exists()) {
        setUser1LoggedIn(user1LoginSnap.data().loggedIn || false);
      }
      if (user2LoginSnap.exists()) {
        setUser2LoggedIn(user2LoginSnap.data().loggedIn || false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getUserCounter = async () => {
    const user1Ref = doc(db, "counters", "user1"); // Use the username as the document ID
    const user2Ref = doc(db, "counters", "user2"); // Use the username as the document ID

    const user1Snap = await getDoc(user1Ref);
    const user2Snap = await getDoc(user2Ref);

    if (user1Snap.exists()) {
      setUser1Counter(user1Snap.data().counter || 0); // Set the counter state with the value from Firestore
    }

    if (user2Snap.exists()) {
      setUser2Counter(user2Snap.data().counter || 0); // Set the counter state with the value from Firestore
    }
  };

  const handleUser1CounterUpdate = (newCounter: number) => {
    setUser1Counter(newCounter); // Update the local state in User component when the counter changes
  };

  const handleUser2CounterUpdate = (newCounter: number) => {
    setUser2Counter(newCounter); // Update the local state in User component when the counter changes
  };

  const isUser1 = username === "user1";

  return (
    <body className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="h-[90vh] flex items-center justify-center">
        <div className="flex gap-6 mb-4">
      

          {/* Progress Card  */}
          <div className="card bg-black w-[32rem] h-[32rem] shadow-2xl">
            <div className="card-body flex flex-col items-center space-y-4 text-center">
              <h1 className="card-title font-neue font-bold text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#FED90B] to-[#FF8C00] leading-[1.2]">
                Progress
              </h1>
              <div className="grid grid-cols-2 grid-rows-2 gap-6 w-full h-full">
                <div className="stats shadow col-span-1 row-span-2">
                  <div className="card bg-white">
                    <UploadToday />
                  </div>
                </div>
                <div className="stat flex items-center justify-center rounded-md bg-white transform transition-all duration-300 ease-in-out hover:scale-105">
                  <Link
                    to="/calendar"
                    className="w-full h-full flex items-center justify-center"
                  >
                    <div className="stat-title font-neue font-bold text-black">
                      Calendar Gallery
                    </div>
                  </Link>
                </div>
                <div className="stat flex items-center justify-center rounded-md bg-white transform transition-all duration-300 ease-in-out hover:scale-105">
                  <Link
                    to="/training"
                    className="w-full h-full flex items-center justify-center"
                  >
                    <div className="stat-title font-neue font-bold text-black">
                      Training Regime
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

{/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

          {/* Conditional layout based on user */}
          {isUser1 ? (
            <>
              {/* User 1 Counter on the Left */}
              <div className="card glass bg-gradient-to-b from-[#7691CB] to-[#45FFF0] w-80 shadow-2xl">
                <div className="card-body items-center flex-col justify-between h-full text-center">
                  <div>
                  <h1 className="card-title font-neue font-bold text-8xl text-white">
                    Total
                  </h1>
                  </div>
                  <h1 className="card-title font-neue font-bold text-[10rem] text-white">
                    {user1Counter}
                  </h1>
                  <div className="card-actions">
                    <CounterButton
                      currentCounter={user1Counter}
                      onCounterUpdate={handleUser1CounterUpdate}
                    />
                  </div>
                </div>
              </div>
              <div className="card glass bg-gradient-to-b from-[#ED373A] to-[#6929A1] w-80 shadow-2xl">
                <div className="card-body items-center flex-col justify-between h-full text-center">
                  <h1 className="card-title font-neue font-bold text-8xl text-white">
                    Total
                  </h1>
                  <h1 className="card-title font-neue font-bold text-[10rem] text-white">
                    {user2Counter}
                  </h1>
                  <div className="card-actions">
                    <button className="font-neue btn btn-wide bg-white bg-opacity-20 backdrop-blur-lg text-white font-bold py-2 px-6 rounded-lg shadow-lg border-2 border-white hover:bg-opacity-40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 opacity-1">
                      {user2LoggedIn
                        ? "Andy went to the gym!"
                        : "Andy has not gone to the gym!"}
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* User 2 Counter on the Left */}
              <div className="card glass bg-gradient-to-b from-[#ED373A] to-[#6929A1] w-80 shadow-2xl">
                <div className="card-body items-center flex-col justify-between h-full text-center">
                  <h1 className="card-title font-neue font-bold text-8xl text-white">
                    Total
                  </h1>
                  <h1 className="card-title font-neue font-bold text-[10rem] text-white">
                    {user2Counter}
                  </h1>
                  <div className="card-actions">
                    <CounterButton
                      currentCounter={user2Counter}
                      onCounterUpdate={handleUser2CounterUpdate}
                    />
                  </div>
                </div>
              </div>
              <div className="card glass bg-gradient-to-b from-[#7691CB] to-[#45FFF0] w-80 shadow-2xl ">
                <div className="card-body items-center flex-col justify-between h-full text-center">
                  <h1 className="card-title font-neue font-bold text-8xl text-white">
                    Total
                  </h1>
                  <h1 className="card-title font-neue font-bold text-[10rem] text-white ">
                    {user1Counter}
                  </h1>
                  <div className="card-actions">
                    <button className="font-neue btn btn-wide bg-white bg-opacity-20 backdrop-blur-lg text-white font-bold py-2 px-6 rounded-lg shadow-lg border-2 border-white hover:bg-opacity-40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 opacity-1">
                      {user1LoggedIn
                        ? "Paolo went to the gym!"
                        : "Paolo has not gone to the gym!"}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="h-screen flex justify-center items-center">
        <ContributionGraph />
      </div>
    </body>
  );
};

export default User;
