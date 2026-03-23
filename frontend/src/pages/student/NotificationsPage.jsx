import { CheckCheck } from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import NotificationItem from "../../components/notifications/NotificationItem";
import { internationalStudentNotifications } from "../../constants/notificationsData";
import "../../styles/notifications.css";

function NotificationsPage() {
  const unreadCount = internationalStudentNotifications.filter(
    (item) => !item.read
  ).length;

  return (
    <DashboardLayout title="Notifications">
      <section className="notifications-page">
        <div className="notifications-page-top">
          <div className="notifications-page-header">
            <h1>Notifications</h1>
            <p>
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${
                    unreadCount > 1 ? "s" : ""
                  }`
                : "You're all caught up!"}
            </p>
          </div>

          <button type="button" className="mark-all-btn">
            <CheckCheck size={18} />
            <span>Mark all as read</span>
          </button>
        </div>

        <div className="notifications-card">
          <div className="notifications-card-header">
            <h3>Recent Notifications</h3>
            <p>Stay updated on your buddy connections</p>
          </div>

          <div className="notifications-list">
            {internationalStudentNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default NotificationsPage;