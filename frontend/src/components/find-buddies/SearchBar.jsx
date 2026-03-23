import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="buddy-search">
      <Search size={16} className="buddy-search-icon" />
      <input
        type="text"
        placeholder="Search by name, city, language, or interest..."
      />
    </div>
  );
}

export default SearchBar;