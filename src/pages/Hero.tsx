import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [storedUsername, setStoredUsername] = useState("");
  const [storedPassword, setStoredPassword] = useState("");

  const navigate = useNavigate();

  const getUserLogin = async () => {
    const login1Ref = doc(db, "counters", "user1"); // Reference to user-specific document
    const doc1Snap = await getDoc(login1Ref);

    if (doc1Snap.exists()) {
      //const data = docSnap.data();
      setStoredUsername(doc1Snap.data().username); // Set the username state with the value from Firestore
      setStoredPassword(doc1Snap.data().password); // Set the password state with the value from Firestore
    }

    const login2Ref = doc(db, "counters", "user2"); // Reference to user-specific document
    const doc2Snap = await getDoc(login2Ref);

    if (doc2Snap.exists()) {
      //const data = docSnap.data();
      setStoredUsername(doc2Snap.data().username); // Set the username state with the value from Firestore
      setStoredPassword(doc2Snap.data().password); // Set the password state with the value from Firestore
    }
  };

  useEffect(() => {
    getUserLogin();
  }, []);

  const handleSubmitClick = () => {
    if (username === storedUsername && password === storedPassword) {
      navigate("/user");
    }
  };

  return (
    <body className="bg-[#525252]">
      <div className="flex items-center justify-center min-h-screen">
        <div className="card bg-gradient-to-b from-[#FF6422] to-[#99147C] w-96 shadow-xl border-4 border-whi">
          <div className="card-body">
            <h1 className="font-neue font-bold text-4xl text-white">PlusOne</h1>
            <h3 className="font-neue font-light text-sm text-white">
              Username
            </h3>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <h3 className="font-neue font-light text-sm text-white">
              Password
            </h3>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="card-actions justify-end">
              <button
                className="btn btn-sm btn-primary"
                onClick={handleSubmitClick}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Hero;
