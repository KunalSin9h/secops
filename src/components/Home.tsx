import { invoke } from "@tauri-apps/api/tauri";
import { Button } from "./ui/button";

export default function Home() {
  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={(e) => {
          e.preventDefault();
          invoke("ipc_dummy").then(console.log).catch(console.log);
        }}
      >
        Run Dummy Command
      </Button>
      <Button
        variant={"secondary"}
        onClick={(e) => {
          e.preventDefault();
          invoke("ipc_update").then(console.log).catch(console.log);
        }}
      >
        Update System
      </Button>
      <Button
        variant={"outline"}
        onClick={(e) => {
          e.preventDefault();
          invoke("ipc_upgrade").then(console.log).catch(console.log);
        }}
      >
        Upgrade System
      </Button>
    </div>
  );
}
