import { useAppSelector } from "@/store/hooks";
import type { CanOptions } from "@/utils/permissions/can/can.types";
import { can } from "../utils/permissions/can";

export const useCan = (options: CanOptions) => {
  const user = useAppSelector((s) => s.auth.user);
  if (user?.role === "SUPER_ADMIN") return true;
  return can(user, options);
};
//usage
//
// const canCreate = useCan({
//   roles: ["ADMIN", "SUPER_ADMIN"],
//   permissions: GENRE_PERMISSIONS.CREATE,
// });
//
// <Button disabled={!canCreate}>Create Genre</Button>
// // or
//
// <Can
//   roles={["ADMIN", "SUPER_ADMIN"]}
//   permissions={GENRE_PERMISSIONS.UPDATE}
// >
//   <EditButton />
// </Can>
//
//
// 2.
