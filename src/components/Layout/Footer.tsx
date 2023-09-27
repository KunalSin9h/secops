import { useEffect, useState } from "react";
import { listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api";
import {
  PassIcon,
  AngleIcon,
  DustbinIcon,
  FailIcon,
  RunningIcon,
  WarnIcon,
  ExpandIcon,
  CollapsIcon,
} from "@/lib/icons";
import { ScrollArea } from "../ui/scroll-area";
import toastError, { toastInfo } from "@/lib/toastError";

type ExecutionStatePayload = {
  title: string;
  state: "passing" | "failing" | "pass" | "fail";
  message: string;
  pid: number;
};

export default function Footer() {
  const initialTitle = "All clear!";

  const [icon, setIcon] = useState(<PassIcon />);
  const [half, setHalf] = useState(false);
  const [full, setFull] = useState(false);
  const [fullIcon, setFullIcon] = useState(<ExpandIcon />);
  const [title, setTitle] = useState(initialTitle);
  const [pid, setPid] = useState<number>();

  useEffect(() => {
    const logList = document.getElementById("log-list") as HTMLElement;
    const dummyLast = document.getElementById("dummy-last") as HTMLElement;

    (async () => {
      await listen("execution_state", (event) => {
        const payload = event.payload as ExecutionStatePayload;

        switch (payload.state) {
          case "passing":
            setIcon(<RunningIcon />);
            break;

          case "failing":
            setIcon(<WarnIcon />);
            break;

          case "pass":
            setIcon(<PassIcon />);
            break;

          case "fail":
            setIcon(<FailIcon />);
            break;

          default:
            toastInfo(
              "Unable to show process status icons",
              "not match any state",
            );
            break;
        }

        setTitle(payload.title);
        setPid(payload.pid);

        const listItem = document.createElement("li");
        listItem.classList.add("preserve-whitespace");
        listItem.textContent = payload.message;
        logList.appendChild(listItem);
        dummyLast.scrollIntoView();
      });
    })();
  }, []);

  return (
    <div
      className={`bottom-0 left-0 ${half ? "h-96" : "h-16"} ${
        full ? "h-full absolute" : "h-16"
      } bg-appdark text-white w-full p-4 flex flex-col transition-all`}
    >
      <div className="flex items-center justify-between">
        <div
          className="hover:underline cursor-pointer underline-offset-4"
          onClick={(e) => {
            e.preventDefault();
            setHalf(!half);
          }}
        >
          <div className="flex gap-2 items-center">
            {icon}
            <div className="flex items-center">
              <span
                className={`${
                  pid ? "" : "hidden"
                } mx-2 my-1 text-xs font-mono tracking-wide px-1 py-[0.1rem] bg-[#332F2F] rounded`}
              >
                {pid}
              </span>
              {title}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`hover:bg-[#343131] rounded p-2 ${
              half ? "rotate-180" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setHalf(!half);
            }}
          >
            <AngleIcon />
          </div>
          <div
            className="hover:bg-[#343131] rounded p-2"
            onClick={(e) => {
              e.preventDefault();
              if (!full) {
                setFullIcon(<CollapsIcon />);
              } else {
                setFullIcon(<ExpandIcon />);
              }
              setFull(!full);
            }}
          >
            {fullIcon}
          </div>
          <div
            className="hover:bg-[#343131] rounded p-2"
            onClick={(e) => {
              e.preventDefault();
              setTitle(initialTitle);
              const logList = document.getElementById(
                "log-list",
              ) as HTMLElement;

              logList.innerHTML = "";
              setIcon(<PassIcon />);
              setPid(undefined);
            }}
          >
            <DustbinIcon />
          </div>
          <div>
            <button
              className="font-bold px-2 py-1 text-xs font-mono tracking-widest bg-red-600 hover:bg-red-500 rounded ml-4"
              onClick={(e) => {
                e.preventDefault();
                if (pid !== undefined) {
                  invoke("kill", { pid }).catch(toastError);
                } else {
                  toastInfo("Not able to get pid", "pid is undefined");
                }
              }}
            >
              KILL
            </button>
          </div>
        </div>
      </div>
      <ScrollArea
        className={`${
          full || half ? "" : "hidden"
        } bg-applight h-full p-4 rounded mt-4`}
      >
        <ul id="log-list"></ul>
        <div id="dummy-last"></div>
      </ScrollArea>
    </div>
  );
}
