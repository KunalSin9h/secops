import { BellIcon } from "@/lib/icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function Header() {
  return (
    <div className="h-16 px-4 flex justify-between items-center">
      <div className="invisible">Core</div>
      <div className="flex gap-4 items-center justify-around">
        <Input type="text" placeholder="Search" />
        <Alert />
      </div>
    </div>
  );
}

function Alert() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={"secondary"} size="icon" className="bg-white">
          <div className="m-4">
            <BellIcon />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mx-4">Alerts will be here</PopoverContent>
    </Popover>
  );
}
