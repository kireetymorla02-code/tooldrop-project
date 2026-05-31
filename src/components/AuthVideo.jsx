import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthProvider";
import bgVideo from "../assets/videos/bg-video.mp4";

export default function AuthVideo() {
  const { videoFading } = useAuth();
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      const result = video.play();
      if (result?.catch) result.catch(() => {});
    };

    const onEnded = () => {
      video.currentTime = 0;
      play();
    };

    play();
    video.addEventListener("ended", onEnded);
    video.addEventListener("loadeddata", play);
    video.addEventListener("canplay", play);

    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
    };
  }, []);

  return (
    <div className={`auth-video-wrap ${videoFading ? "fading" : ""}`} aria-hidden>
      <video
        ref={videoRef}
        className="auth-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src={bgVideo}
      />
      <div className="auth-video-overlay" />
    </div>
  );
}
