 import { Link } from "react-router-dom";
import "../styles/RubberDuck.css";

function RubberDuck() {

  return (

    <Link
      to="/counter"
      className="rubber-duck"
      title="Quack?"
    >
      🐤
    </Link>

  );

}

export default RubberDuck;