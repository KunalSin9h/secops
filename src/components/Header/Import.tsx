import { ImportIcon } from "@/lib/icons";

export default function Import() {
  return (
    <div className="bg-white text-black hover:bg-black/10 px-3 py-2 rounded-md cursor-pointer flex items-center gap-2">
      <ImportIcon />
      <span>Import</span>
    </div>
  );
  // return (
  //   <Dialog>
  //     <DialogTrigger>
  //       <div className="bg-white text-black hover:bg-black/10 px-3 py-2 rounded-md cursor-pointer flex items-center gap-2">
  //         <ImportIcon />
  //         <span>Import</span>
  //       </div>
  //     </DialogTrigger>
  //     <DialogContent className="h-[80%] w-[80%] xl:w-[60%]">
  //       <DialogHeader className="">
  //         <DialogTitle>Are you sure absolutely sure?</DialogTitle>
  //         <DialogDescription>
  //           This action cannot be undone. This will permanently delete your
  //           account and remove your data from our servers.
  //         </DialogDescription>
  //       </DialogHeader>
  //     </DialogContent>
  //   </Dialog>
}
