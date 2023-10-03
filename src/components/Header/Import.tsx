import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ImportIcon } from "@/lib/icons";

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
          <SheetTitle>Are you sure absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
