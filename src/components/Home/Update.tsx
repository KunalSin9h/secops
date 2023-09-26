import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import InfoToolTip from "../InfoToolTip.tsx";
import { getSetting } from "@/lib/settings.ts";

export default function Update() {
  const [autoUpgradeEnabled, setAutoUpgradeEnabled] = useState(false);
  const [autoUpgradeBtnDisable, setAutoUpgradeBtnDisable] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const alreadyEnabled = await getSetting("auto.security.upgrades");

        setAutoUpgradeEnabled(alreadyEnabled);
      } catch (err) {
        // TODO: Shoot a new Notification
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="p-4">
      <UpdateCard
        title={"Refresh package repository information"}
        button={"Update"}
        trigger={"update"}
        info={
          "The update command in Ubuntu, run as apt update, refreshes the \
          package repository information, ensuring the system has the latest \
              data about available packages and versions, vital for secure and \
              up-to-date software management."
        }
      />

      <UpdateCard
        title={"Upgrade the installed packages"}
        button={"Upgrade"}
        trigger={"upgrade"}
        info={
          "The upgrade command in Ubuntu,  \
          executed as apt upgrade, updates \
          installed packages to their latest versions while maintaining package \
          dependencies, keeping the system's software up-to-date and secure."
        }
      />

      <UpdateCard
        title={"Hard upgrade packages (Distribution Upgrade)"}
        button={"Dist Upgrade"}
        trigger={"dist_upgrade"}
        info={
          "The dist-upgrade command in Ubuntu, used as apt dist-upgrade, \
          performs a more aggressive package upgrade, resolving complex \
          dependencies and making necessary changes like package removals or \
          installations to ensure a smooth upgrade process, maintaining system \
          stability and compatibility. This also upgrades distribution."
        }
      />

      <UpdateCard
        title={"Remove unused and orphans packages"}
        button={"Remove"}
        trigger={"auto_remove"}
        info={
          "The sudo apt auto-remove command in Ubuntu is a system maintenance \
          tool that helps keep your system clean and efficient. It identifies \
          and removes packages that were initially installed as dependencies for \
          other software but are no longer needed by any installed package."
        }
      />

      <div className="w-[70%]">
        <UpdateCard
          title={"Install Security specific upgrades"}
          button={"Security Upgrades"}
          trigger={"unattended_upgrade"}
          info={
            "The unattended-upgrade manually install security related updates, \
          without installing non-security updates."
          }
        />

        <div className="rounded my-8 bg-green-100 p-2 border border-green-500">
          <div className="flex items-center gap-4">
            <Label htmlFor="auto-security-updates">
              <div className="flex items-center gap-1">
                <span className="text-md xl:text-lg">
                  Enable auto security updates
                </span>
                <InfoToolTip
                  info={
                    "By setting, APT::Periodic::Unattended-Upgrade '1', in the /etc/apt/apt.conf.d/20auto-upgrades configuration file, you activate the system's built-in mechanism for \
            unattended security updates. When enabled, the system will  \
            automatically check for and install security updates on a regular  \
            basis, enhancing the system's security without requiring manual \
            intervention."
                  }
                />
              </div>
            </Label>
            <Switch
              id="auto-security-updates"
              checked={autoUpgradeEnabled}
              disabled={autoUpgradeBtnDisable}
              onCheckedChange={async (enable: boolean) => {
                setAutoUpgradeBtnDisable(true);
                try {
                  await invoke("enable_auto_security_updates", {
                    enable,
                  });

                  setAutoUpgradeBtnDisable(false);
                  setAutoUpgradeEnabled(enable);
                } catch (err) {
                  console.log(err);
                  setAutoUpgradeBtnDisable(false);
                  setAutoUpgradeEnabled(!enable);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function UpdateCard({
  title,
  button,
  trigger,
  info,
}: {
  title: string;
  button: string;
  trigger: string;
  info: string;
}) {
  return (
    <div className="w-full py-2 xl:py-4">
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-1">
          <span className="text-sm xl:text-lg">{title}</span>
          <InfoToolTip info={info} />
        </div>
        <Button
          variant={"secondary"}
          size={"sm"}
          onClick={(e) => {
            e.preventDefault();
            invoke(trigger).catch(console.log);
          }}
        >
          {button}
        </Button>
      </div>
    </div>
  );
}
