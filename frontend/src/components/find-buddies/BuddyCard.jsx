import { BookOpen, Globe, MapPin, MessageSquare } from "lucide-react";

function BuddyCard({ buddy }) {
  return (
    <article className="buddy-card">
      <div className="buddy-card-header">
        <img src={buddy.avatar} alt={buddy.name} className="buddy-card-avatar" />

        <div className="buddy-card-user-info">
          <h3>{buddy.name}</h3>

          <div className="buddy-card-location">
            <MapPin size={14} />
            <span>{buddy.city}</span>
          </div>
        </div>
      </div>

      <div className="buddy-card-details">
        <div className="buddy-detail-row">
          <BookOpen size={14} />
          <span>{buddy.program}</span>
        </div>

        <div className="buddy-detail-row">
          <Globe size={14} />
          <span>{buddy.languages}</span>
        </div>
      </div>

      <p className="buddy-card-bio">{buddy.bio}</p>

      <div className="buddy-tags">
        {buddy.interests.map((tag) => (
          <span key={tag} className="buddy-tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="buddy-card-footer">
        <p>{buddy.spotsAvailable} spots available</p>

        <button className="connect-btn">
          <MessageSquare size={16} />
          <span>Connect</span>
        </button>
      </div>
    </article>
  );
}

export default BuddyCard;