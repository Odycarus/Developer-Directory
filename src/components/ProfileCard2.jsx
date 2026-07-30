import { Link } from "react-router-dom";
import "../styles/ProfileCard.css";


function ProfileCard2({
  name,
  id,
  title,
  location
}) {

  return (
    <div className="developer-card">

      <h2>
        {name}
      </h2>


      <p className="developer-affiliation">
        {title}
      </p>


      <p className="developer-location">
        📍 {location}
      </p>


      <Link 
        className="profile-link"
        to={`/developer/${id}`}
      >
        
        View Profile →
      </Link>


    </div>
  );
}


export default ProfileCard2;