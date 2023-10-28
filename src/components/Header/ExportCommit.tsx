import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";
import { copyFile, BaseDirectory } from "@tauri-apps/api/fs";
import { save } from "@tauri-apps/api/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CommitIcon, ExportIcon } from "@/lib/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  type StateMeta,
  getCommitStatus,
  commitSettings,
  CommitStatus,
} from "@/lib/settings";
import toastError, { toastInfo, toastInfoReload } from "@/lib/toastError";

export default function ExportCommit() {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="bg-white text-black hover:bg-black/10 px-3 py-2 rounded-md cursor-pointer flex items-center gap-2">
          <ExportIcon />
          <span>Export</span>
          <span className="font-bold uppercase text-xs xl:mx-4 mx-1">or</span>
          <CommitIcon />
          <span>Commit</span>
        </div>
      </SheetTrigger>
      <SheetContent className="w-2/3 xl:w-1/3 overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Commit or Export Settings!</SheetTitle>
          <SheetDescription>
            Commit takes snapshot of settings and configs, so that you can revet
            back and apply backups.
            <br />
            Exported files can be applied to replicated settings.
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
  const [commitStatus, setCommitStatus] = useState<CommitStatus>();

  useEffect(() => {
    (async () => {
      const status = await getCommitStatus();
      setCommitStatus(status);
    })();
  }, [commitStatus]);

  if (commitStatus === undefined) return <div>Loading...</div>;
  return (
    <div>
      <CommitBox
        status={commitStatus.commit}
        data={commitStatus.states[0]}
        statusUpdater={setCommitStatus}
      />
      <RevertBox
        states={commitStatus.states.slice(1)}
        commit={commitStatus.commit}
      />
    </div>
  );
}

function CommitBox({
  status,
  data,
  statusUpdater,
}: {
  status: boolean;
  data: StateMeta;
  statusUpdater: React.Dispatch<React.SetStateAction<CommitStatus | undefined>>;
}) {
  const [commitMessage, setCommitMessage] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 px-4 xl:px-8 my-4 xl:my-8">
      <span className="text-md font-bold">{data.message}</span>
      <div className="flex items-center gap-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            className={`${
              status ? "pointer-events-none cursor-not-allowed" : ""
            }
              `}
          >
            <div
              className={`${
                status ? "bg-green-100" : "bg-green-200"
              } text-black 
                  hover:bg-green-500/50
                   px-3 py-2 rounded-md `}
            >
              <span className="text-xs uppercase font-bold">
                {status ? "All Good" : "Commit"}
              </span>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Commit current settings</DialogTitle>
            </DialogHeader>
            <div>
              <Input
                placeholder="Commit message..."
                onChange={(e) => {
                  e.preventDefault();
                  setCommitMessage(e.target.value);
                }}
              />
              <div className="mt-4 flex items-center gap-2 justify-end">
                <Button
                  variant={"secondary"}
                  onClick={async (e) => {
                    e.preventDefault();
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={async (e) => {
                    e.preventDefault();
                    await commitSettings(commitMessage.trim());
                    const status = await getCommitStatus();
                    statusUpdater(status);
                    setOpen(false);
                  }}
                >
                  Commit
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <span className="opacity-60 text-xs">{data.time}</span>
      </div>
    </div>
  );
}

function RevertBox({
  commit,
  states,
}: {
  commit: boolean;
  states: StateMeta[];
}) {
  return (
    <div>
      {states.map((value, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 px-4 xl:px-8 my-4 xl:my-8"
        >
          <span className="text-md font-bold">{value.message}</span>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center">
              <div
                className="bg-secondary text-secondary-foreground hover:bg-secondary/50 px-3 py-2 rounded-md cursor-pointer"
                onClick={async (e) => {
                  e.preventDefault();
                  if (!commit) {
                    toastError("Commit the current settings first!");
                    return;
                  }
                  invoke("revert_commit", {
                    file: value.fileName,
                  })
                    .then(() =>
                      toastInfoReload({
                        title: "Settings reverted successfully",
                        desc: "Reload the window to update UI",
                      }),
                    )
                    .catch(toastError);
                }}
              >
                <span className="text-xs uppercase font-bold">Revert</span>
              </div>
              <ExportBox fileName={value.fileName} />
            </div>
            <span className="opacity-60 text-xs">{value.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExportBox({ fileName }: { fileName: string }) {
  return (
    <div
      className="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md cursor-pointer"
      onClick={async (e) => {
        e.preventDefault();
        const fileToSave = fileName.split("_").slice(1).join("_");

        const filePath = await save({
          filters: [
            {
              name: "JSON",
              extensions: ["json"],
            },
          ],
          defaultPath: fileToSave,
          title: "Secops",
        });

        if (filePath) {
          try {
            await copyFile(`.secops/state/${fileName}`, filePath, {
              dir: BaseDirectory.Home,
            });
            toastInfo({
              title: "State file saved",
              desc: `Location: ${filePath}`,
            });
          } catch (e) {
            toastError(e);
          }
        }
      }}
    >
      <span className="text-xs uppercase font-bold">Export</span>
    </div>
  );
}
