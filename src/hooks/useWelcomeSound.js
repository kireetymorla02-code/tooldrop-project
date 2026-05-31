import { useEffect, useRef } from "react";

export function useWelcomeSound() {
  const played = useRef(false);

  useEffect(() => {
    if (played.current) return;
    played.current = true;

    const audio = new Audio(`${process.env.PUBLIC_URL}/sound.mp3`);
    audio.volume = 0.55;
    audio.play().catch(() => {
      // Autoplay may be blocked until user interaction; splash/login counts as gesture chain
    });
  }, []);
}
