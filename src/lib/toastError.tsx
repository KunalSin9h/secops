import { toast } from "../components/ui/use-toast";

export default function toastError(err: string) {
  toast({
    variant: "destructive",
    title: "Uh oh! Something went wrong.",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 overflow-scroll">
        <code className="text-white">{JSON.stringify(err, null, 2)}</code>
      </pre>
    ),
  });
}
export function toastInfo(info: string) {
  toast({
    variant: "default",
    title: "Info.",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{info}</code>
      </pre>
    ),
  });
}
