import { useMemo } from "react";
import type { PermissionBadgesProps } from "./PermissionBadges.types";
import { Badge, Tooltip } from "@/components/ui";
import { cn } from "@/utils/helpers/classNames";
import { usePermissionApi } from "@/modules/domain/permission/hooks/usePermissionApi";
import {
  groupPermissionsByEntity,
  formatPermissionCount,
  getPermissionBadgeVariant,
  getEntityPermissionDetails,
} from "@/modules/domain/permission/core/permission-indicators.util";
import { CheckCircle2, Circle } from "lucide-react";

const PermissionBadges = ({
  permissions,
  maxDisplay = 3,
  className,
  showTooltip = true,
  size = "sm",
}: PermissionBadgesProps) => {
  const { data: permissionData } = usePermissionApi();

  const indicators = useMemo(
    () => groupPermissionsByEntity(permissions, permissionData?.data),
    [permissions, permissionData],
  );

  const displayedIndicators = indicators.slice(0, maxDisplay);
  const remainingCount = Math.max(0, indicators.length - maxDisplay);

  if (indicators.length === 0) {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        <Badge variant="default" size={size}>
          No permissions
        </Badge>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-1 flex-wrap", className)}>
      {displayedIndicators.map((indicator) => {
        const variant = getPermissionBadgeVariant(indicator);
        const count = formatPermissionCount(indicator);

        const tooltipContent = showTooltip ? (
          <div className="space-y-2 min-w-[200px]">
            <div className="font-semibold border-b border-border/50 pb-2">
              {indicator.label}
            </div>
            <div className="space-y-1 max-h-[300px] overflow-y-auto">
              {getEntityPermissionDetails(
                indicator.entity,
                permissions,
                permissionData?.data,
              ).map((detail) => (
                <div
                  key={detail.action}
                  className="flex items-start gap-2 text-xs"
                >
                  {detail.granted ? (
                    <CheckCircle2 className="w-3 h-3 text-success mt-0.5 flex-shrink-0" />
                  ) : (
                    <Circle className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <div
                      className={cn(
                        "font-medium",
                        detail.granted
                          ? "text-foreground"
                          : "text-muted-foreground line-through",
                      )}
                    >
                      {detail.label}
                    </div>
                    {detail.description && (
                      <div className="text-muted-foreground text-[10px] mt-0.5">
                        {detail.description}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-[10px] text-muted-foreground pt-2 border-t border-border/50">
              {indicator.hasWildcard
                ? `Full access to all ${indicator.label.toLowerCase()} actions`
                : `${indicator.count} of ${indicator.totalActions} actions granted`}
            </div>
          </div>
        ) : null;

        const badge = (
          <Badge
            variant={variant}
            size={size}
            className="cursor-default font-mono"
          >
            <span className="font-bold">{indicator.shortCode}</span>
            <span className="mx-1 opacity-50">·</span>
            <span className="text-[10px]">{count}</span>
          </Badge>
        );

        if (showTooltip && tooltipContent) {
          return (
            <Tooltip
              key={indicator.entity}
              content={tooltipContent}
              position="top"
              maxWidth={350}
              contentClassName="text-xs"
            >
              {badge}
            </Tooltip>
          );
        }

        return <span key={indicator.entity}>{badge}</span>;
      })}

      {remainingCount > 0 && (
        <Tooltip
          content={
            <div className="space-y-1">
              <div className="font-semibold text-xs mb-2">
                Additional Permissions
              </div>
              {indicators.slice(maxDisplay).map((indicator) => (
                <div key={indicator.entity} className="text-xs">
                  <span className="font-medium">{indicator.label}</span>
                  <span className="mx-1 opacity-50">·</span>
                  <span className="text-muted-foreground">
                    {formatPermissionCount(indicator)}
                  </span>
                </div>
              ))}
            </div>
          }
          position="top"
          maxWidth={250}
        >
          <Badge variant="default" size={size} className="cursor-default">
            +{remainingCount}
          </Badge>
        </Tooltip>
      )}
    </div>
  );
};

export default PermissionBadges;
