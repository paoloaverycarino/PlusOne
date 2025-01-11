// src/pages/Hero.tsx
import React, { useState, useEffect } from "react";
import LoginAlert from "../components/LoginAlert";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext"; // Import the context

const Hero: React.FC = () => {
  const [username, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [storedUser1, setStoredUser1] = useState({
    username: "",
    password: "",
  });
  const [storedUser2, setStoredUser2] = useState({
    username: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const { setUsername } = useUser(); // Access setUsername from context
  const navigate = useNavigate();

  const getUserLogin = async () => {
    const user1Ref = doc(db, "counters", "user1");
    const user1Snap = await getDoc(user1Ref);
    if (user1Snap.exists()) {
      const user1Data = user1Snap.data();
      setStoredUser1({
        username: user1Data.username,
        password: user1Data.password,
      });
    } else {
      console.log("No data found for user1");
    }

    const user2Ref = doc(db, "counters", "user2");
    const user2Snap = await getDoc(user2Ref);
    if (user2Snap.exists()) {
      const user2Data = user2Snap.data();
      setStoredUser2({
        username: user2Data.username,
        password: user2Data.password,
      });
    } else {
      console.log("No data found for user2");
    }
  };

  useEffect(() => {
    getUserLogin();
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    console.log("HELLO!");
    event.preventDefault();
    if (
      username === storedUser1.username &&
      password === storedUser1.password
    ) {
      setUsername("user1"); // Update the context with the logged-in user's username
      navigate("/user");
    } else if (
      username === storedUser2.username &&
      password === storedUser2.password
    ) {
      setUsername("user2"); // Update the context with the logged-in user's username
      navigate("/user");
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <body className="bg-white">
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="card bg-gradient-to-b from-[#A0E5EA] to-[#84DB6E] w-96 shadow-2xl border-4 border-white">
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <h1 className="font-neue font-bold text-7xl text-white">
                  PlusOne
                </h1>
                <h3 className="font-neue font-light text-sm text-white">
                  Username
                </h3>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={username}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  required
                />
                <h3 className="font-neue font-light text-sm text-white">
                  Password
                </h3>
                <input
                  type="password"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="card-actions justify-end"></div>
                <button type="submit" className="hidden"></button>
              </div>
            </form>
          </div>
          <div
            className={`transition-opacity duration-1000 ${
              showAlert ? "opacity-100" : "opacity-0"
            }`}
          >
            <LoginAlert />
          </div>
        </div>
      </div>
    </body>
  );
};

//um idk
export default Hero;
