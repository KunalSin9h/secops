import { useEffect, useState } from "react";
import { client, rspc } from "@/context/rspc";
import { ScrollArea } from "./ui/scroll-area";
import { StoppedIcon } from "@/lib/icons";

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

function AllServices() {
  const [running, setRunning] = useState<string[]>(["Loading..."]);
  const [stopped, setStopped] = useState<string[]>(["Loading..."]);

  useEffect(() => {
    const timer = setInterval(async () => {
      try {
        const data = await client.query(["get_services"]);
        const running_services: string[] = [];
        const stopped_services: string[] = [];

        for (const service of data.split("\n")) {
          if (service.startsWith(" [ + ]  ")) {
            running_services.push(service.replace(" [ + ]  ", ""));
          } else {
            stopped_services.push(service.replace(" [ - ]  ", ""));
          }
        }

        setRunning(running_services);
        setStopped(stopped_services);
      } catch (err) {
        console.error(err);
      }
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-around mt-4">
      <div className="w-1/2 px-6">
        <div className="flex items-center gap-2">
          <AnimatePing />
          <span className="font-semibold">Running</span>
        </div>
        <ul role="list" className="py-4 px-2 divide-y divide-slate-200">
          {running.map((service, idx) => {
            return (
              <li
                key={idx}
                data-service-name={service}
                className="px-4 py-2 hover:bg-slate-200 active:bg-slate-300 rounded cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {service}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-1/2 px-6">
        <div className="flex items-center gap-2">
          <StoppedIcon />
          <span className="font-semibold">Stopped</span>
        </div>
        <ul role="list" className="py-4 px-2 divide-y divide-slate-200">
          {stopped.map((service, idx) => {
            return (
              <li
                key={idx}
                data-service-name={service}
                className="px-4 py-2 hover:bg-slate-200 active:bg-slate-300 rounded cursor-pointer"
              >
                {service}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
