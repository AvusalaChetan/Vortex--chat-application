import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {CssBaseline} from "@mui/material";
import {HelmetProvider} from "react-helmet-async";

// Suppress unhandled rejection for third-party library checkout config
window.addEventListener("unhandledrejection", (event) => {
  if (event.reason?.message?.includes("checkout popup config")) {
    event.preventDefault();
  }
});

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <CssBaseline />
    <App />
  </HelmetProvider>
);
