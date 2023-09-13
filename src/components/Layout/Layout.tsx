import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="flex flex-row bg-appbg h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="p-4">
        <div>header</div>
        <Outlet />
        <div>footer</div>
      </div>
    </div>
  );
}
