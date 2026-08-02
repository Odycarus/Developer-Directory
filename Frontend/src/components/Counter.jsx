import { useEffect, useState } from "react";

function Counter() {

  const [count, setCount] = useState(0);

  useEffect(() => {

  const hasVisited = sessionStorage.getItem("visitedCounter");

  let savedCount =
    Number(localStorage.getItem("secretCounter")) || 0;

  if (!hasVisited) {

    savedCount += 1;

    localStorage.setItem("secretCounter", savedCount);

    sessionStorage.setItem("visitedCounter", "true");

  }

  setCount(savedCount);

}, []);

  return (

    <div className="centered-page">

      <h1>🎉 Secret Page 🎉 </h1>

              <img
    src="images.jpeg"
    alt="Rubber duck"
  />
      <p>
        Congratulations! You are now playing Skyrim.
      </p>

      <h2>{count}</h2>

    </div>

  );

}

export default Counter;