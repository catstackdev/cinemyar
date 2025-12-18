import React from "react";
import type { CanProps } from "./Can.types";
import { useCan } from "@/hooks/useCan";

const Can: React.FC<CanProps> = ({ children, fallback = null, ...options }) => {
  const allowed = useCan(options);
  return allowed ? <>{children}</> : <>{fallback}</>;
};

export default Can;
