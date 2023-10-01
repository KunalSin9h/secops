import SwitchCommand from "../SwitchCommand";

export default function General() {
  return (
    <div className="flex items-center justify-around my-4">
      <SwitchCommand
        title="Disable Camera"
        info="By adding 'blacklist uvcvideo' in file '/etc/modprobe.d/blacklist.conf', 
          we block the camera module which will stop the in-build camera, enhancing the 
          personal's privacy & security."
        ipc="disable_camera"
        id="disable.camera"
        info_on={{
          title: "Camera device disabled successfully",
          desc: "",
        }}
        info_off={{
          title: "Camera device enabled successfully",
          desc: "",
        }}
      />
      <SwitchCommand
        title="Block USB"
        info="By adding 'blacklist uas' and 'blacklist usb-storage' in file '/etc/modprobe.d/blacklist.conf', 
          we block the the usb port of the device, which will prevent data theft, enhancing the 
           privacy & security."
        ipc="usb_block"
        id="usb.block"
        info_on={{
          title: "USB device block successfully. Restart require",
          desc: "This require system to restart to make any changes",
        }}
        info_off={{
          title: "USB device unblock successfully. Restart require",
          desc: "This require system to restart to make any changes",
        }}
      />
    </div>
  );
}
