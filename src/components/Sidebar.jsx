import { NavLink } from "react-router-dom";
import {
  HiOutlineSparkles,
  HiOutlineHeart,
  HiOutlineCog6Tooth,
  HiOutlineUserCircle,
  HiOutlineClipboardDocumentList,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import { MdDirectionsCar, MdTwoWheeler, MdDevices } from "react-icons/md";
import ThemeToggle from "./ThemeToggle";

const MAIN_NAV = [
  { to: "/app/home", label: "Dashboard", end: true, Icon: HiOutlineSquares2X2 },
  { to: "/app/cars", label: "Cars", Icon: MdDirectionsCar },
  { to: "/app/bikes", label: "Bikes", Icon: MdTwoWheeler },
  { to: "/app/electronics", label: "Electronics", Icon: MdDevices },
  { to: "/app/ai-assist", label: "AI Assist", Icon: HiOutlineSparkles },
  { to: "/app/orders", label: "Orders", Icon: HiOutlineClipboardDocumentList },
  { to: "/app/favorites", label: "Favorites", Icon: HiOutlineHeart },
];

const SECONDARY_NAV = [
  { to: "/app/settings", label: "Settings", Icon: HiOutlineCog6Tooth },
  { to: "/app/profile", label: "Profile", Icon: HiOutlineUserCircle },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-mark">TD</span>
        <div>
          <h2>TOOLDROP</h2>
          <p>Precision Service</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {MAIN_NAV.map(({ to, label, end, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <Icon size={20} />
            <span className="label">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <ThemeToggle />
        {SECONDARY_NAV.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <Icon size={20} />
            <span className="label">{label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
