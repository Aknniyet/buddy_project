import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/public/HomePage";
import AboutPage from "../pages/public/AboutPage";
import AdaptationGuidePage from "../pages/public/AdaptationGuidePage";
import LoginPage from "../pages/public/LoginPage";
import SignupPage from "../pages/public/SignupPage";

import MessagesPage from "../pages/shared/MessagesPage";
import NotificationsPage from "../pages/shared/NotificationsPage";
import ProfilePage from "../pages/shared/ProfilePage";

import StudentOverview from "../pages/student/StudentOverview";
import FindBuddiesPage from "../pages/student/FindBuddiesPage";
import AdaptationChecklistPage from "../pages/student/AdaptationChecklistPage";

import BuddyOverviewPage from "../pages/buddy/BuddyOverviewPage";
import MyBuddiesPage from "../pages/buddy/MyBuddiesPage";
import BuddyRequestsPage from "../pages/buddy/BuddyRequestsPage";

import AdminDashboard from "../pages/admin/AdminDashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/guide" element={<AdaptationGuidePage />} />

      <Route path="/student/messages" element={<MessagesPage userType="student" />} />
      <Route path="/buddy/messages" element={<MessagesPage userType="buddy" />} />

      <Route path="/student/notifications" element={<NotificationsPage userType="student" />} />
      <Route path="/buddy/notifications" element={<NotificationsPage userType="buddy" />} />

      <Route path="/student/profile" element={<ProfilePage userType="student" />} />
      <Route path="/buddy/profile" element={<ProfilePage userType="buddy" />} />

      <Route path="/student/overview" element={<StudentOverview />} />
      <Route path="/student/find-buddies" element={<FindBuddiesPage />} />
      <Route path="/student/checklist" element={<AdaptationChecklistPage />}/>
      
      <Route path="/buddy/overview" element={<BuddyOverviewPage />} />
      <Route path="/buddy/my-buddies" element={<MyBuddiesPage />} />
      <Route path="/buddy/buddy-requests" element={<BuddyRequestsPage />} />

      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default AppRoutes;