import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { useUser } from "../contexts/UserContext";

interface CounterButtonProps {
  currentCounter: number;
  onCounterUpdate: (newCounter: number) => void;
}

const CounterButton: React.FC<CounterButtonProps> = ({
  currentCounter,
  onCounterUpdate,
}) => {
  const { username } = useUser();
  const [loggedIn, setLoggedIn] = useState<boolean>(false); // State to track if the user is logged in

  useEffect(() => {
    const dailyLoginRef = doc(
      db,
      `counters/${username}/dailyLogins/${getFormattedDate()}`
    );
    const unsubscribe = onSnapshot(dailyLoginRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLoggedIn(data?.loggedIn || false);
      }
    });

    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, [username]);

  const getFormattedDate = () => {
    const today = new Date();
    return `${(today.getMonth() + 1).toString().padStart(2, "0")}-${today
      .getDate()
      .toString()
      .padStart(2, "0")}-${today.getFullYear()}`;
  };

  const handleIncrementCounter = async () => {
    if (username && !loggedIn) {
      const counterRef = doc(db, "counters", username);
      const dailyLoginRef = doc(
        db,
        `counters/${username}/dailyLogins/${getFormattedDate()}`
      );

      try {
        // Ensure the counter document exists
        const counterSnap = await getDoc(counterRef);
        if (!counterSnap.exists()) {
          await setDoc(counterRef, { counter: 0 }); // Initialize counter if not present
        }

        // Update the counter value
        await setDoc(
          counterRef,
          { counter: currentCounter + 1 },
          { merge: true }
        );

        // Ensure the daily login document exists and update its fields
        await setDoc(
          dailyLoginRef,
          {
            imageURL: "",
            loggedIn: true,
          },
          { merge: true }
        );

        // Update local state
        onCounterUpdate(currentCounter + 1);
      } catch (error) {
        console.error("Error updating counter or daily login:", error);
      }
    }
  };

  return (
    <>
      <button
        className="font-neue btn btn-wide bg-white bg-opacity-20 backdrop-blur-lg text-white font-bold py-2 px-6 rounded-lg shadow-lg border-2 border-white hover:bg-opacity-40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        onClick={handleIncrementCounter}
        disabled={loggedIn} // Disable the button if loggedIn is true
      >
        +1
      </button>
    </>
  );
};

export default CounterButton;
