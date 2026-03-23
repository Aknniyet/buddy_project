import { profileData, profileSectionIcons } from "../../constants/profileData";

function ProfileInfoCard() {
  const LanguagesIcon = profileSectionIcons.languages;
  const InterestsIcon = profileSectionIcons.interests;

  return (
    <div className="profile-info-card">
      <div className="profile-info-header">
        <h3>Profile Information</h3>
        <p>Your profile helps buddies get to know you better</p>
      </div>

      <div className="profile-info-grid">
        <div className="profile-field">
          <label>Full Name</label>
          <div className="profile-field-box">{profileData.fullName}</div>
        </div>

        <div className="profile-field">
          <label>Home Country</label>
          <div className="profile-field-box">{profileData.homeCountry}</div>
        </div>

        <div className="profile-field">
          <label>Current City</label>
          <div className="profile-field-box">{profileData.currentCity}</div>
        </div>

        <div className="profile-field">
          <label>Study Program</label>
          <div className="profile-field-box">{profileData.studyProgram}</div>
        </div>
      </div>

      <div className="profile-tags-section">
        <div className="profile-tags-title">
          <LanguagesIcon size={18} />
          <span>Languages Spoken</span>
        </div>

        <div className="profile-tags">
          {profileData.languages.map((language) => (
            <span className="profile-tag" key={language}>
              {language}
            </span>
          ))}
        </div>
      </div>

      <div className="profile-tags-section">
        <div className="profile-tags-title">
          <InterestsIcon size={18} />
          <span>Hobbies & Interests</span>
        </div>

        <div className="profile-tags">
          {profileData.interests.map((interest) => (
            <span className="profile-tag outline" key={interest}>
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileInfoCard;