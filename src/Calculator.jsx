import { useEffect, useReducer, useState } from "react";
import clickSound from "./ClickSound.m4a";
import ToggleSounds from "./ToggleSounds";

function reducer(state, action) {
  const { type, payload } = action;
  let { number, sets, speed, durationBreak, duration } = state;

  switch (type) {
    case "initDuration": {
      duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;
      return { ...state, duration };
    }
    case "setNumber": {
      duration = (payload * sets * speed) / 60 + (sets - 1) * durationBreak;
      return { ...state, number: payload, duration };
    }
    case "setSets": {
      duration = (number * payload * speed) / 60 + (sets - 1) * durationBreak;
      return { ...state, sets: payload, duration };
    }
    case "setSpeed": {
      duration = (number * sets * payload) / 60 + (sets - 1) * durationBreak;
      return { ...state, speed: payload, duration };
    }
    case "setBreak": {
      duration = (number * sets * speed) / 60 + (sets - 1) * payload;
      return { ...state, durationBreak: payload, duration };
    }
    case "duration+": {
      return { ...state, duration: ++duration };
    }
    case "duration-": {
      return { ...state, duration: --duration };
    }
  }
}

function Calculator({ workouts }) {
  const [state, dispatch] = useReducer(reducer, {
    number: workouts.at(0).numExercises,
    sets: 3,
    speed: 90,
    durationBreak: 5,
    duration: (workouts.at(0).numExercises * 3 * 90) / 60 + (3 - 1) * 5, //decided to calculate the duration in the initState
  });

  const { number, sets, speed, durationBreak, duration } = state;
  const [allowSound, setAllowSound] = useState(true);
  // const [number, setNumber] = useState(workouts.at(0).numExercises);
  // const [sets, setSets] = useState(3);
  // const [speed, setSpeed] = useState(90);
  // const [durationBreak, setDurationBreak] = useState(5);
  // const [duration, setDuration] = useState(0);
  // const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;

  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  const playSound = function () {
    if (!allowSound) return;
    const sound = new Audio(clickSound);
    sound.play();
  };

  // CALC INIT DURATION STATE if it is not calculate in the initState
  // useEffect(function calcDurationInit() {
  //   dispatch({ type: "initDuration" });
  // }, []);

  return (
    <>
      <ToggleSounds allowSound={allowSound} setAllowSound={setAllowSound} />
      <form>
        <div>
          <label>Type of workout</label>
          <select
            value={number}
            onChange={(e) => dispatch({ type: "setNumber", payload: +e.target.value })}
          >
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => dispatch({ type: "setSets", payload: +e.target.value })}
          />
          <span>{sets}</span>
        </div>

        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => dispatch({ type: "setSpeed", payload: +e.target.value })}
          />
          <span>{speed} sec/exercise</span>
        </div>

        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => dispatch({ type: "setBreak", payload: +e.target.value })}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button
          onClick={() => {
            dispatch({ type: "duration-" });
            playSound();
          }}
        >
          –
        </button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button
          onClick={() => {
            dispatch({ type: "duration+" });
            playSound();
          }}
        >
          +
        </button>
      </section>
    </>
  );
}

export default Calculator;
