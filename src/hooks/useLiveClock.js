import { useEffect, useState } from "react";

function formatClock(date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function useLiveClock() {
  const [time, setTime] = useState(() => formatClock(new Date()));

  useEffect(() => {
    const tick = () => setTime(formatClock(new Date()));
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}
