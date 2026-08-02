import { createContext, useContext, useState, useEffect } from "react";


const ThemeContext = createContext();


export function ThemeProvider({ children }) {


const [brightMode, setBrightMode] = useState(() => {

  const savedTheme = localStorage.getItem("brightMode");

  return savedTheme === "true";

});


useEffect(() => {

  if (brightMode) {

    document.body.classList.add("bright-mode");

  } else {

    document.body.classList.remove("bright-mode");

  }

  localStorage.setItem("brightMode", brightMode);

}, [brightMode]);


  const toggleTheme = () => {
    setBrightMode(!brightMode);
  };


  return (
    <ThemeContext.Provider
      value={{
        brightMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}


export function useTheme() {
  return useContext(ThemeContext);
}