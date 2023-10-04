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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  type StateMeta,
  getCommitStatus,
  commitSettings,
} from "@/lib/settings";

export default function Commit() {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="bg-white text-black hover:bg-black/10 px-3 py-2 rounded-md cursor-pointer flex items-center gap-2">
          <CommitIcon />
          <span>Commit</span>
        </div>
      </SheetTrigger>
      <SheetContent className="w-2/3 xl:w-1/3 overflow-y-scroll">
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
  const [commitMessage, setCommitMessage] = useState("");
  const [commitMessageDialog, setCommitMessageDialog] = useState(false);

  useEffect(() => {
    (async () => {
      const status = await getCommitStatus();
      setCommitStatus(status);
    })();
  }, []);

  if (commitStatus === undefined) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex flex-col gap-4 px-4 xl:px-8 my-4 xl:my-8">
        <span className="text-md">{commitStatus[0].message}</span>
        <div className="flex gap-4 items-center">
        <Dialog open={commitMessageDialog}>
          <DialogTrigger className={`${commitStatus[0].commit ? "pointer-events-none cursor-not-allowed opacity-60" : "" }`}>
          <div
              className={`${
                  commitStatus[0].commit ? "bg-green-100" : "bg-green-300"
                  }  text-black 
                  "hover:bg-green-400/50"
                   px-3 py-2 rounded-md `}
                onClick={(e) => {
                    e.preventDefault();
                    setCommitMessageDialog(true);
                }}
              >
              <span className="text-xs uppercase font-bold">
                  {commitStatus[0].commit ? "All Good" : "Commit"}
              </span>
          </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Commit current settings</DialogTitle>
            </DialogHeader>
            <div>
                <Input placeholder="Commit message..." onChange={(e) => {
                    e.preventDefault();
                    setCommitMessage(e.target.value);
                }} />                
                <Button className="mt-4" 
                  onClick={async (e) => {
                      e.preventDefault();
                      await commitSettings(commitMessage);
                      const status = await getCommitStatus();
                      setCommitMessageDialog(false);
                      setCommitStatus(status);
                  }}
                >Commit</Button>
            </div>
          </DialogContent>
        </Dialog>
          <span className="opacity-60 text-xs">{commitStatus[0].time}</span>
        </div>
      </div>

      <div>
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
    <div className="flex flex-col gap-4 px-4 xl:px-8 my-4 xl:my-8">
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
