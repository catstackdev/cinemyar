import {
  BarChartIcon,
  CodeIcon,
  DashboardIcon,
  FileTextIcon,
  GearIcon,
  MixIcon,
  PersonIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import type { NavItem } from "./nav.types";

export const adminNav: NavItem[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: <DashboardIcon />,
    requiredRole: ["ADMIN", "SUPER_ADMIN"],
    path: "/dashboard",
  },
  {
    id: "movies",
    name: "Movies",
    icon: <VideoIcon />,
    requiredPermissions: ["movie.view"],
    subItems: [
      {
        id: "movies-all",
        name: "All Movies",
        path: "/dashboard/movies",
        requiredPermissions: ["movie.view"],
      },
      {
        id: "movies-pending",
        name: "Pending Approval",
        path: "/dashboard/movies/pending",
        requiredPermissions: ["movie.review", "movie.approve"],
        requireAllPermissions: false, // Need any permission (OR logic)
      },
      {
        id: "movies-add",
        name: "Add Movie",
        path: "/dashboard/movies/new",
        requiredPermissions: ["movie.create"],
      },
      {
        id: "movies-deleted",
        name: "Deleted Movies",
        path: "/dashboard/movies/deleted",
        requiredPermissions: ["movie.view.deleted"],
      },
    ],
  },
  {
    id: "genres",
    name: "Genres",
    icon: <MixIcon />,
    requiredPermissions: ["genre.view"],
    subItems: [
      {
        id: "genres-all",
        name: "All Genres",
        path: "/dashboard/genres",
        requiredPermissions: ["genre.view"],
      },
      // {
      //   id: "genres-add",
      //   name: "Add Genre",
      //   path: "/dashboard/genres/new",
      //   requiredPermissions: ["genre.create"],
      // },
      {
        id: "genres-staged-images",
        name: "Staged Images",
        path: "/dashboard/genres/staged-images",
        requiredPermissions: ["genre.approve", "genre.publish", "genre.reject"],
        requireAllPermissions: false, // Need any permission (OR logic)
      },
      {
        id: "genres-deleted",
        name: "Deleted Genres",
        path: "/dashboard/genres/deleted",
        requiredPermissions: ["genre.view.deleted"],
      },
    ],
  },
  {
    id: "users",
    name: "Users",
    icon: <PersonIcon />,
    requiredPermissions: ["user.view"],
    subItems: [
      {
        id: "users-all",
        name: "All Users",
        path: "/dashboard/users",
        requiredPermissions: ["user.view"],
      },
      {
        id: "users-banned",
        name: "Banned Users",
        path: "/dashboard/users/banned",
        requiredPermissions: ["user.view"], // Just viewing, no need for ban permission
      },
      {
        id: "users-admins",
        name: "Admin Users",
        path: "/dashboard/users/admins",
        requiredPermissions: ["admin_user.view"],
      },
    ],
  },
  {
    id: "activity-logs",
    name: "Activity Logs",
    icon: <FileTextIcon />,
    path: "/dashboard/logs",
    requiredPermissions: ["activity_log.view"],
  },
  {
    id: "roles",
    name: "Roles & Permissions",
    icon: <CodeIcon />,
    requiredPermissions: ["admin_role.view"],
    subItems: [
      {
        id: "roles-all",
        name: "All Roles",
        path: "/dashboard/roles",
        requiredPermissions: ["admin_role.view"],
      },
      {
        id: "roles-assign",
        name: "Assign Roles",
        path: "/dashboard/roles/assign",
        requiredPermissions: ["admin_role.assign"],
      },
    ],
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: <BarChartIcon />,
    path: "/dashboard/analytics",
    requiredRole: ["ADMIN", "SUPER_ADMIN"],
  },
];

export const adminSettings: NavItem[] = [
  {
    id: "settings",
    icon: <GearIcon />,
    name: "Settings",
    requiredRole: ["ADMIN", "SUPER_ADMIN"],
    subItems: [
      {
        id: "settings-profile",
        name: "Profile",
        path: "/dashboard/settings/profile",
      },
      {
        id: "settings-system",
        name: "System Settings",
        path: "/dashboard/settings/system",
        requiredPermissions: ["system.settings"],
      },
      {
        id: "settings-cache",
        name: "Cache Management",
        path: "/dashboard/settings/cache",
        requiredPermissions: ["system.cache"],
      },
    ],
  },
];
