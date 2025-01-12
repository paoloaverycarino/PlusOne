import React, { useState } from "react";

// Define the type for each exercise
interface Exercise {
  name: string;
  sets: number;
  weight: number[];
}

// Define the type for the exercises object
interface Exercises {
  legPush: Exercise[];
  legPull: Exercise[];
}

// Define the data for exercises (example data, can be dynamic or fetched from an API)
const exercises: Exercises = {
  legPush: [
    { name: "Squat", sets: 3, weight: [100, 110, 115] },
    { name: "Leg Press", sets: 3, weight: [200, 210, 215] },
    { name: "Lunges", sets: 3, weight: [40, 45, 50] },
    { name: "Leg Extensions", sets: 3, weight: [80, 85, 90] },
    { name: "Leg Curls", sets: 3, weight: [60, 65, 70] },
    { name: "Calf Raises", sets: 3, weight: [80, 85, 90] },
  ],
  legPull: [
    { name: "Deadlift", sets: 3, weight: [150, 160, 165] },
    { name: "Romanian Deadlift", sets: 3, weight: [120, 130, 135] },
    { name: "Pull-Ups", sets: 3, weight: [200, 200, 200] },
    { name: "Hamstring Curls", sets: 3, weight: [50, 55, 60] },
    { name: "Back Extensions", sets: 3, weight: [40, 45, 50] },
    { name: "Glute Bridges", sets: 3, weight: [70, 75, 80] },
  ],
};

const Training: React.FC = () => {
  // State for tracking selected category (Leg Push or Pull)
  const [currentCategory, setCurrentCategory] = useState<"legPush" | "legPull">("legPush");

  // Select exercises for the current category
  const exercisesForCurrentCategory = exercises[currentCategory];

  // Pagination logic (6 exercises per page)
  const exercisesPerPage = 6;
  const totalPages = Math.ceil(exercisesForCurrentCategory.length / exercisesPerPage);

  // State for pagination (which page is selected)
  const [currentPage, setCurrentPage] = useState(0);

  // Handle category toggle (Leg Push or Leg Pull)
  const toggleCategory = (category: "legPush" | "legPull") => {
    setCurrentCategory(category);
    setCurrentPage(0); // Reset to first page when toggling categories
  };

  // Slice the exercises to display the current page's exercises
  const currentExercises = exercisesForCurrentCategory.slice(
    currentPage * exercisesPerPage,
    (currentPage + 1) * exercisesPerPage
  );

  // Function to handle the change of radio button selection
  const handleRadioChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-8xl font-bold mb-10">Training Regime</h1>
  
      {/* Replace button with menu for switching categories */}
      <ul className="menu menu-horizontal flex items-center justify-center w-[500px] bg-base-200 rounded-box mb-4">
        <li>
          <a onClick={() => toggleCategory("legPush")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </a>
        </li>
        <li>
          <a onClick={() => toggleCategory("legPull")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </a>
        </li>
        <li>
          <a onClick={() => toggleCategory("legPush")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </a>
        </li>
      </ul>
  
      <h1 className="text-4xl font-bold mb-4">{currentCategory === "legPush" ? "Leg Push" : "Leg Pull"}</h1>
      <div className="bg-black space-y-5 w-full max-w-4xl rounded-md pt-4">
        {currentExercises.map((exercise, index) => (
          <div key={index} className="flex justify-center items-center border-b pb-4">
            <h2 className="font-neue font-bold text-white text-5xl w-1/3">{exercise.name}</h2>
            <div className="flex-1 ml-4">
              <p className="font-bold text-white">Sets:</p>
              <ul>
                {Array(exercise.sets)
                  .fill(null)
                  .map((_, setIndex) => (
                    <li key={setIndex} className="text-white">
                      Set {setIndex + 1}: {exercise.weight[setIndex]} kg
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Training;
