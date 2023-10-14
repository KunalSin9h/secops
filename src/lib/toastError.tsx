import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export type toastInfoType = {
  title: string;
  desc?: string;
};

export default function toastError(err: unknown) {
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
export function toastInfo(info: toastInfoType) {
  toast({
    variant: "default",
    title: info.title,
    description: info.desc,
  });
}

export function toastInfoReload(info: toastInfoType) {
  toast({
    variant: "default",
    title: info.title,
    description: info.desc,
    action: (
      <ToastAction
        altText="Reload"
        onClick={(e) => {
          e.preventDefault();
          window.location.reload();
        }}
      >
        Reload
      </ToastAction>
    ),
  });
}
