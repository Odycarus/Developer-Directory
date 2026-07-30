import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/DeveloperDetails.css";

function DeveloperDetails() {

  const { id } = useParams();

  const [developer, setDeveloper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch one developer from Django
  useEffect(() => {

    async function fetchDeveloper() {

      try {

        const response = await fetch(
          `http://127.0.0.1:8000/api/developers/${id}/`
        );

        if (!response.ok) {
          throw new Error("Developer not found.");
        }

        const data = await response.json();

        setDeveloper(data);

      } catch (err) {

        setError(err.message);

      } finally {

        setLoading(false);

      }

    }

    fetchDeveloper();

  }, [id]);

  // Update browser title
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

          {developer.avatar ? (
            <img
              src={developer.avatar}
              alt={developer.name}
            />
          ) : (
            developer.name.charAt(0)
          )}

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
          Affiliation
        </h3>

        <p>
          {developer.affiliation}
        </p>

      </div>

      <div className="profile-section">

        <h3>
          Skills
        </h3>

        <ul className="skills-container">

          {developer.skills
  .split(",")
  .map((skill) => skill.trim())
  .map((skill) => (

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