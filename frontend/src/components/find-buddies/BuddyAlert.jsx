import { Check } from "lucide-react";

function BuddyAlert() {
  return (
    <div className="buddy-alert">
      <Check size={18} />
      <p>You already have a buddy! Check your messages to stay connected.</p>
    </div>
  );
}

export default BuddyAlert;