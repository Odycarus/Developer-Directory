function LocationFilter({
  locations,
  selectedLocation,
  setSelectedLocation,
}) {

  return (
    <div className="location-filter">

      <label htmlFor="location-filter">
        Location
      </label>

      <select
        id="location-filter"
        value={selectedLocation}
        onChange={(event) =>
          setSelectedLocation(event.target.value)
        }
      >

        {locations.map((location) => (
          <option
            key={location}
            value={location}
          >
            {location}
          </option>
        ))}

      </select>

    </div>
  );
}

export default LocationFilter;