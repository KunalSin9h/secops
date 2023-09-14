import { useEffect, useState } from "react";
import { listen } from "@tauri-apps/api/event";
import {
  PassIcon,
  AngleIcon,
  DustbinIcon,
  FailIcon,
  RunningIcon,
  WarnIcon,
} from "@/lib/icons";

type ExecutionStatePayload = {
  state: "running" | "failing" | "pass" | "failed";
  message: string;
};

export default function Footer() {
  const initialTitle = "Every thing up to date!";

  const [icon, setIcon] = useState(<PassIcon />);
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    const logList = document.getElementById("log-list") as HTMLElement;

    (async () => {
      await listen("execution_state", (event) => {
        const payload = event.payload as ExecutionStatePayload;

        switch (payload.state) {
          case "running":
            setIcon(<RunningIcon />);
            break;

          case "failing":
            setIcon(<WarnIcon />);
            break;

          case "pass":
            setIcon(<PassIcon />);
            break;

          case "failed":
            setIcon(<FailIcon />);
            break;

          default:
            console.log("not match any state");
            break;
        }

        const listItem = document.createElement("li");
        listItem.textContent = payload.message;
        logList.appendChild(listItem);
      });
    })();
  }, []);

  return (
    <div
      className={`absolute bottom-0 left-0 ${
        expanded ? "h-96" : "h-16"
      } bg-appdark text-white w-full p-4 flex flex-col transition-all`}
    >
      <div className="flex items-center justify-between">
        <div
          className="hover:underline cursor-pointer underline-offset-4"
          onClick={(e) => {
            e.preventDefault();
            setExpanded(!expanded);
          }}
        >
          <div className="flex gap-2 items-center">
            {icon}
            {title}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`hover:bg-[#343131] rounded p-2 ${
              expanded ? "rotate-180" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setExpanded(!expanded);
            }}
          >
            <AngleIcon />
          </div>
          <div
            className="hover:bg-[#343131] rounded p-2"
            onClick={(e) => {
              e.preventDefault();
              setTitle("Every thing up to date!");
              const logList = document.getElementById(
                "log-list",
              ) as HTMLElement;

              logList.innerHTML = "";
            }}
          >
            <DustbinIcon />
          </div>
        </div>
      </div>
      <div className="bg-applight h-full p-4 rounded overflow-y-scroll mt-4">
        <ul id="log-list"></ul>
      </div>
    </div>
  );
}
