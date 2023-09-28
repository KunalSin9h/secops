import { invoke } from "@tauri-apps/api";
import { Button } from "../ui/button";
import InfoToolTip from "../InfoToolTip.tsx";
import toastError from "@/lib/toastError.tsx";
import SwitchCommand from "../SwitchCommand.tsx";

export default function Update() {
  return (
    <div className="p-4">
      <UpdateCard
        title={"Refresh package repository information"}
        button={"Update"}
        trigger={"update"}
        btnTheme={"secondary"}
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
        btnTheme={"secondary"}
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
        btnTheme={"secondary"}
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
        btnTheme={"secondary"}
        info={
          "The sudo apt auto-remove command in Ubuntu is a system maintenance \
          tool that helps keep your system clean and efficient. It identifies \
          and removes packages that were initially installed as dependencies for \
          other software but are no longer needed by any installed package."
        }
      />

      <div className="w-[70%]">
        <div className="rounded  bg-yellow-100 border border-yellow-500 px-2">
          <span className="text-xs uppercase font-mono">
            This require system to be plugged-in for charging and uses WI-FI
            network
          </span>
          <UpdateCard
            title={"Install Security specific upgrades"}
            button={"Security Upgrades"}
            trigger={"unattended_upgrade"}
            btnTheme={"default"}
            info={
              "The unattended-upgrade manually install security related updates, \
          without installing non-security updates."
            }
          />
        </div>
        <div className="rounded my-8 bg-green-100 p-2 border border-green-500">
          <SwitchCommand
            title="Enable auto security updates"
            info="By setting, APT::Periodic::Unattended-Upgrade '1', in the /etc/apt/apt.conf.d/20auto-upgrades configuration file, you activate the system's built-in mechanism for 
            unattended security updates. When enabled, the system will  
            automatically check for and install security updates on a regular  
            basis, enhancing the system's security without requiring manual 
            intervention."
            id="auto.security.upgrades"
            ipc="enable_auto_security_updates"
          />
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
  btnTheme,
}: {
  title: string;
  button: string;
  trigger: string;
  info: string;
  btnTheme:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}) {
  return (
    <div className="w-full py-2 xl:py-4">
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-1">
          <span className="text-sm xl:text-lg">{title}</span>
          <InfoToolTip info={info} />
        </div>
        <Button
          variant={btnTheme}
          size={"sm"}
          onClick={(e) => {
            e.preventDefault();
            invoke(trigger).catch(toastError);
          }}
        >
          {button}
        </Button>
      </div>
    </div>
  );
}
