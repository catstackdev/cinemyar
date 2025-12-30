import type { EntityType } from "@/shared/types";
import type { Option } from "@/types/options.types";

export const entityOptions: Option<EntityType>[] = [
  { label: "Genre", value: "genre" },
  { label: "Movie", value: "movie" },
  { label: "Actor", value: "actor" },
  { label: "Subtitle", value: "subtitle" },
  { label: "Video Source", value: "video_source" },
  { label: "User", value: "user" },
  { label: "Subscription", value: "subscription" },
  { label: "Device Session", value: "device_session" },
  { label: "Activity Log", value: "activity_log" },
  { label: "Admin User", value: "admin_user" },
  { label: "Admin Role", value: "admin_role" },
  { label: "Permission", value: "permission" },
  { label: "System", value: "system" },
  { label: "Media", value: "media" },
];
