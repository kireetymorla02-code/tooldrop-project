/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Segoe UI"', "system-ui", "sans-serif"],
      },
      colors: {
        luxury: {
          black: "var(--bg-primary)",
          panel: "var(--bg-panel)",
          accent: "var(--accent)",
          gold: "var(--accent-gold)",
        },
      },
      boxShadow: {
        glow: "var(--shadow-glow)",
        card: "var(--shadow-card)",
      },
    },
  },
  plugins: [],
};
