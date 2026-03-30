import {
  BookOpen,
  Globe,
  MapPin,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

function BuddyCard({ buddy, onConnect, hasBuddy, currentBuddy }) {
  const isConnected = currentBuddy?.id === buddy.id;
  const isUnavailable = hasBuddy && !isConnected;

  return (
    <article className="buddy-card">
      <div className="buddy-card-header">
        <img
          src={buddy.avatar}
          alt={buddy.name}
          className="buddy-card-avatar"
        />

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

        {isConnected ? (
          <button type="button" className="connect-btn connected-btn" disabled>
            <CheckCircle2 size={16} />
            <span>Connected</span>
          </button>
        ) : (
          <button
            type="button"
            className="connect-btn"
            onClick={() => {
              if (!isUnavailable) onConnect(buddy);
            }}
            disabled={isUnavailable}
          >
            <MessageSquare size={16} />
            <span>{isUnavailable ? "Unavailable" : "Connect"}</span>
          </button>
        )}
      </div>
    </article>
  );
}

export default BuddyCard;