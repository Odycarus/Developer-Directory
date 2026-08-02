function LocationFilter({
  locations,
  selectedLocation,
  setSelectedLocation,
}) {
  return (
    <select
      value={selectedLocation}
      onChange={(e) => setSelectedLocation(e.target.value)}
    >
      {locations.map((location) => (
        <option key={location} value={location}>
          {location}
        </option>
      ))}
    </select>
  );
}

export default LocationFilter;