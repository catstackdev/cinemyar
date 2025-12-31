import React, { useMemo } from "react";
import { cn } from "@/utils/helpers/classNames";
import type { PermissionCardProps } from "./PermissionCard.types";
import { usePermissionApi } from "@/modules/domain/permission/hooks/usePermissionApi";
import { Badge } from "@/components/ui";

const PermissionCard: React.FC<PermissionCardProps> = ({
  children,
  className,
  permissions,
  entity,
  ...rest
}) => {
  const { data: permissionData } = usePermissionApi();
  const meta = React.useMemo(() => {
    return permissionData?.data?.permissions?.[entity ?? ""];
  }, [permissionData?.data?.permissions, entity]);
  return (
    <div
      className={cn(
        "p-4 rounded-lg border border-border bg-card/50 flex flex-col gap-2",
        className,
      )}
      {...rest}
    >
      <div className="flex items-center gap-2">
        <h3 className="font-semibold text-sm uppercase text-primary">
          {meta?.label ?? entity}
        </h3>

        <Badge size="sm" variant="secondary">
          {permissions?.length ?? 0}
        </Badge>
      </div>

      {meta?.description && (
        <div className="text-sm text-muted-foreground/80">
          {meta.description}
        </div>
      )}

      {children}
    </div>
  );
};

export default PermissionCard;
