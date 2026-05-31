import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";
import { useCustomer } from "../context/CustomerProvider";

const TYPE_ICONS = {
  pickup: "🚗",
  collected: "✓",
  arrived: "📍",
  inspection: "🔍",
  report: "📋",
  progress: "🔧",
  ready: "✨",
  delivered: "🎉",
};

export default function Notifications() {
  const { notifications, markNotificationRead, markAllRead, unreadCount, syncing } = useCustomer();

  return (
    <div>
      <PageHeader
        eyebrow="Inbox"
        title="Notifications"
        subtitle={`${unreadCount} unread · real-time service updates`}
        action={
          unreadCount > 0 ? (
            <button type="button" className="tab-btn" onClick={markAllRead}>
              Mark all read
            </button>
          ) : null
        }
      />

      {syncing && !notifications.length && <Loader label="Loading notifications…" />}

      <div className="notification-list">
        {notifications.map((n, i) => (
          <motion.div
            key={n.id}
            className={`notification-item ${n.read ? "read" : "unread"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => markNotificationRead(n.id)}
            role="button"
            tabIndex={0}
          >
            <span className="notif-icon">{TYPE_ICONS[n.type] || "🔔"}</span>
            <div>
              <strong>{n.title}</strong>
              <p className="muted">{n.message}</p>
              <span className="notif-time">{n.time}</span>
            </div>
            {!n.read && <span className="unread-dot" />}
          </motion.div>
        ))}
      </div>

      {!syncing && !notifications.length && (
        <EmptyState title="All caught up" message="Notifications from bookings and service updates appear here." />
      )}
    </div>
  );
}
