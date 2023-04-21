import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { ReactFlowProvider } from "reactflow";

import "reactflow/dist/style.css";
import "./index.css";

const root = document?.querySelector("#root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>
        <App />
      </ReactFlowProvider>
    </div>
  </React.StrictMode>
);
