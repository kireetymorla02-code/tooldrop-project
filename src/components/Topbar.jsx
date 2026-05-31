import { Link } from "react-router-dom";
import { HiOutlineBell, HiOutlineMapPin } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import { ROLES } from "../constants/roles";
import { useCustomer } from "../context/CustomerProvider";
import { useLiveClock } from "../hooks/useLiveClock";
import ThemeToggle from "./ThemeToggle";

export default function Topbar() {
  const time = useLiveClock();
  const { role, user } = useAuth();
  const { location, globalSearch, setGlobalSearch, unreadCount } = useCustomer();

  return (
    <header className="topbar">
      <div className="topbar-search-wrap">
        <IoSearch size={18} className="topbar-search-icon" />
        <input
          type="search"
          placeholder="Search brands, services, centers…"
          className="topbar-search"
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
        />
      </div>

      <div className="topbar-actions">
        <Link to="/app/location" className="topbar-location" title="Change location">
          <HiOutlineMapPin size={16} />
          <span>{location?.label || "Set location"}</span>
        </Link>

        <span className="topbar-weather">28°C · Clear</span>
        <span className="topbar-clock">{time}</span>

        <Link to="/app/notifications" className="topbar-icon-btn notif-btn" aria-label="Notifications">
          <HiOutlineBell size={18} />
          {unreadCount > 0 && <span className="notif-dot">{unreadCount}</span>}
        </Link>

        <ThemeToggle variant="compact" />

        <Link to="/app/profile" className="topbar-profile">
          <FaUserCircle size={22} />
          <div>
            <strong>
              {user?.name ||
                (role === ROLES.SUPER_ADMIN
                  ? "Super Admin"
                  : role === ROLES.CENTER_ADMIN
                    ? "Center Admin"
                    : "Member")}
            </strong>
            <span>{user?.phone || user?.email || "+91 User"}</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
