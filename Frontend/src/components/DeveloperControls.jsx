import SearchBar from "./SearchBar";
import LocationFilter from "./LocationFilter";
import SortDropdown from "./SortDropdown";
import "../styles/DeveloperControls.css";

function DeveloperControls({
  searchTerm,
  setSearchTerm,
  locations,
  selectedLocation,
  setSelectedLocation,
  sortBy,
  setSortBy,
}) {

  return (
    <div className="developer-controls">

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <LocationFilter
        locations={locations}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />

      <SortDropdown
        sortBy={sortBy}
        setSortBy={setSortBy}
      />


    </div>
  );
}

export default DeveloperControls;