import { useState } from "react";
import { NavLink } from "react-router-dom";
import { client } from "@/context/rspc";
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
} from "@/lib/constants/navigation";

// million-ignore
export default function Sidebar() {
  return (
    <div className="bg-appdark text-white flex flex-col w-80 p-4">
      <div className="flex items-center gap-2 px-1 py-3">
        <img
          src="/default-user-icon.png"
          className="h-10 w-10"
          alt="User icon"
        />
        <UserName />
      </div>
      <div className="flex-1 px-1 py-8">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
      <div>
        <div className="bg-apphigh rounded">
          <div className="border-b border-[#A59E9E] mx-4 py-2">
            {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
              <SidebarLink key={item.key} item={item} />
            ))}
          </div>
          <div className="flex items-center gap-2 p-4 align-center justify-center">
            <img src="/logo.png" alt="Secops Logo" className="h-8 w-8" />
            <span className="font-bold text-xl">
              Secops{" "}
              <span>
                <AppVersion />{" "}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarLink({
  item,
}: {
  item: { key: string; path: string; label: string; icon: JSX.Element };
}) {
  return (
    <div className="">
      <NavLink
        to={item.path}
        className="flex items-center gap-2 p-2 rounded hover:ml-2 transition-all hover:bg-applight"
      >
        {item.icon}
        {item.label}
      </NavLink>
    </div>
  );
}

function AppVersion() {
  const [version, setVersion] = useState("");

  client.query(["version"]).then(setVersion).catch(console.log);

  return (
    <span className="text-sm pl-2 text-appdim">
      <span>{version}</span>
    </span>
  );
}

function UserName() {
  const [username, setUsername] = useState("");

  client.query(["get_current_user"]).then(setUsername).catch(console.log);

  return <span className="text-lg font-bold">{username}</span>;
}
