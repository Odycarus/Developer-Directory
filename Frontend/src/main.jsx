import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DeveloperProvider } from "./context/DeveloperContext";
import "./styles/global.css";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <AuthProvider>

    <DeveloperProvider>

      <ThemeProvider>

        <App />

      </ThemeProvider>

    </DeveloperProvider>

  </AuthProvider>
);
