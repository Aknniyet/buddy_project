import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/public/HomePage";
import AboutPage from "../pages/public/AboutPage";
import AdaptationGuidePage from "../pages/public/AdaptationGuidePage";
import LoginPage from "../pages/public/LoginPage";
import SignupPage from "../pages/public/SignupPage";

import StudentOverview from "../pages/student/StudentOverview";
import BuddyOverview from "../pages/buddy/BuddyOverview";

import AdminDashboard from "../pages/admin/AdminDashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/guide" element={<AdaptationGuidePage />} />

      <Route path="/student" element={<StudentOverview />} />
      <Route path="/buddy" element={<BuddyOverview />} />

      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default AppRoutes;