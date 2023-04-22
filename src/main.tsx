import React from "react";
import ReactDOM from "react-dom/client";
import { Container, NextUIProvider } from "@nextui-org/react";
import { ReactFlowProvider } from "reactflow";

import App from "./App";
import "reactflow/dist/style.css";

const root = document?.querySelector("#root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <NextUIProvider>
      <Container style={{ width: "100vw", height: "100vh" }}>
        <ReactFlowProvider>
          <App />
        </ReactFlowProvider>
      </Container>
    </NextUIProvider>
  </React.StrictMode>
);
