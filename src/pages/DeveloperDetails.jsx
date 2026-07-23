import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDeveloperContext } from "../context/DeveloperContext";
import "../styles/DeveloperDetails.css";


function DeveloperDetails() {

  const { id } = useParams();

  const {
    developers,
    loading,
    error
  } = useDeveloperContext();


  const developer = developers.find(
    (developer) => developer.slug === id
  );

  useEffect(() => {

  if (developer) {

    document.title =
      `${developer.name} | Developer Directory`;

  } else {

    document.title =
      "Developer Not Found | Developer Directory";

  }


  return () => {

    document.title =
      "Developer Directory";

  };

}, [developer]);

  if (loading) {
    return <p>Loading...</p>;
  }


  if (error) {
    return <p>Error: {error}</p>;
  }


  if (!developer) {
    return (
      <div>

        <h1>
          Developer Not Found
        </h1>

        <p>
          The profile you are looking for does not exist.
        </p>

        <Link to="/">
          ← Back to Developers
        </Link>

      </div>
    );
  }


  return (
    <div className="profile-page">

      <Link 
        to="/"
        className="back-link"
      >
        ← Back to Developers
      </Link>


      <hr />


      <div className="profile-header">

        <div className="profile-avatar">
          {developer.name.charAt(0)}
        </div>


        <h1>
          {developer.name}
        </h1>


        <h2>
          {developer.title}
        </h2>


        <p className="profile-location">
          {developer.location}
        </p>

      </div>


      <div className="profile-section">

        <h3>
          Company
        </h3>

        <p>
          {developer.title}
        </p>

      </div>



      <div className="profile-section">

        <h3>
          Skills
        </h3>


        <ul className="skills-container">

          {developer.skills.map((skill) => (

            <li 
              key={skill}
              className="skill-badge"
            >
              {skill}
            </li>

          ))}

        </ul>

      </div>



      <div className="profile-section">

        <h3>
          About
        </h3>

        <p>
          {developer.description}
        </p>

      </div>


    </div>
  );
}


export default DeveloperDetails;