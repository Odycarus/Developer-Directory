import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Counter from "../components/Counter";
import SearchBar from "../components/SearchBar";
import LocationFilter from "../components/LocationFilter";
import SortDropdown from "../components/SortDropdown";
import DeveloperList from "../components/DeveloperList";
import { useDeveloperContext } from "../context/DeveloperContext";
import SkeletonList from "../components/SkeletonList";
import DeveloperControls from "../components/DeveloperControls";
import Notification from "../components/Notification";
import "../styles/Notification.css";

import "../styles/Home.css";


function Home() {

  const {
    developers,
    loading,
    error
  } = useDeveloperContext();


  const [selectedLocation, setSelectedLocation] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);


  const location = useLocation();
  const navigate = useNavigate();


  const notification =
    location.state?.notification;



  useEffect(() => {

    if (notification) {

      const timer = setTimeout(() => {

        navigate("/", {
          replace: true,
          state: {},
        });

      }, 3000);


      return () => clearTimeout(timer);

    }

  }, [notification, navigate]);



  const developersPerPage = 9;



  useEffect(() => {

    setCurrentPage(1);

  }, [searchTerm, selectedLocation, sortBy]);



  const locations = [
    "All",
    ...new Set(
      developers.map((developer) =>
        developer.location.split(",")[0]
      )
    ),
  ];



  const filteredDevelopers = developers.filter((developer) => {

    const matchesLocation =
      selectedLocation === "All" ||
      developer.location.includes(selectedLocation);


    const matchesSearch =
      developer.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());


    return matchesLocation && matchesSearch;

  });



  const sortedDevelopers = [...filteredDevelopers].sort((a, b) => {

    switch(sortBy) {

      case "affiliation":
        return a.title.localeCompare(b.title);

      case "location":
        return a.location.localeCompare(b.location);

      default:
        return a.name.localeCompare(b.name);
    }

  });



  const indexOfLastDeveloper =
    currentPage * developersPerPage;


  const indexOfFirstDeveloper =
    indexOfLastDeveloper - developersPerPage;


  const currentDevelopers = sortedDevelopers.slice(
    indexOfFirstDeveloper,
    indexOfLastDeveloper
  );


  const totalPages = Math.ceil(
    sortedDevelopers.length / developersPerPage
  );



  if (loading) {

    return <SkeletonList />;

  }



  if (error) {

    return <p>Error: {error}</p>;

  }



  return (

    <div>


      {notification && (

        <Notification
          message={notification.message}
          type={notification.type}
        />

      )}



      <DeveloperControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        locations={locations}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />



      {
        currentDevelopers.length > 0 ? (

          <DeveloperList
            developers={currentDevelopers}
          />

        ) : (

          <div className="empty-state">

            <h2>
              No developers found.
            </h2>

            <p>
              Try adjusting your search or filters.
            </p>

          </div>

        )
      }



      <div className="pagination">

        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>


        <span>
          Page {currentPage} of {totalPages}
        </span>


        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>

      </div>


    </div>

  );

}


export default Home;