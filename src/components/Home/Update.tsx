import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

export default function Update() {
  const [autoUpgradeEnabled, setAutoUpgradeEnabled] = useState(false);

  return (
    <div className="p-4">
      <div className="w-[70%]">
        <div className="flex gap-2 items-center">
          <span className="text-xl">
            Refresh package repository information
          </span>
          <Button variant={"secondary"}>Update</Button>
        </div>
        <p className="text-gray-500">
          The "update" command in Ubuntu, run as "apt update," refreshes the
          package repository information, ensuring the system has the latest
          data about available packages and versions, vital for secure and
          up-to-date software management.
        </p>
      </div>
      <div className="w-[70%]">
        <div className="flex gap-2 items-center my-2">
          <span className="text-xl">Upgrade the installed packages</span>
          <Button variant={"secondary"}>Upgrade</Button>
        </div>
        <p className="text-gray-500">
          The "upgrade" command in Ubuntu, executed as "apt upgrade," updates
          installed packages to their latest versions while maintaining package
          dependencies, keeping the system's software up-to-date and secure.
        </p>
      </div>

      <div className="w-[70%]">
        <div className="flex gap-2 items-center my-2">
          <span className="text-xl">
            Hard upgrade packages (Distribution Upgrade)
          </span>
          <Button variant={"secondary"}>Dist Upgrade</Button>
        </div>
        <p className="text-gray-500">
          The "dist-upgrade" command in Ubuntu, used as "apt dist-upgrade,"
          performs a more aggressive package upgrade, resolving complex
          dependencies and making necessary changes like package removals or
          installations to ensure a smooth upgrade process, maintaining system
          stability and compatibility. This also upgrades distribution.
        </p>
      </div>
      <div className="w-[70%]">
        <div className="flex gap-2 items-center my-2">
          <span className="text-xl">Install Security specific upgrades</span>
          <Button variant={"secondary"}>Security Upgrades</Button>
        </div>
        <p className="text-gray-500">
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
          <p className="text-gray-500">
            By setting{" "}
            <span className="font-mono text-sm">
              APT::Periodic::Unattended-Upgrade "1";
            </span>{" "}
            in the{" "}
            <span className="font-mono text-sm">
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
