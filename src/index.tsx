import React from "react";
import ReactDOM from "react-dom/client";
import "./global.scss";
import App from "./App";
import StoreProvider from "./contexts/StoreContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
