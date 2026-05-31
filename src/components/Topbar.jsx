import { HiOutlineBell, HiOutlinePlus } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import { useLiveClock } from "../hooks/useLiveClock";
import ThemeToggle from "./ThemeToggle";

export default function Topbar() {
  const time = useLiveClock();
  const { phone, role } = useAuth();

  return (
    <header className="topbar">
      <div className="topbar-search-wrap">
        <IoSearch size={18} className="topbar-search-icon" />
        <input
          type="search"
          placeholder="Search services, brands, centers..."
          className="topbar-search"
        />
      </div>

      <div className="topbar-actions">
        <span className="topbar-clock">{time}</span>
        <button type="button" className="topbar-icon-btn" aria-label="Notifications">
          <HiOutlineBell size={18} />
        </button>
        <ThemeToggle variant="compact" />
        <button type="button" className="topbar-quick-btn">
          <HiOutlinePlus size={16} />
          Quick Book
        </button>
        <div className="topbar-profile">
          <FaUserCircle size={22} />
          <div>
            <strong>{role === "admin" ? "Admin" : "Member"}</strong>
            <span>{phone || "+91 User"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
