import { useState } from "react";
import { invoke } from "@tauri-apps/api";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

export default function Update() {
  const [autoUpgradeEnabled, setAutoUpgradeEnabled] = useState(false);

  return (
    <div className="p-4">
      <div className="w-[70%]">
        <div className="flex gap-2 items-center">
          <span className="text-lg xl:text-xl">
            Refresh package repository information
          </span>
          <Button
            variant={"secondary"}
            onClick={(e) => {
              e.preventDefault();
              invoke("update").catch(console.log);
            }}
          >
            Update
          </Button>
        </div>
        <p className="text-gray-500 text-sm">
          The "update" command in Ubuntu, run as "apt update," refreshes the
          package repository information, ensuring the system has the latest
          data about available packages and versions, vital for secure and
          up-to-date software management.
        </p>
      </div>
      <div className="w-[70%]">
        <div className="flex gap-2 items-center my-2">
          <span className="text-lg xl:text-xl">
            Upgrade the installed packages
          </span>
          <Button
            variant={"secondary"}
            onClick={(e) => {
              e.preventDefault();
              invoke("upgrade").catch(console.log);
            }}
          >
            Upgrade
          </Button>
        </div>
        <p className="text-gray-500 text-sm">
          The "upgrade" command in Ubuntu, executed as "apt upgrade," updates
          installed packages to their latest versions while maintaining package
          dependencies, keeping the system's software up-to-date and secure.
        </p>
      </div>

      <div className="w-[70%]">
        <div className="flex gap-2 items-center my-2">
          <span className="text-lg xl:text-xl">
            Hard upgrade packages (Distribution Upgrade)
          </span>
          <Button
            variant={"secondary"}
            onClick={(e) => {
              e.preventDefault();
              invoke("dist_upgrade").catch(console.log);
            }}
          >
            Dist Upgrade
          </Button>
        </div>
        <p className="text-gray-500 text-sm">
          The "dist-upgrade" command in Ubuntu, used as "apt dist-upgrade,"
          performs a more aggressive package upgrade, resolving complex
          dependencies and making necessary changes like package removals or
          installations to ensure a smooth upgrade process, maintaining system
          stability and compatibility. This also upgrades distribution.
        </p>
      </div>
      <div className="w-[70%]">
        <div className="flex gap-2 items-center my-2">
          <span className="text-lg xl:text-xl">
            Remove unused and orphans packages
          </span>
          <Button
            variant={"secondary"}
            onClick={(e) => {
              e.preventDefault();
              invoke("auto_remove").catch(console.log);
            }}
          >
            Remove
          </Button>
        </div>
        <p className="text-gray-500 text-sm">
          The "sudo apt auto-remove" command in Ubuntu is a system maintenance
          tool that helps keep your system clean and efficient. It identifies
          and removes packages that were initially installed as dependencies for
          other software but are no longer needed by any installed package.
        </p>
      </div>
      <div className="w-[70%]">
        <div className="flex gap-2 items-center my-2">
          <span className="text-lg xl:text-xl">
            Install Security specific upgrades
          </span>
          <Button
            variant={"secondary"}
            onClick={(e) => {
              e.preventDefault();
              invoke("unattended_upgrade").catch(console.log);
            }}
          >
            Security Upgrades
          </Button>
        </div>
        <p className="text-gray-500 text-sm">
          The "unattended-upgrade" manually install security related updates,
          without installing non-security updates.
        </p>
        <div className="rounded my-8 bg-green-100 p-2 border border-green-500">
          <div className="flex items-center gap-4">
            <Label htmlFor="auto-security-updates">
              <span className="text-lg">Enable auto security updates</span>
            </Label>
            <Switch
              id="auto-security-updates"
              checked={autoUpgradeEnabled}
              onCheckedChange={(v: boolean) => {
                setAutoUpgradeEnabled(v);
              }}
            />
          </div>
          <p className="text-gray-500 text-sm">
            By setting{" "}
            <span className="font-mono text-xs">
              APT::Periodic::Unattended-Upgrade "1";
            </span>{" "}
            in the{" "}
            <span className="font-mono text-xs">
              /etc/apt/apt.conf.d/20auto-upgrades
            </span>{" "}
            configuration file, you activate the system's built-in mechanism for
            unattended security updates. When enabled, the system will
            automatically check for and install security updates on a regular
            basis, enhancing the system's security without requiring manual
            intervention.
          </p>
        </div>
      </div>
    </div>
  );
}