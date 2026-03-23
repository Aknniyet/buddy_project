import DashboardLayout from "../../layouts/DashboardLayout";
import SearchBar from "../../components/find-buddies/SearchBar";
import BuddyAlert from "../../components/find-buddies/BuddyAlert";
import BuddyList from "../../components/find-buddies/BuddyList";
import "../../styles/find-buddies.css";

function FindBuddiesPage() {
  return (
    <DashboardLayout title="Find Buddies">
      <section className="find-buddies-page">
        <div className="find-buddies-header">
          <h1>Find a Buddy</h1>
          <p>Browse local students who want to help you adapt</p>
        </div>

        <SearchBar />
        <BuddyAlert />
        <BuddyList />
      </section>
    </DashboardLayout>
  );
}

export default FindBuddiesPage;