import { useState } from "react";
import UserInfo from "./components/system/Users";
import Version from "@/components/system/version";
import { client } from "./context/rspc";

export default function App() {
  const [updateData, setUpdateData] = useState("");
  return (
    <div className="p-4 w-full">
      <div className="flex text-4xl font-bold space-x-4 items-center justify-center">
        <span>Secops</span>
        <span>
          <Version />
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <span>The Current user : </span>
        <span className="font-bold">
          <UserInfo />
        </span>
      </div>

      <button
        className="p-4 rounded bg-black text-white text-lg my-8"
        onClick={(e) => {
          e.preventDefault();
          setUpdateData("Updating...");

          client
            .mutation(["update_system"])
            .then(setUpdateData)
            .catch(console.log);
        }}
      >
        Update your system (sudo apt update)
      </button>
      <div className="m-4">
        <pre>
          <code>{updateData}</code>
        </pre>
      </div>
    </div>
  );
}
