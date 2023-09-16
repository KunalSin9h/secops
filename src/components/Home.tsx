import { rspc } from "@/context/rspc";
import { ScrollArea } from "./ui/scroll-area";
import { StoppedIcon } from "@/lib/icons";

export default function Home() {
  return (
    <div className="flex gap-4 h-[82vh]">
      <div className="w-1/2 flex flex-col gap-4">
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
        <ScrollArea className="border rounded shadow p-2 h-full"></ScrollArea>
      </div>
      <ScrollArea className="w-1/2 border rounded shadow p-2">
        <div className="">
          <p className="font-semibold text-2xl">Services</p>
          <div className="flex justify-around mt-4">
            <div>
              <div className="flex items-center gap-2">
                <AnimatePing />
                <span className="text-xl">Running</span>
              </div>
              <ul className="mt-4">
                {new Array(10).fill(0).map((_, idx) => (
                  <li key={idx} className="p-1 w-36 mb-2">
                    Hello
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <StoppedIcon />
                <span className="text-xl">Stopped</span>
              </div>
              <ul className="mt-4">
                {new Array(5).fill(0).map((_, idx) => (
                  <li key={idx} className="p-1 w-36 mb-2">
                    Hello
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

// This will collect information about the distro
// The data will be like this
// DISTRIB_ID=Ubuntu
// DISTRIB_RELEASE=22.04
// DISTRIB_CODENAME=jammy
// DISTRIB_DESCRIPTION="Ubuntu 22.04.3 LTS"
function Ubuntu() {
  const { data, isLoading, error } = rspc.useQuery(["get_distro"]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const info = data.split("\n");
  const release = info[2].replace("DISTRIB_CODENAME=", "");
  const distro = info[3].replace('DISTRIB_DESCRIPTION="', "").replace('"', "");

  return (
    <div className="flex flex-col">
      <span className="text-purple-800 font-semibold">{release}</span>
      <span className="font-bold text-2xl">{distro}</span>
    </div>
  );
}

// https://tailwindcss.com/docs/animation#ping
function AnimatePing() {
  return (
    <span className="relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
    </span>
  );
}
