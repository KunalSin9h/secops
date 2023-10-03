import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CommitIcon } from "@/lib/icons";
import { type StateMeta, getCommitStatus } from "@/lib/settings";

export default function Commit() {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="bg-white text-black hover:bg-black/10 px-3 py-2 rounded-md cursor-pointer flex items-center gap-2">
          <CommitIcon />
          <span>Commit</span>
        </div>
      </SheetTrigger>
      <SheetContent className="w-1/3">
        <SheetHeader>
          <SheetTitle>Commit Settings!</SheetTitle>
          <SheetDescription>
            Commit takes snapshot of settings and configs, so that you can revet
            back and apply backups.
          </SheetDescription>
        </SheetHeader>
        <div className="px-2 xl:px-4 py-4 xl:py-8">
          <Commits />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Commits() {
  const [commitStatus, setCommitStatus] = useState<StateMeta[]>();

  useEffect(() => {
    (async () => {
      const status = await getCommitStatus();
      setCommitStatus(status);
    })();
  }, []);

  if (commitStatus === undefined) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex flex-col gap-4 px-4 xl:px-16">
        <span className="text-md">{commitStatus[0].message}</span>
        <div className="flex gap-4 items-center">
          <div
            className={`${
              commitStatus[0].commit ? "bg-green-100" : "bg-green-300"
            }  text-black ${
              commitStatus[0].commit
                ? "opacity-60 pointer-event-none cursor-not-allowed"
                : "hover:bg-green-400/50"
            } px-3 py-2 rounded-md cursor-pointer`}
          >
            <span className="text-xs uppercase font-bold">
              {commitStatus[0].commit ? "All Good" : "Commit"}
            </span>
          </div>
          <span className="opacity-60 text-xs">{commitStatus[0].time}</span>
        </div>
      </div>

      <div className="py-4 xl:py-8">
        {commitStatus.slice(1).map((item, index) => {
          return <CommitBox key={index} {...item} />;
        })}
      </div>
    </div>
  );
}

function CommitBox({
  message,
  commit,
  time,
}: {
  message: string;
  commit: boolean;
  time: string;
}) {
  return (
    <div className="flex flex-col gap-4 px-4 xl:px-16">
      <span className="text-md">{message}</span>
      <div className="flex gap-4 items-center">
        <div
          className={`${commit ? "bg-red-300" : "bg-green-300"}  text-black ${
            commit ? "hover:bg-red-400/80" : "hover:bg-green-400/50"
          } px-3 py-2 rounded-md cursor-pointer`}
        >
          <span className="text-xs uppercase font-bold">
            {commit ? "Revert" : "Commit"}
          </span>
        </div>
        <span className="opacity-60 text-xs">{time}</span>
      </div>
    </div>
  );
}
