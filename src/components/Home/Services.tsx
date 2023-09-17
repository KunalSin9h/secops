import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";
import { client } from "@/context/rspc";
import { StoppedIcon } from "@/lib/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import AnimatePing from "./AnimatePing";

export default function AllServices() {
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
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-around mt-2 xl:mt-4">
      <div className="w-1/2 px-2 xl:px-6">
        <div className="flex items-center gap-1 xl:gap-2">
          <AnimatePing />
          <span className="font-semibold">Running</span>
        </div>
        <div
          role="list"
          className="py-2 xl:py-4 px-1 xl:px-2 divide-y divide-slate-200"
        >
          {running.map((service, idx) => {
            return (
              <div
                key={idx}
                className="px-2 xl:px-4 py-1 xl:py-2 hover:bg-slate-200 active:bg-slate-300 rounded cursor-pointer w-full"
              >
                <Popover>
                  <PopoverTrigger className="w-full text-left text-sm xl:text-md">
                    {service}
                  </PopoverTrigger>
                  <PopoverContent className="w-90">
                    <div className="flex gap-1 xl:gap-2">
                      <Button
                        variant={"default"}
                        onClick={(e) => {
                          e.preventDefault();
                          invoke("ipc_get_status", { service }).catch(
                            console.log,
                          );
                        }}
                      >
                        Status
                      </Button>
                      <Button
                        variant={"secondary"}
                        onClick={(e) => {
                          e.preventDefault();
                          invoke("ipc_enable_service", { service }).catch(
                            console.log,
                          );
                        }}
                      >
                        Enable
                      </Button>
                      <Button
                        variant={"secondary"}
                        onClick={(e) => {
                          e.preventDefault();
                          invoke("ipc_disable_service", { service }).catch(
                            console.log,
                          );
                        }}
                      >
                        Disable
                      </Button>
                      <Button
                        variant={"destructive"}
                        onClick={(e) => {
                          e.preventDefault();
                          invoke("ipc_stop_service", { service }).catch(
                            console.log,
                          );
                        }}
                      >
                        Stop
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-1/2 px-2 xl:px-6">
        <div className="flex items-center gap-1 xl:gap-2">
          <StoppedIcon />
          <span className="font-semibold">Stopped</span>
        </div>
        <div
          role="list"
          className="py-2 xl:py-4 px-1 xl:px-2 divide-y divide-slate-200"
        >
          {stopped.map((service, idx) => {
            return (
              <div
                key={idx}
                className="px-2 xl:px-4 py-1 xl:py-2 hover:bg-slate-200 active:bg-slate-300 rounded cursor-pointer w-full"
              >
                <Popover>
                  <PopoverTrigger className="w-full text-left text-sm xl:text-md">
                    {service}
                  </PopoverTrigger>
                  <PopoverContent className="w-90">
                    <div className="flex gap-1 xl:gap-2">
                      <Button
                        variant={"default"}
                        onClick={(e) => {
                          e.preventDefault();
                          invoke("ipc_get_status", { service }).catch(
                            console.log,
                          );
                        }}
                      >
                        Status
                      </Button>
                      <Button
                        variant={"secondary"}
                        onClick={(e) => {
                          e.preventDefault();
                          invoke("ipc_enable_service", { service }).catch(
                            console.log,
                          );
                        }}
                      >
                        Enable
                      </Button>
                      <Button
                        variant={"secondary"}
                        onClick={(e) => {
                          e.preventDefault();
                          invoke("ipc_disable_service", { service }).catch(
                            console.log,
                          );
                        }}
                      >
                        Disable
                      </Button>
                      <Button
                        variant={"default"}
                        className="bg-green-600 hover:bg-green-700"
                        onClick={(e) => {
                          e.preventDefault();
                          invoke("ipc_start_service", { service }).catch(
                            console.log,
                          );
                        }}
                      >
                        Start
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
