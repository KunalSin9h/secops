import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import InfoToolTip from "./InfoToolTip";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import toastError, { toastInfo, toastInfoType } from "@/lib/toastError";
import { getSetting } from "@/lib/settings";

export default function SwitchCommand({
  title,
  info,
  ipc,
  id,
  info_on,
  info_off,
}: {
  title: string;
  info: string;
  ipc: string;
  id: string;
  info_on?: toastInfoType;
  info_off?: toastInfoType;
}) {
  const [enabled, setEnabled] = useState(false);
  const [enabledBtnDisable, setEnableBtnDisable] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const alreadyEnabled = await getSetting(id);

        setEnabled(alreadyEnabled);
      } catch (err) {
        toastError((err as string).toString());
      }
    })();
  }, []);

  return (
    <div className="flex items-center gap-4">
      <Label htmlFor={id}>
        <div className="flex items-center gap-1">
          <span className="text-md xl:text-lg">{title}</span>
          <InfoToolTip info={info} />
        </div>
      </Label>
      <Switch
        id={id}
        checked={enabled}
        disabled={enabledBtnDisable}
        onCheckedChange={async (enable: boolean) => {
          setEnableBtnDisable(true);
          try {
            await invoke(ipc, {
              enable,
            });

            setEnableBtnDisable(false);
            setEnabled(enable);

            if (info_on && enable) {
              toastInfo(info_on);
            }
            if (info_off && !enable) {
              toastInfo(info_off);
            }
          } catch (err) {
            setEnableBtnDisable(false);
            setEnabled(!enable);
            toastError((err as string).toString());
          }
        }}
      />
    </div>
  );
}
