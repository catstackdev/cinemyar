import React, { useState, useEffect } from "react";
import type { StateFilterProps } from "./StateFilter.types";
import { ParamFilterDropdown } from "@/components/ui/Params";

const StateFilter: React.FC<StateFilterProps> = ({
  children,
  filters,
  className,
  loading,
  defaultValues = {},
  zIndex,
  onFilterChange: externalOnChange,
}) => {
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    () => {
      const initial: Record<string, string> = { ...defaultValues };
      filters.forEach((group) => {
        if (group.defaultValue && !initial[group.name]) {
          initial[group.name] = group.defaultValue;
        }
      });
      return initial;
    },
  );

  // Sync internal state when defaultValues changes from parent
  useEffect(() => {
    console.log("[StateFilter] defaultValues changed:", defaultValues);
    setSelectedValues(defaultValues);
  }, [defaultValues]);

  const handleFilterChange = (
    newValues: Record<string, string | undefined>,
  ) => {
    console.log("[StateFilter] Received filter change:", newValues);
    setSelectedValues((prev) => {
      // Filter out undefined values to get clean Record<string, string>
      const updated: Record<string, string> = {};
      Object.entries(newValues).forEach(([key, value]) => {
        if (value !== undefined) {
          updated[key] = value;
        }
      });

      console.log("[StateFilter] Previous values:", prev);
      console.log("[StateFilter] Updated values:", updated);

      externalOnChange?.(updated);

      return updated;
    });
  };

  return (
    <ParamFilterDropdown
      className={className}
      filters={filters}
      selectedValues={selectedValues}
      onFilterChange={handleFilterChange}
      loading={loading}
      zIndex={zIndex}
    >
      {children}
    </ParamFilterDropdown>
  );
};

export default StateFilter;
