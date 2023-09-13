import * as React from "react";
import * as ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@/styles/global.css";
import RspcProvider from "@/context/rspc";
import Layout from "@/components/Layout/Layout";
import Home from "@/components/Home";
import SSH from "./components/SSH";
import TOR from "./components/TOR";
import Settings from "./components/Settings";
import Help from "./components/Help";

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
    ],
  },
]);

ReactDom.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RspcProvider>
      <RouterProvider router={router} />
    </RspcProvider>
  </React.StrictMode>,
);
