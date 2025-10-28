import { DashboardIcon, GearIcon, VideoIcon } from "@radix-ui/react-icons";
import type { NavItem } from "./nav.types";

export const adminNav: NavItem[] = [
  {
    icon: <DashboardIcon />,
    name: "Dashboard",
    subItems: [{ name: "Overview", path: "/", pro: false }],
  },
  {
    icon: <VideoIcon />,
    name: "Movies",
    subItems: [
      { name: "List", path: "/authenticated/movies/list", pro: false },
      { name: "Encoding", path: "/applications", pro: false },
    ],
  },
];

export const adminSettings: NavItem[] = [
  {
    icon: <GearIcon />,
    name: "Settings",
    subItems: [
      { name: "Users", path: "/users", pro: false },
      { name: "Applications", path: "/applications", pro: false },
    ],
  },
];
