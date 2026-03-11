import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/public/LoginPage";
import AboutPage from "../pages/public/AboutPage";
import AdaptationGuidePage from "../pages/public/AdaptationGuidePage";

import StudentOverview from "../pages/student/StudentOverview";
import BuddyOverview from "../pages/buddy/BuddyOverview";

import AdminDashboard from "../pages/admin/AdminDashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/guide" element={<AdaptationGuidePage />} />

      <Route path="/student" element={<StudentOverview />} />
      <Route path="/buddy" element={<BuddyOverview />} />

      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default AppRoutes;