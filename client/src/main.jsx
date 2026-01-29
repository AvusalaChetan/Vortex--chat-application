import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {CssBaseline} from "@mui/material";
import {HelmetProvider} from "react-helmet-async";
import {Provider} from 'react-redux'
import store from "../src/redux/store.js"

// Suppress unhandled rejection for third-party library checkout config
window.addEventListener("unhandledrejection", (event) => {
  if (event.reason?.message?.includes("checkout popup config")) {
    event.preventDefault();
  }
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <HelmetProvider>
    <CssBaseline />
    <div onContextMenu={(e)=> e.preventDefault()}>
    <App />
    </div>
  </HelmetProvider>
  </Provider>
);
