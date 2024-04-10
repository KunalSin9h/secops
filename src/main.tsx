import * as React from "react";
import * as ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@/styles/global.css";
import { invoke } from "@tauri-apps/api";
import RspcProvider from "@/context/rspc";
import Layout from "@/components/Layout/Layout";
import Home from "@/components/Home/Home";
import SSH from "./components/SSH";
import TOR from "./components/TOR";
import Settings from "./components/Settings";
import Help from "./components/Help";
import Firewall from "./components/Firewall";
import {DistroProvider} from './components/context/Distro.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/ssh",
        element: <SSH />,
      },
      { path: "/tor", element: <TOR /> },
      { path: "/settings", element: <Settings /> },
      { path: "/help", element: <Help /> },
      { path: "/ufw", element: <Firewall /> },
    ],
  },
]);

document.addEventListener("DOMContentLoaded", () => {
  invoke("close_loading");
});

ReactDom.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DistroProvider>
    <RspcProvider>
      <RouterProvider router={router} />
    </RspcProvider>
      </DistroProvider>
  </React.StrictMode>,
);
