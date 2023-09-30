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
        toast_info="Camera enabled / disabled successfully"
        toast_desc=""
      />
      <SwitchCommand
        title="Block USB"
        info="By adding 'blacklist uas' and 'blacklist usb-storage' in file '/etc/modprobe.d/blacklist.conf', 
          we block the the usb port of the device, which will prevent data theft, enhancing the 
           privacy & security."
        ipc="usb_block"
        id="usb.block"
        toast_info="USB block / unblock successfully"
        toast_desc=""
      />
    </div>
  );
}
