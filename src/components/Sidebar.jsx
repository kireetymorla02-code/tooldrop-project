import { NavLink } from "react-router-dom";
import {
  HiOutlineBell,
  HiOutlineCog6Tooth,
  HiOutlineGift,
  HiOutlineSparkles,
  HiOutlineUserCircle,
  HiOutlineClipboardDocumentList,
  HiOutlineSquares2X2,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import { MdDirectionsCar, MdTwoWheeler, MdDevices } from "react-icons/md";
import ThemeToggle from "./ThemeToggle";
import { useCustomer } from "../context/CustomerProvider";

const MAIN_NAV = [
  { to: "/app/home", label: "Dashboard", end: true, Icon: HiOutlineSquares2X2 },
  { to: "/app/cars", label: "Cars", Icon: MdDirectionsCar },
  { to: "/app/bikes", label: "Bikes", Icon: MdTwoWheeler },
  { to: "/app/electronics", label: "Electronics", Icon: MdDevices },
  { to: "/app/orders", label: "My Orders", Icon: HiOutlineClipboardDocumentList },
  { to: "/app/notifications", label: "Notifications", Icon: HiOutlineBell, badge: true },
  { to: "/app/ai-assist", label: "AI Assistant", Icon: HiOutlineSparkles },
  { to: "/app/rewards", label: "Rewards", Icon: HiOutlineGift },
  { to: "/app/emergency", label: "Emergency", Icon: HiOutlineExclamationTriangle },
];

const SECONDARY_NAV = [
  { to: "/app/support", label: "Support", Icon: HiOutlineClipboardDocumentList },
  { to: "/app/profile", label: "Profile", Icon: HiOutlineUserCircle },
  { to: "/app/settings", label: "Settings", Icon: HiOutlineCog6Tooth },
];

export default function Sidebar() {
  const { unreadCount } = useCustomer();

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
        {MAIN_NAV.map(({ to, label, end, Icon, badge }) => (
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
            {badge && unreadCount > 0 && (
              <span className="nav-badge">{unreadCount}</span>
            )}
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
