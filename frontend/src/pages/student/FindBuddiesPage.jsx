import { useMemo, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import SearchBar from "../../components/find-buddies/SearchBar";
import BuddyAlert from "../../components/find-buddies/BuddyAlert";
import BuddyList from "../../components/find-buddies/BuddyList";
import BuddyRequestModal from "../../components/find-buddies/BuddyRequestModal";
import { buddiesList } from "../../constants/findBuddiesData";
import "../../styles/find-buddies.css";

function FindBuddiesPage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedBuddy, setSelectedBuddy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBuddy, setCurrentBuddy] = useState(null);

  const filteredBuddies = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    if (!query) return buddiesList;

    return buddiesList.filter((buddy) => {
      const searchableText = [
        buddy.name,
        buddy.city,
        buddy.program,
        buddy.languages,
        buddy.bio,
        ...(buddy.interests || []),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [searchValue]);

  const handleOpenModal = (buddy) => {
    if (currentBuddy) return;

    setSelectedBuddy(buddy);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBuddy(null);
    setIsModalOpen(false);
  };

  const handleSendRequest = (data) => {
    console.log("Buddy request sent:", data);

    const matchedBuddy = buddiesList.find((buddy) => buddy.id === data.buddyId);

    if (matchedBuddy) {
      setCurrentBuddy(matchedBuddy);
    }

    handleCloseModal();
  };

  return (
    <DashboardLayout title="Find Buddies" sidebarType="student">
      <section className="find-buddies-page">
        <div className="find-buddies-header">
          <h1>Find a Buddy</h1>
          <p>Browse local students who want to help you adapt</p>
        </div>

        <SearchBar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />

        {currentBuddy && <BuddyAlert buddyName={currentBuddy.name} />}

        <BuddyList
          buddies={filteredBuddies}
          onConnect={handleOpenModal}
          hasBuddy={!!currentBuddy}
          currentBuddy={currentBuddy}
        />

        <BuddyRequestModal
          buddy={selectedBuddy}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSend={handleSendRequest}
        />
      </section>
    </DashboardLayout>
  );
}

export default FindBuddiesPage;