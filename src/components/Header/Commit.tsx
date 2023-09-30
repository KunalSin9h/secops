import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CommitIcon } from "@/lib/icons";
import { Button } from "../ui/button";

export default function Commit() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="bg-white text-black hover:bg-black/10 px-3 py-2 rounded-md cursor-pointer flex items-center gap-2">
          <CommitIcon />
          <span>Commit</span>
        </div>
      </DialogTrigger>
      <DialogContent className="h-[80%] w-[80%] xl:w-[60%] ">
        <Button variant={"default"}>Commit</Button>
        <div className="m-2 p-2 xl:m-4 xl:p-4">
          <ul>
            <li>A</li>
            <li>A</li>
            <li>A</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
