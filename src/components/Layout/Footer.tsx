import { AngleIcon } from "@/lib/icons";

export default function Footer() {
  return (
    <div className="absolute bottom-0 left-0 h-14 bg-appdark text-white w-full p-4 flex gap-2 items-center">
      <AngleIcon />
      Stdout an Stderr of any process or command will be shown here
    </div>
  );
}
