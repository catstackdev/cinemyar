// export interface CanProps
//   extends React.ComponentPropsWithoutRef<"div"> {
//   children?: React.ReactNode;
//   className?: string;

import type { CanOptions } from "@/utils/permissions/can";

// }
export type CanProps = CanOptions & {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};
