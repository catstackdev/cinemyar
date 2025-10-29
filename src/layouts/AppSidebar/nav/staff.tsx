import {
  BarChartIcon,
  CodeIcon,
  DashboardIcon,
  GearIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import type { NavItem } from "./nav.types";

export const staffNav: NavItem[] = [
  {
    id: "dashboard",
    icon: <DashboardIcon />,
    name: "Dashboard",
    subItems: [
      {
        id: "dashboard-overview",
        name: "Overview",
        path: "/",
        icon: <DashboardIcon className="w-4 h-4" />,
      },
    ],
  },
  {
    id: "movies",
    icon: <VideoIcon />,
    name: "Movies",
    subItems: [
      {
        id: "movies-list",
        name: "Movies List",
        path: "/authenticated/movies/list",
        icon: <VideoIcon className="w-4 h-4" />,
      },
      {
        id: "movies-encoding",
        name: "Encoding Queue",
        path: "/authenticated/movies/encoding",
        icon: <CodeIcon className="w-4 h-4" />,
      },
      {
        id: "movies-analytics",
        name: "Analytics",
        path: "/authenticated/movies/analytics",
        icon: <BarChartIcon className="w-4 h-4" />,
      },
    ],
  },
];

export const staffSettings: NavItem[] = [
  {
    id: "settings",
    icon: <GearIcon />,
    name: "Settings",
  },
];
