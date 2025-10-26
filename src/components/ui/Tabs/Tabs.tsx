import { useState } from "react";
import type { TabsProps } from "./Tabs.types";
import { cn } from "@/utils/helpers/classNames";

const Tabs = ({
  items,
  defaultTab,
  onChange,
  className,
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id || "");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeContent = items.find((item) => item.id === activeTab)?.content;

  return (
    <div className={cn("w-full", className)}>
      <div
        role="tablist"
        className="flex border-b border-border"
      >
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={activeTab === item.id}
            aria-controls={`panel-${item.id}`}
            id={`tab-${item.id}`}
            disabled={item.disabled}
            onClick={() => handleTabChange(item.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              "border-b-2 -mb-px",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              "focus:ring-offset-background",
              activeTab === item.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
              item.disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="py-4"
      >
        {activeContent}
      </div>
    </div>
  );
};

export default Tabs;
