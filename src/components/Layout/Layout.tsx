import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { ScrollArea } from "../ui/scroll-area";

export default function Layout() {
  return (
    <div className="flex flex-row bg-appbg h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 relative">
        <div className="flex flex-col justify-between h-full">
          <Header />
          <ScrollArea className="flex-1 bg-white rounded p-4 mt-2 ml-4 mb-4 mr-4">
            <Outlet />
          </ScrollArea>
          <Footer />
        </div>
      </div>
    </div>
  );
}
