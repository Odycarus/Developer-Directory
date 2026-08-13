import SearchBar from "./SearchBar";
import LocationFilter from "./LocationFilter";
import SkillFilter from "./SkillFilter";
import SortDropdown from "./SortDropdown";

import "../styles/DeveloperControls.css";

function DeveloperControls({
  searchTerm,
  setSearchTerm,
  locations,
  selectedLocation,
  setSelectedLocation,
  skills,
  selectedSkills,
  setSelectedSkills,
  sortBy,
  setSortBy,
}) {

  return (

    <div className="developer-controls">

      <div className="control-group">
        <label htmlFor="developer-search">
          Search
        </label>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>


      <LocationFilter
        locations={locations}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />


      <div className="control-group">
        <label htmlFor="sort-by">
          Sort By
        </label>

        <SortDropdown
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>


      <SkillFilter
        skills={skills}
        selectedSkills={selectedSkills}
        setSelectedSkills={setSelectedSkills}
      />

    </div>

  );
}

export default DeveloperControls;