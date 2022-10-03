import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SettingsProvider } from "./contexts/SettingsContext";
import { DisplayProvider } from "./contexts/SettingsDisplayContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SettingsProvider>
    <DisplayProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </DisplayProvider>
  </SettingsProvider>
);
