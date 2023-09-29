import { BellIcon } from "@/lib/icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import Import from "./Import";
import Export from "./Export";
import Commit from "./Commit";

export default function Header() {
  return (
    <div className="h-12 xl:h-16 px-2 xl:px-4 flex justify-between items-center">
      <div className="flex gap-2 xl:gap-4 w-full">
        <Import />
        <Export />
        <Commit />
      </div>
      <div className="flex gap-2 xl:gap-4 items-center justify-around">
        <Input type="text" placeholder="Search" />
        <Popover>
          <PopoverTrigger>
            <Button variant={"secondary"} size="icon" className="bg-white">
              <div className="m-2 xl:m-4">
                <BellIcon />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 xl:w-96 mx-2 xl:mx-4 h-[32rem]">
            <ScrollArea className="w-[22rem] h-[30rem]">
              <ul id="alerts"></ul>
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
