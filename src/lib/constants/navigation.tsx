import { HomeIcon, SSHIcon, Settings, TorIcon } from "../icons";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "home",
    label: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    key: "ssh",
    label: "SSH",
    path: "/ssh",
    icon: <SSHIcon />,
  },
  {
    key: "tor",
    label: "TOR",
    path: "/tor",
    icon: <TorIcon />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: <Settings />,
  },
];
