import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";
import toastError, { toastInfo } from "@/lib/toastError";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getSetting } from "@/lib/settings";

export default function General() {
  const [disableCameraEnabled, setDisableCameraEnabled] = useState(false);
  const [disableCameraBtnDisable, setDisableCameraBtnDisable] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const alreadyEnabled = await getSetting("disable.camera");

        setDisableCameraEnabled(alreadyEnabled);
      } catch (err) {
        toastError(err as string);
      }
    })();
  }, []);

  return (
    <div>
      <div className="flex items-center space-x-2 px-2 py-4">
        <Label htmlFor="disable-camera" className="text-xl">
          Disable Camera
        </Label>
        <Switch
          id="disable-camera"
          checked={disableCameraEnabled}
          disabled={disableCameraBtnDisable}
          onCheckedChange={async (disable: boolean) => {
            setDisableCameraBtnDisable(true);
            try {
              await invoke("disable_camera", {
                disable,
              });

              setDisableCameraBtnDisable(false);
              setDisableCameraEnabled(disable);
              toastInfo(
                "Restart the device to make effect",
                "Until system is restarted nothing will be changed",
              );
            } catch (err) {
              setDisableCameraBtnDisable(false);
              setDisableCameraEnabled(!disable);
              toastError(err as string);
            }
          }}
        />
      </div>
    </div>
  );
}
