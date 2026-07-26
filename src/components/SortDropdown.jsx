function SortDropdown({ sortBy, setSortBy }) {
  return (
    <div>
      <label>
        Sort By:
      </label>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="name">
          Name (A-Z)
        </option>

        <option value="affiliation">
          Affiliation
        </option>

        <option value="location">
          Location
        </option>

      </select>
    </div>
  );
}

export default SortDropdown;