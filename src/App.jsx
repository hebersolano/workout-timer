import { useState } from "react";
import { formatTime } from "./helpers";
import Calculator from "./Calculator";

import Time from "./Time";

function App() {
  // Will be AM or PM
  const partOfDay = formatTime(new Date()).slice(-2);

  const workouts = [
    {
      name: "Full-body workout",
      numExercises: partOfDay === "AM" ? 9 : 8,
    },
    {
      name: "Arms + Legs",
      numExercises: 6,
    },
    {
      name: "Arms only",
      numExercises: 3,
    },
    {
      name: "Legs only",
      numExercises: 4,
    },
    {
      name: "Core only",
      numExercises: partOfDay === "AM" ? 5 : 4,
    },
  ];

  return (
    <main>
      <h1>Workout timer</h1>
      <Time />
      <Calculator workouts={workouts} />
    </main>
  );
}

export default App;
