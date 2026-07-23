import ProfileCard2 from "./ProfileCard2";
import "../styles/DeveloperList.css";

function DeveloperList({ developers }) {
  return (
    <div className="developer-grid">

      {developers.map((developer) => (
        <ProfileCard2
          key={developer.slug}
          {...developer}
        />
      ))}

    </div>
  );
}

export default DeveloperList;