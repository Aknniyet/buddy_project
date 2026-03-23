import BuddyCard from "./BuddyCard";
import { buddiesList } from "../../constants/findBuddiesData";

function BuddyList() {
  return (
    <div className="buddy-grid">
      {buddiesList.map((buddy) => (
        <BuddyCard key={buddy.id} buddy={buddy} />
      ))}
    </div>
  );
}

export default BuddyList;