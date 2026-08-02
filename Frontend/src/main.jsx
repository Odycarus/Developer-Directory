import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css'
import App from './App.jsx'
import { DeveloperProvider } from './context/DeveloperContext'
import "./styles/global.css";
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>

    <DeveloperProvider>

      <ThemeProvider>

        <App />

      </ThemeProvider>

    </DeveloperProvider>

  </StrictMode>
);