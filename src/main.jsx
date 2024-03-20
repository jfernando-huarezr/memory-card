import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/styles.scss";
import * as bootstrap from "bootstrap";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="container py-4 px-3 mx-auto">
      <h1>Hello, Bootstrap and Vite!</h1>
      <button className="btn btn-primary">Primary button</button>
    </div>
  </React.StrictMode>
);
