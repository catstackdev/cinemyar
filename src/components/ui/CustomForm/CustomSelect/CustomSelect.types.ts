// export interface CustomSelectProps
//   extends React.ComponentPropsWithoutRef<"div"> {
//   children?: React.ReactNode;
//   className?: string;

import type { Props } from "react-select";

// }
export type CustomSelectProps = Omit<Props, "classNames"> & {
  children?: React.ReactNode;
  className?: string;
};
