import SwitchCommand from "../SwitchCommand";

export default function General() {
  return (
    <div>
      <div className="flex items-center space-x-2 px-2 py-4">
        <SwitchCommand
          title="Disable Camera"
          info="By adding 'blacklist uvcvideo' in file '/etc/modprobe.d/blacklist.conf', 
          we block the camera module which will stop the in-build camera, enhancing the 
          personal's privacy & security, his will take effect after system restart"
          ipc="disable_camera"
          id="disable.camera"
          toast_info="Restart the device to make effect"
          toast_desc="Until system is restarted nothing will be changed"
        />
      </div>
    </div>
  );
}
