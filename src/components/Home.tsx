import { invoke } from "@tauri-apps/api/tauri";
import { Button } from "./ui/button";

export default function Home() {
  return (
    <div>
      <Button
        onClick={(e) => {
          e.preventDefault();
          invoke("ipc_dummy").then(console.log).catch(console.log);
        }}
      >
        Run Dummy Command
      </Button>
    </div>
  );
}
