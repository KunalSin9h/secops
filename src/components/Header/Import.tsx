import { useEffect, useState } from "react";
import { open } from "@tauri-apps/api/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ImportIcon } from "@/lib/icons";
import { Button } from "../ui/button";
import { getCommitStatus, getFileName, importSettings } from "@/lib/settings";
import toastError, { toastInfoReload } from "@/lib/toastError";

export default function Commit() {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="bg-white text-black hover:bg-black/10 px-3 py-2 rounded-md cursor-pointer flex items-center gap-2">
          <ImportIcon />
          <span>Import</span>
        </div>
      </SheetTrigger>
      <SheetContent className="w-1/3">
        <SheetHeader>
          <SheetTitle>Import Settings!</SheetTitle>
          <SheetDescription>
            Importing settings allow to apply the same configuration as the
            exporter on your system.
          </SheetDescription>
        </SheetHeader>
        <div className="px-2 xl:px-4 py-4 xl:py-8">
          <Import />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Import() {
  const [commitStatus, setCommitStatus] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | undefined>();
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    (async () => {
      const status = await getCommitStatus();
      setCommitStatus(status.commit);
      if (!status.commit) {
        toastError(
          "Commit the current settings first before applying new settings!",
        );
      }
    })();
  }, []);

  return (
    <div>
      <div
        className={`h-36 w-full p-4 flex justify-center items-center rounded-xl border border-2 ${
          selectedFile ? "border-green-400 border-dashed border-4" : ""
        }`}
      >
        <div className="flex flex-col gap-4 items-center">
          <div className="flex flex-col items-center gap-1">
            <span className={`${selectedFile ? "font-bold" : ""}`}>
              {selectedFile ? getFileName(selectedFile) : "No file selected"}
            </span>
            <span className="text-xs opacity-50">{selectedFile}</span>
          </div>
          <Button
            id="file"
            variant={"secondary"}
            onClick={async (e) => {
              e.preventDefault();

              const file = await open({
                multiple: false,
                filters: [
                  {
                    name: "JSON",
                    extensions: ["json"],
                  },
                ],
              });
              setSelectedFile(file as string);
            }}
          >
            Choose file
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <Button
          className={`${
            processing ? "opacity-60 cursor-wait pointer-events-none" : ""
          }`}
          variant={"default"}
          onClick={async (e) => {
            e.preventDefault();
            setProcessing(true);
            if (!commitStatus) {
              toastError(
                "Commit the current settings first before applying new settings!",
              );
              setProcessing(false);
              return;
            }
            if (!selectedFile) {
              toastError("No file selected");
              setProcessing(false);
              return;
            }

            try {
              await importSettings(selectedFile);
              toastInfoReload({
                title: "Settings Imported successfully",
                desc: "Reload the window to update UI",
              });
            } catch (e) {
              toastError(e);
            }
            setProcessing(false);
          }}
        >
          {processing ? "Applying..." : "Apply"}
        </Button>
      </div>
    </div>
  );
}
