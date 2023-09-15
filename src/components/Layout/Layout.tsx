import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex flex-row bg-appbg h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 relative">
        <Header />
        <div className="h-[85vh] bg-white rounded p-4 mt-2 ml-4 mb-4 mr-4 overflow-y-scroll">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}
