import { useState } from "react";
import type { AccordionProps } from "./Accordion.types";
import { cn } from "@/utils/helpers/classNames";

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={cn(
      "w-5 h-5 transition-transform",
      isOpen && "transform rotate-180"
    )}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const Accordion = ({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className,
}: AccordionProps) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      }
      return allowMultiple ? [...prev, itemId] : [itemId];
    });
  };

  return (
    <div className={cn("divide-y divide-border", className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);

        return (
          <div key={item.id} className="py-2">
            <button
              onClick={() => !item.disabled && toggleItem(item.id)}
              disabled={item.disabled}
              className={cn(
                "flex w-full items-center justify-between text-left",
                "px-4 py-3 text-sm font-medium",
                "text-foreground",
                "hover:bg-muted",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                "focus:ring-offset-background",
                "rounded-lg transition-colors",
                item.disabled && "opacity-50 cursor-not-allowed"
              )}
              aria-expanded={isOpen}
              aria-controls={`panel-${item.id}`}
              id={`button-${item.id}`}
            >
              <span>{item.title}</span>
              <ChevronIcon isOpen={isOpen} />
            </button>
            {isOpen && (
              <div
                id={`panel-${item.id}`}
                role="region"
                aria-labelledby={`button-${item.id}`}
                className="px-4 py-3 text-sm text-muted-foreground"
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
