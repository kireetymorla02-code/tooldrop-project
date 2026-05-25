import { useState, useRef, useEffect } from "react";
import "./App.css";

export default function App() {

  const [screen, setScreen] = useState("splash");
  const [entered, setEntered] = useState(false);

  const [role, setRole] = useState("");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [showWelcome, setShowWelcome] = useState(false);
  const [fadeVideo, setFadeVideo] = useState(false);

  const videoRef = useRef(null);

  // VIDEO LOOP
  useEffect(() => {

    const video = videoRef.current;

    if (!video) return;

    const forcePlay = async () => {

      try {

        await video.play();

      } catch (err) {}

    };

    forcePlay();

    const interval = setInterval(() => {

      if (
        video.ended ||
        video.currentTime >= video.duration - 0.2
      ) {

        video.currentTime = 0;

        forcePlay();

      }

    }, 300);

    return () => clearInterval(interval);

  }, []);

  // ENTER
  const handleEnter = () => {

    setEntered(true);

    setTimeout(() => {
      setScreen("login");
    }, 1800);

  };

  // SEND OTP
  const sendOTP = () => {

    if (phone.length < 10) {

      alert("Enter Valid Number");

      return;
    }

    setScreen("otp");

  };

  // VERIFY
  const verifyOTP = () => {

    if (otp === "1234") {

      // SHOW WELCOME
      setShowWelcome(true);

      // WAIT 2 SEC
      setTimeout(() => {

        // FADE VIDEO + WELCOME
        setFadeVideo(true);

        // GO TO APP
        setTimeout(() => {

          if (role === "admin") {

            setScreen("admin");

          } else {

            setScreen("categories");

          }

        }, 1500);

      }, 2200);

    } else {

      alert("Use OTP: 1234");

    }

  };

  return (
    <>

      {/* VIDEO */}

      {screen !== "categories" &&
       screen !== "admin" && (

        <div className={`video-container ${fadeVideo ? "video-fade" : ""}`}>

          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="bg-video"
          >

            <source
              src="/bg-video.mp4"
              type="video/mp4"
            />

          </video>

          <div className="overlay"></div>

        </div>

      )}

      {/* SPLASH */}

      {screen === "splash" && (

        <div
          className="center splash-screen"
          onClick={handleEnter}
        >

          {!entered ? (

            <div className="splash-content fade-in">

              <h1 className="logo-text">
                TOOLDROP
              </h1>

              <p className="tap-text">
                Tap to Enter
              </p>

            </div>

          ) : (

            <div className="zoom-logo">
              TOOLDROP
            </div>

          )}

        </div>

      )}

      {/* LOGIN */}

      {screen === "login" && (

        <div className="center">

          <div className="glass-box fade-up">

            <h1>TOOLDROP</h1>

            <div className="role-buttons">

              <button
                className={
                  role === "user"
                    ? "active-role"
                    : ""
                }
                onClick={() =>
                  setRole("user")
                }
              >
                User
              </button>

              <button
                className={
                  role === "admin"
                    ? "active-role"
                    : ""
                }
                onClick={() =>
                  setRole("admin")
                }
              >
                Admin
              </button>

            </div>

            <input
              type="text"
              placeholder="+91XXXXXXXXXX"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />

            <button onClick={sendOTP}>
              Send OTP
            </button>

          </div>

        </div>

      )}

      {/* OTP */}

      {screen === "otp" && (

        <div className="center">

          <div className="glass-box fade-up">

            <h1>Enter OTP</h1>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value)
              }
            />

            <button onClick={verifyOTP}>
              Verify OTP
            </button>

          </div>

        </div>

      )}

      {/* WELCOME */}

      {showWelcome && screen !== "categories" && (

        <div className={`welcome-screen ${fadeVideo ? "welcome-fade" : ""}`}>

          <h1>
            WELCOME TO TOOLDROP
          </h1>

        </div>

      )}

      {/* USER DASHBOARD */}

      {screen === "categories" && (

        <div className="mercedes-ui">

          {/* SIDEBAR */}

          <div className="sidebar">

            <h2>TOOLDROP</h2>

            <div className="menu active-menu">
              Dashboard
            </div>

            <div className="menu">
              Services
            </div>

            <div className="menu">
              AI Assist
            </div>

            <div className="menu">
              Vehicles
            </div>

            <div className="menu">
              Settings
            </div>

            <div className="menu">
              Profile
            </div>

          </div>

          {/* MAIN */}

          <div className="main-panel">

            {/* TOP */}

            <div className="top-panel">

              <div>

                <h1>
                  Premium Vehicle Care
                </h1>

                <p>
                  AI Powered Smart Assistance
                </p>

              </div>

              <input
                placeholder="Search..."
                className="search-bar"
              />

            </div>

            {/* CAR GRID */}

            <div className="car-grid">

              <div className="car-card">

                <img
                  src="https://images.unsplash.com/photo-1555215695-3004980ad54e"
                  alt="Mercedes"
                />

                <div className="card-info">

                  <h2>Mercedes</h2>

                  <p>
                    Luxury Service
                  </p>

                </div>

              </div>

              <div className="car-card">

                <img
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
                  alt="Audi"
                />

                <div className="card-info">

                  <h2>Audi</h2>

                  <p>
                    Smart Diagnostics
                  </p>

                </div>

              </div>

              <div className="car-card">

                <img
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7"
                  alt="BMW"
                />

                <div className="card-info">

                  <h2>BMW</h2>

                  <p>
                    AI Recommended Centers
                  </p>

                </div>

              </div>

            </div>

            {/* OPTIONS */}

            <div className="service-options">

              <div className="option-box">
                Service
              </div>

              <div className="option-box">
                Repair
              </div>

              <div className="option-box">
                Tire Change
              </div>

              <div className="option-box">
                Battery
              </div>

              <div className="option-box">
                Insurance
              </div>

            </div>

          </div>

        </div>

      )}

    </>
  );
}