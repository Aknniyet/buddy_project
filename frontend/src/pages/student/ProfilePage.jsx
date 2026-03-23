import DashboardLayout from "../../layouts/DashboardLayout";
import ProfileSummaryCard from "../../components/profile/ProfileSummaryCard";
import ProfileInfoCard from "../../components/profile/ProfileInfoCard";
import "../../styles/profile.css";

function ProfilePage() {
  return (
    <DashboardLayout title="Profile">
      <section className="profile-page">
        <div className="profile-page-top">
          <div className="profile-page-header">
            <h1>Profile</h1>
            <p>Manage your personal information</p>
          </div>

          <button type="button" className="edit-profile-btn">
            Edit Profile
          </button>
        </div>

        <div className="profile-layout">
          <ProfileSummaryCard />
          <ProfileInfoCard />
        </div>
      </section>
    </DashboardLayout>
  );
}

export default ProfilePage;