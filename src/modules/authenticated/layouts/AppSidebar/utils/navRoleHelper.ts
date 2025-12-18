import { adminNav, adminSettings } from "../nav/admin.tsx";
import { commonNav, commonSettings } from "../nav/common.tsx";
import { staffNav, staffSettings } from "../nav/staff.tsx";

export const getNavForRole = (role: "admin" | "staff" | "common") => {
  const navMap = {
    admin: { main: adminNav, others: adminSettings },
    staff: { main: staffNav, others: staffSettings },
    common: { main: commonNav, others: commonSettings },
  };
  return navMap?.[role] || navMap.common;
};
