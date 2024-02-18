import { useEffect, useState } from "react";
import { formatTime } from "./helpers";

function Time() {
  const [time, setTime] = useState(formatTime(new Date()));

  useEffect(function () {
    const id = setInterval(function () {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <time>For your workout on {time}</time>;
}

export default Time;
