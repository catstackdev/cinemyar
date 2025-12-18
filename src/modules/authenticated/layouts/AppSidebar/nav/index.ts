import { commonNav, commonSettings } from "./common.tsx";
export { staffNav } from "./staff.tsx";
export type { NavItem } from "./nav.types.ts";

// Default export for no-role-yet scenario
export const defaultNav = {
  main: commonNav, // or userNav for now
  others: commonSettings,
};
