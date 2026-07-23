function ProfileCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.title}</p>
      <p>{props.location}</p>

      <h3>Skills</h3>
      <ul>
        {props.skills.map((skill) => (
          <li>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileCard;