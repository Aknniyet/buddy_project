import DashboardLayout from "../../layouts/DashboardLayout";
import ProfilePageHeader from "../../components/profile/ProfilePageHeader";
import ProfileSummaryCard from "../../components/profile/ProfileSummaryCard";
import ProfileInfoCard from "../../components/profile/ProfileInfoCard";
import { studentProfileData } from "../../constants/studentProfileData";
import { buddyProfileData } from "../../constants/buddyProfileData";
import "../../styles/profile.css";

function ProfilePage({ userType = "student" }) {
  const isBuddy = userType === "buddy";
  const profile = isBuddy ? buddyProfileData : studentProfileData;

  return (
    <DashboardLayout
      title="Profile"
      sidebarType={isBuddy ? "buddy" : "student"}
    >
      <section className="profile-page">
        <div className="profile-page-top">
          <ProfilePageHeader />

          <button type="button" className="edit-profile-btn">
            Edit Profile
          </button>
        </div>

        <div className="profile-layout">
          <ProfileSummaryCard profile={profile} />
          <ProfileInfoCard profile={profile} />
        </div>
      </section>
    </DashboardLayout>
  );
}

export default ProfilePage;