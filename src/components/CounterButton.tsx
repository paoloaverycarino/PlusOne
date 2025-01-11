import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const CounterButton: React.FC = () => {
  const [counter, setCounter] = useState(0);

  // Fetch counter value from Firestore when the component mounts
  useEffect(() => {
    getUserCounter();
  }, []);

  // Get counter value from Firestore
  const getUserCounter = async () => {
    const counterRef = doc(db, "counters", "user1"); // Reference to user-specific document
    const docSnap = await getDoc(counterRef);

    if (docSnap.exists()) {
      setCounter(docSnap.data().counter); // Set the counter state with the value from Firestore
    } else {
      await setDoc(counterRef, { counter: 0 }); // If document doesn't exist, create it with an initial value
      setCounter(0); // Initialize local state
    }
  };

  // Increment the counter in Firestore
  const handleIncrementCounter = async () => {
    const counterRef = doc(db, "counters", "user1"); // Reference to user-specific document
    await setDoc(counterRef, { counter: counter + 1 }); // Update Firestore with the new counter value
    setCounter(counter + 1); // Update local state to reflect new counter
  };
  return (
    <>
        <button className="btn btn-wide" onClick={handleIncrementCounter}>Hello</button>
    </>
  );
}

export default CounterButton;