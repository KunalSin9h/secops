import * as React from "react";
import * as ReactDom from "react-dom/client";
import App from "@/App";
import "@/styles/global.css";
import RspcProvider from "./context/rspc";

ReactDom.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RspcProvider>
      <App />
    </RspcProvider>
  </React.StrictMode>,
);
