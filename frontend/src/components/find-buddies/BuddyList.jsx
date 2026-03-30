import BuddyCard from "./BuddyCard";

function BuddyList({
  buddies = [],
  onConnect,
  hasBuddy = false,
  currentBuddy = null,
}) {
  if (buddies.length === 0) {
    return (
      <div className="buddy-empty-state">
        <h3>No buddies found</h3>
        <p>Try searching with different keywords.</p>
      </div>
    );
  }

  return (
    <div className="buddy-grid">
      {buddies.map((buddy) => (
        <BuddyCard
          key={buddy.id}
          buddy={buddy}
          onConnect={onConnect}
          hasBuddy={hasBuddy}
          currentBuddy={currentBuddy}
        />
      ))}
    </div>
  );
}

export default BuddyList;