import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ReactQueryProvider from "../src/providers/ReactQueryProvider";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <App />
    </ReactQueryProvider>
  </React.StrictMode>
);
