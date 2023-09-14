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
  const [icon, setIcon] = useState(<PassIcon />);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<string[]>([""]);

  useEffect(() => {
    (async () => {
      await listen("execution_state", (event) => {
        console.log("got it");
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

        setMessages([...messages, payload.message]);
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
            Stdout an Stderr of any process or command will be shown here
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
          <div className="hover:bg-[#343131] rounded p-2">
            <DustbinIcon />
          </div>
        </div>
      </div>
      <div className="bg-applight h-full p-4 rounded overflow-y-scroll mt-4">
        {messages}
      </div>
    </div>
  );
}
