import React from "react";
import { cn } from "@/utils/helpers/classNames";
import type { RolesSidebarProps } from "./RolesSidebar.types";
import { LucideIcon } from "@/components/ui";

const RolesSidebar: React.FC<RolesSidebarProps> = ({
  data,
  activeEntity,
  selectedPermissions,
  onEntityClick,
  children,
  className,
  ...rest
}) => {
  const { groups, permissions } = data;

  // Helper to calculate [Selected / Total]
  const getProgress = (entityKey: string) => {
    const total = permissions?.[entityKey]?.actions.length || 0;
    const selected = selectedPermissions?.filter((p) =>
      p.startsWith(`${entityKey}.`),
    ).length;
    return { selected, total };
  };

  return (
    <aside
      className="w-72 bg-slate-50 border-r border-slate-200 h-full flex flex-col overflow-hidden"
      {...rest}
    >
      <div className="p-4 border-b bg-white">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-tight">
          Navigation
        </h2>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 space-y-8">
        {Object.entries(groups).map(([groupKey, group]) => (
          <div key={groupKey} className="px-3">
            {/* Group Header */}
            <div className="mb-2 px-3">
              <div className="flex items-center gap-2">
                <h3
                  className={cn(
                    "text-[11px] font-bold tracking-widest uppercase",
                    group.restricted ? "text-amber-600" : "text-slate-400",
                  )}
                >
                  {group.label}
                </h3>
                {group.restricted && (
                  <span className="text-[10px] bg-amber-100 text-amber-700 px-1 rounded font-bold">
                    SECURE
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                {group.description}
              </p>
            </div>

            {/* Entity List */}
            <div className="space-y-1">
              {group.entities.map((entityKey) => {
                const entity = permissions[entityKey];
                if (!entity) return null;

                const { selected, total } = getProgress(entityKey);
                const isActive = activeEntity === entityKey;

                return (
                  <button
                    key={entityKey}
                    onClick={() => onEntityClick(entityKey)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all group",
                      isActive
                        ? "bg-white shadow-sm border border-slate-200 ring-1 ring-black/5 text-blue-600"
                        : "text-slate-600 hover:bg-slate-200/50 border border-transparent",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <LucideIcon
                        name={entity.icon}
                        size="sm"
                        className={cn(
                          "transition-colors",
                          isActive
                            ? "text-blue-600"
                            : "text-slate-400 group-hover:text-slate-600",
                        )}
                      />
                      <div className="flex flex-col items-start leading-none">
                        <span className="text-sm font-semibold">
                          {entity.label}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-1 uppercase">
                          Code: {entity.shortCode}
                        </span>
                      </div>
                    </div>

                    {/* Progress Badge */}
                    <div
                      className={cn(
                        "text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border",
                        selected > 0
                          ? "bg-blue-50 border-blue-100 text-blue-700"
                          : "bg-slate-100 border-slate-200 text-slate-400",
                      )}
                    >
                      {selected}/{total}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default RolesSidebar;
