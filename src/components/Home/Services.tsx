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
import LoadingList from "./LoadingList";
import toastError from "@/lib/toastError";

export default function AllServices() {
  const [running, setRunning] = useState<string[]>();
  const [stopped, setStopped] = useState<string[]>();

  // This refresh state is to fetch new data when ever a new
  // interaction will happen by the use
  const [refresh, setRefresh] = useState(false);

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
        toastError(err as string);
      }
    }, 10000);
    return () => clearInterval(timer);
  }, [refresh]);

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
          {running ? (
            running.map((service, idx) => {
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
                            invoke("get_status", { service }).catch(toastError);
                            setRefresh(!refresh);
                          }}
                        >
                          Status
                        </Button>
                        <Button
                          variant={"secondary"}
                          onClick={(e) => {
                            e.preventDefault();
                            invoke("enable_service", { service }).catch(
                              toastError,
                            );

                            setRefresh(!refresh);
                          }}
                        >
                          Enable
                        </Button>
                        <Button
                          variant={"secondary"}
                          onClick={(e) => {
                            e.preventDefault();
                            invoke("disable_service", { service }).catch(
                              toastError,
                            );

                            setRefresh(!refresh);
                          }}
                        >
                          Disable
                        </Button>
                        <Button
                          variant={"destructive"}
                          onClick={(e) => {
                            e.preventDefault();
                            invoke("stop_service", { service }).catch(
                              toastError,
                            );
                            setRefresh(!refresh);
                          }}
                        >
                          Stop
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              );
            })
          ) : (
            <LoadingList size={10} />
          )}
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
          {stopped ? (
            stopped.map((service, idx) => {
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
                            invoke("get_status", { service }).catch(toastError);

                            setRefresh(!refresh);
                          }}
                        >
                          Status
                        </Button>
                        <Button
                          variant={"secondary"}
                          onClick={(e) => {
                            e.preventDefault();
                            invoke("enable_service", { service }).catch(
                              toastError,
                            );

                            setRefresh(!refresh);
                          }}
                        >
                          Enable
                        </Button>
                        <Button
                          variant={"secondary"}
                          onClick={(e) => {
                            e.preventDefault();
                            invoke("disable_service", { service }).catch(
                              toastError,
                            );

                            setRefresh(!refresh);
                          }}
                        >
                          Disable
                        </Button>
                        <Button
                          variant={"default"}
                          className="bg-green-600 hover:bg-green-700"
                          onClick={(e) => {
                            e.preventDefault();
                            invoke("start_service", { service }).catch(
                              toastError,
                            );

                            setRefresh(!refresh);
                          }}
                        >
                          Start
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              );
            })
          ) : (
            <LoadingList size={6} />
          )}
        </div>
      </div>
    </div>
  );
}
