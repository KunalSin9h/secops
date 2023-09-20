import {
  ComponentIcon,
  HelpAndSupport,
  HomeIcon,
  SSHIcon,
  SettingsIcon,
  TorIcon,
} from "../icons";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "home",
    label: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    key: "ssh",
    label: "SSH Blocking",
    path: "/ssh",
    icon: <SSHIcon />,
  },
  {
    key: "tor",
    label: "TOR Blocking",
    path: "/tor",
    icon: <TorIcon />,
  },
  {
    key: "ufw",
    label: "Firewall",
    path: "/ufw",
    icon: <ComponentIcon />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: <SettingsIcon />,
  },
  {
    key: "help_and_support",
    label: "Help & Support",
    path: "/help",
    icon: <HelpAndSupport />,
  },
];
