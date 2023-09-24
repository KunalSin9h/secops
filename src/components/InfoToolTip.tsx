import { InfoIcon } from "@/lib/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function InfoToolTip({ info }: { info: string }) {
  return (
    <TooltipProvider delayDuration={50}>
      <Tooltip>
        <TooltipTrigger>
          <InfoIcon />
        </TooltipTrigger>
        <TooltipContent className="bg-apphigh text-white">
          <p className="w-80 xl:w-96 p-1 xl:p-2 font-md">{info}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
