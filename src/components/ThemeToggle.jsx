import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useTheme } from "../context/ThemeProvider";

export default function ThemeToggle({ variant = "sidebar" }) {
  const { toggleTheme, isDark } = useTheme();

  if (variant === "compact") {
    return (
      <button
        type="button"
        className="topbar-icon-btn"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {isDark ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
      </button>
    );
  }

  return (
    <button type="button" className="theme-toggle-btn sidebar-link" onClick={toggleTheme}>
      {isDark ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
      <span className="label">{isDark ? "Light Theme" : "Dark Theme"}</span>
    </button>
  );
}
