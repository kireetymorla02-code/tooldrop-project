# ToolDrop — Project Structure

```
src/
├── assets/
│   ├── videos/bg-video.mp4
│   ├── logos/
│   └── images/
├── components/
│   ├── Sidebar.jsx
│   ├── Topbar.jsx
│   ├── ServiceCard.jsx
│   ├── ThemeToggle.jsx
│   ├── Loader.jsx
│   └── StatusTimeline.jsx
├── pages/
│   ├── Splash.jsx, Login.jsx, OTP.jsx, Welcome.jsx, Dashboard.jsx
│   ├── cars/ …
│   ├── bikes/ …
│   ├── electronics/ …
│   ├── orders/ …
│   ├── profile/ …
│   └── admin/ …
├── layouts/
│   ├── MainLayout.jsx
│   └── AdminLayout.jsx
├── routes/
│   └── AppRoutes.jsx
├── styles/
│   ├── global.css
│   ├── animations.css
│   ├── theme.css
│   └── glass.css
├── data/
│   ├── cars.js, bikes.js, electronics.js, centers.js
├── context/          # Auth + theme providers
├── hooks/            # useLiveClock
├── constants/        # Demo OTP
├── App.js
└── index.js
```

## Run

```bash
npm start
```

Demo OTP: `1234`
