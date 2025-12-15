import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/helpers/classNames";
import type {
  FilterGroup,
  ParamFilterDropdownProps,
} from "./ParamFilterDropdown.types";
import Radio from "../../Radio";
import { useDynamicPosition } from "@/hooks/useDynamicPosition";
import Chip from "../../Chip";
import Button from "../../Button";
import JumpingDots from "../../JumpingDots";

const ParamFilterDropdown: React.FC<ParamFilterDropdownProps> = ({
  className,
  filters,
  selectedValues = {},
  onFilterChange,
  children,
  loading,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  // --- USE THE HOOK HERE ---
  const { top, left } = useDynamicPosition({
    triggerRef: containerRef,
    contentRef: portalRef,
    isOpen,
    offset: 4, // Gap between button and menu
  });

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (groupName: string, value: string | undefined) => {
    const newValues = { ...selectedValues, [groupName]: value };
    console.log("newValues", newValues);
    onFilterChange?.(newValues);
    if (!value) delete newValues[groupName];
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !containerRef.current?.contains(event.target as Node) &&
        !portalRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // const selectedSummary = filters
  //   .map((group) => selectedValues[group.name] || group.title)
  //   .join(", ");

  return (
    <div
      className={cn("flex gap-2 items-baseline justify-end", className)}
      {...rest}
    >
      <div className="flex flex-wrap gap-2 ">
        {Object.entries(selectedValues).length > 0
          ? Object.entries(selectedValues)
              .map(([groupName, value]) => {
                // 1. Find the filter group definition
                const group = filters.find((g) => g.name === groupName);

                // 2. CHECK: If the group doesn't exist OR if notShowChip is true, skip rendering the chip.
                if (!group || group.notShowChip) {
                  return null;
                }

                // 3. Find the selected option within the group
                const option = group.options.find((o) => o.value === value);

                if (!option) return null;

                return (
                  <Chip
                    key={groupName}
                    variant="primary"
                    // Pass undefined to remove the filter (as implemented in previous examples)
                    onRemove={() => handleSelect(groupName, undefined)}
                  >
                    {group.title}: {option.label}
                  </Chip>
                );
              })
              .filter(Boolean) // Remove the nulls returned by the map function
          : null}
      </div>

      <div ref={containerRef}>
        <Button
          variant="glass"
          size="md"
          disabled={loading}
          rightIcon={loading ? <JumpingDots /> : null}
          onClick={toggleDropdown}
        >
          Filter
        </Button>

        {isOpen &&
          createPortal(
            <div
              ref={portalRef}
              // Use 'fixed' positioning so the coordinates work relative to viewport
              className="fixed z-50 min-w-64 backdrop-blur-xs border rounded-lg  border-primary/50 shadow-lg p-3 flex flex-col gap-3 "
              style={{ top, left }} // Apply dynamic styles
              onClick={(e) => e.stopPropagation()}
            >
              {filters.map((group: FilterGroup) => (
                <fieldset key={group.name} className="flex flex-col gap-2">
                  <legend className="text-sm font-medium py-2">
                    {group.title}
                  </legend>
                  <div className="flex flex-col gap-1 max-h-30 overflow-auto">
                    {group.options.map((option) => (
                      <div
                        key={option.value}
                        className={cn(
                          "flex items-center gap-2 px-2 py-2 rounded hover:bg-primary/10 hover:border hover:border-primary/20",
                          selectedValues[group.name] === option.value
                            ? "bg-primary/20 font-semibold border border-primary/30"
                            : "",
                        )}
                        onClick={() => handleSelect(group.name, option.value)}
                      >
                        <Radio
                          className="w-full"
                          size="sm"
                          labelClass={cn(
                            "w-full",
                            selectedValues[group.name] === option.value
                              ? "text-primary"
                              : "",
                          )}
                          name={group.name}
                          label={option.label}
                          value={option.value}
                          checked={selectedValues[group.name] == option.value}
                          onChange={() =>
                            handleSelect(group.name, option.value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>,
            document.body,
          )}
      </div>
    </div>
  );
};

export default ParamFilterDropdown;
