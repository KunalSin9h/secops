import * as React from "react";
import * as ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@/styles/global.css";
import RspcProvider from "@/context/rspc";
import Layout from "@/components/Layout/Layout";
import Home from "@/components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
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
