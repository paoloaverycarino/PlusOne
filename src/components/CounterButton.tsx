import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useUser } from "../contexts/UserContext"; // Import the context

const CounterButton: React.FC = () => {
  const { username } = useUser(); // Access username from context
  const [counter, setCounter] = useState(0);

  console.log(username);

  // Fetch counter value from Firestore for the specific user
  useEffect(() => {
    if (username) {
      getUserCounter();
    }
  }, [username]);

  const getUserCounter = async () => {
    if (username) {
      const counterRef = doc(db, "counters", username); // Use the username as the document ID
      const docSnap = await getDoc(counterRef);

      if (docSnap.exists()) {
        setCounter(docSnap.data().counter); // Set the counter state with the value from Firestore
      }
    }
  };

  // Increment the counter for the specific user
  const handleIncrementCounter = async () => {
    if (username) {
      const counterRef = doc(db, "counters", username); // Use the username as the document ID
      const docSnap = await getDoc(counterRef); // Check if the document exists

      if (docSnap.exists()) {
        // If the document exists, update the counter
        await updateDoc(counterRef, { counter: counter + 1 });
      } 
      setCounter(counter + 1); // Update local state to reflect new counter
    } 
  };

  return (
    <>
      <button className="font-neue btn btn-wide bg-white bg-opacity-20 backdrop-blur-lg text-white font-bold py-2 px-6 rounded-lg shadow-lg border-2 border-white hover:bg-opacity-40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50" onClick={handleIncrementCounter}>
        +1
      </button>
    </>
  );
};

export default CounterButton;
