import { useMemo, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import NotificationsHeader from "../../components/notifications/NotificationsHeader";
import NotificationsToolbar from "../../components/notifications/NotificationsToolbar";
import NotificationsList from "../../components/notifications/NotificationsList";
import NotificationsEmptyState from "../../components/notifications/NotificationsEmptyState";
import { studentNotifications } from "../../constants/studentNotificationsData";
import { buddyNotifications } from "../../constants/buddyNotificationsData";
import "../../styles/notifications.css";

function NotificationsPage({ userType = "student" }) {
  const initialNotifications =
    userType === "buddy" ? buddyNotifications : studentNotifications;

  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications]
  );

  const handleMarkRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, read: true }))
    );
  };

  return (
    <DashboardLayout
      title="Notifications"
      sidebarType={userType === "buddy" ? "buddy" : "student"}
    >
      <section className="notifications-page">
        <div className="notifications-page-top">
          <NotificationsHeader unreadCount={unreadCount} />
          <NotificationsToolbar onMarkAllRead={handleMarkAllRead} />
        </div>

        <div className="notifications-card">
          <div className="notifications-card-header">
            <h3>Recent Notifications</h3>
            <p>Stay updated on your buddy connections</p>
          </div>

          {notifications.length > 0 ? (
            <NotificationsList
              notifications={notifications}
              onMarkRead={handleMarkRead}
              onDelete={handleDelete}
            />
          ) : (
            <NotificationsEmptyState />
          )}
        </div>
      </section>
    </DashboardLayout>
  );
}

export default NotificationsPage;