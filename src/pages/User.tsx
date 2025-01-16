import React, { useState, useEffect } from "react";
import CounterButton from "../components/CounterButton";
import ContributionGraph from "../components/ContributionGraph";
import UploadToday from "../components/UploadToday";
import UserSelect from "../components/UserSelect";
import { Link } from "react-router-dom";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useUser } from "../contexts/UserContext";

const User: React.FC = () => {
  const { username } = useUser();
  const [userCounter, setUserCounter] = useState<number>(0); // Store the logged-in user counter
  const [selectedUserCounter, setSelectedUserCounter] = useState<number>(0); // Store the selected user's counter
  const [selectedUserLoggedInStatus, setSelectedUserLoggedInStatus] =
    useState<boolean>(false); // Logged-in status of selected user
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedUserUsername, setSelectedUserUsername] = useState<string>("");

  useEffect(() => {
    if (username) {
      getUserCounter(username); // Fetch counter for logged-in user
    }
  }, [username]);

  useEffect(() => {
    if (selectedUser) {
      getUserCounter(selectedUser); // Fetch counter for selected user
      fetchLoggedInStatus(selectedUser); // Fetch logged-in status for selected user
      fetchSelectedUserUsername(selectedUser); // Fetch username for selected user
    }
  }, [selectedUser]);

  const fetchLoggedInStatus = async (user: string) => {
    const today = new Date();
    const formattedDate = `${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today
      .getDate()
      .toString()
      .padStart(2, "0")}-${today.getFullYear()}`;

    const userLoginRef = doc(
      db,
      `counters/${user}/dailyLogins/${formattedDate}`
    );

    try {
      const userLoginSnap = await getDoc(userLoginRef);
      if (userLoginSnap.exists()) {
        console.log("Fetched user login status:", userLoginSnap.data());
        setSelectedUserLoggedInStatus(userLoginSnap.data().loggedIn || false);
      } else {
        console.log(
          `No login data found for ${user} on ${formattedDate}. Setting loggedInStatus to false.`
        );
        setSelectedUserLoggedInStatus(false); // No data found, set to false
      }
    } catch (error) {
      console.error("Error fetching logged-in status:", error);
    }
  };

  const fetchSelectedUserUsername = async (userId: string) => {
    const userRef = doc(db, "counters", userId); // Fetch the document of the selected user
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      setSelectedUserUsername(userData?.username || "Unknown User");
    }
  };

  const getUserCounter = async (user: string) => {
    const userRef = doc(db, "counters", user); // Use the username as the document ID
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      if (user === username) {
        setUserCounter(userSnap.data().counter || 0); // Set the logged-in user's counter
      } else {
        setSelectedUserCounter(userSnap.data().counter || 0); // Set the selected user's counter
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white overflow-hidden">
      <div className="h-[90vh] flex items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center gap-6 mb-4">
          {/* Progress Card  */}
          <div className="card bg-black w-[20rem] h-[20rem] lg:w-[32rem] lg:h-[32rem] shadow-2xl">
            <div className="card-body flex flex-col items-center space-y-4 text-center">
              <h1 className="card-title font-neue font-bold text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#FED90B] to-[#FF8C00] leading-[1.2] hidden lg:flex">
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
                    <div className="stat-title font-neue font-bold text-black text text-sm lg:text-base">
                      Calendar Gallery
                    </div>
                  </Link>
                </div>
                <div className="stat flex items-center justify-center rounded-md bg-white transform transition-all duration-300 ease-in-out hover:scale-105">
                  <Link
                    to="/training"
                    className="w-full h-full flex items-center justify-center"
                  >
                    <div className="stat-title font-neue font-bold text-black text-sm lg:text-base">
                      Training Regime
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-5">
            {/* Left Counter (Logged-in User) */}
            <div className="card glass bg-gradient-to-b from-[#7691CB] to-[#45FFF0] shadow-2xl w-full lg:w-max h-[250px] lg:h-[515px]">
              <div className="card-body items-center flex-col justify-between h-full text-center">
                <div>
                  <h1 className="card-title font-neue font-bold text-3xl lg:text-8xl text-white">
                    Total
                  </h1>
                </div>
                <h1 className="card-title font-neue font-bold text-[3rem] lg:text-[10rem] text-white">
                  {userCounter}
                </h1>
                <div className="card-actions">
                  <CounterButton
                    currentCounter={userCounter}
                    onCounterUpdate={(newCounter) => setUserCounter(newCounter)}
                  />
                </div>
              </div>
            </div>

            {/* Right Counter (Selected User) */}
            <div className="card glass bg-gradient-to-b from-[#ED373A] to-[#6929A1] shadow-2xl w-full lg:w-max h-[250px] lg:h-[515px]">
              <div className="card-body items-center flex-col justify-between h-full text-center">
                <h1 className="card-title font-neue font-bold text-3xl lg:text-8xl text-white">
                  Total
                </h1>
                <div className="flex flex-col justify-between items-center h-full">
                  <h1 className="card-title font-neue font-bold text-[3rem] lg:text-[10rem] text-white pt-7 lg:pt-32 pb-11 lg:pb-0 text-white">
                    {selectedUserCounter}
                  </h1>
                  <UserSelect
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                  />
                </div>
                <div className="card-actions">
                  <button className="font-neue btn btn-wide hidden lg:block bg-white bg-opacity-20 backdrop-blur-lg text-white font-bold py-2 px-6 rounded-lg shadow-lg border-2 border-white hover:bg-opacity-40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 opacity-1">
                    {selectedUserLoggedInStatus
                      ? `${selectedUserUsername} went to the gym!`
                      : `${selectedUserUsername} has not gone to the gym!`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-screen flex justify-center items-center hidden lg:flex">
        <ContributionGraph />
      </div>
    </div>
  );
};

export default User;
