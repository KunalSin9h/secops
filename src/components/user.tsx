import { useEffect, useState } from "react";
import { homeDir } from "@tauri-apps/api/path";

export default function User(props: { name: string }) {
  const [home, setHome] = useState("");
  const [userIconPath, setUserIconPath] = useState("");

  homeDir().then(setHome).catch(console.log);

  useEffect(() => {
    setUserIconPath(`${home}/.secops/icons/${name}`);
  }, [home]);

  return (
    <div className="flex items-center p-4 space-x-4 bg-red-200">
      <div>{userIconPath}</div>
      {/* <img
        className="rounded-full"
        src={`data:image/png;base64,${image}`}
        alt={`${props.name} icon`}
      /> */}
      <span>{props.name}</span>
    </div>
  );
}
