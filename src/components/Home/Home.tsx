import { ScrollArea } from "../ui/scroll-area";
import AllServices from "./Services";
import Ubuntu from "./UbuntuBranding";

export default function Home() {
  return (
    <div className="flex gap-4 h-[82vh]">
      <div className="w-1/3 flex flex-col gap-4">
        <div className="h-36 border rounded shadow p-2 flex items-center justify-center">
          <div className="flex gap-4 items-center">
            <img
              src="/ubuntu.png"
              alt="Ubuntu Desktop Logo"
              className="h-24 w-24"
            />
            <Ubuntu />
          </div>
        </div>
        <ScrollArea className="border rounded shadow p-2 h-full">
          <div className="">
            <p className="font-semibold text-xl">Services</p>
            <AllServices />
          </div>
        </ScrollArea>
      </div>

      <ScrollArea className="w-2/3 border rounded shadow p-2">
        <p className="font-bold text-2xl ">Updates</p>
      </ScrollArea>
    </div>
  );
}
