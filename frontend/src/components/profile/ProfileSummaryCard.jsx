import { profileData, profileSummaryItems } from "../../constants/profileData";

function ProfileSummaryCard() {
  return (
    <div className="profile-summary-card">
      <div className="profile-summary-top">
        <img
          src={profileData.avatar}
          alt={profileData.fullName}
          className="profile-avatar"
        />

        <h2>{profileData.fullName}</h2>

        <span className="profile-role-badge">{profileData.role}</span>

        <p className="profile-email">{profileData.email}</p>
      </div>

      <div className="profile-divider" />

      <div className="profile-summary-list">
        {profileSummaryItems.map((item) => {
          const Icon = item.icon;

          return (
            <div className="profile-summary-item" key={item.id}>
              <Icon size={18} />
              <span className="summary-label">{item.label}</span>
              <span className="summary-value">{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProfileSummaryCard;