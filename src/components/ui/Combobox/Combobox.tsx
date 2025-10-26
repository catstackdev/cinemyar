import { forwardRef, useState, useRef, useEffect } from "react";
import type { ComboboxProps, ComboboxOption } from "./Combobox.types";
import { cn } from "@/utils/helpers/classNames";

const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = "Search...",
      error = false,
      disabled = false,
      emptyMessage = "No results found",
      className,
      renderOption,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const filteredOptions = query === ""
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase())
        );

    const selectedOption = options.find((option) => option.value === value);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    const handleSelect = (option: ComboboxOption) => {
      if (!option.disabled) {
        onChange?.(option.value);
        setQuery("");
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setIsOpen(true);
          setSelectedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && filteredOptions[selectedIndex]) {
            handleSelect(filteredOptions[selectedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setQuery("");
          break;
      }
    };

    return (
      <div ref={containerRef} className="relative w-full">
        <input
          ref={ref}
          type="text"
          value={query || selectedOption?.label || ""}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => !disabled && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full rounded-md border px-3 py-2 text-sm transition-colors",
            "placeholder:text-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 hover:border-gray-400",
            className,
          )}
          {...props}
        />

        {isOpen && !disabled && (
          <div
            ref={listRef}
            className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg"
          >
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-2 text-sm text-gray-500">{emptyMessage}</div>
            ) : (
              filteredOptions.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  disabled={option.disabled}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "w-full px-4 py-2 text-left text-sm transition-colors",
                    "hover:bg-gray-100 focus:bg-gray-100 focus:outline-none",
                    option.disabled && "cursor-not-allowed opacity-50",
                    selectedIndex === index && "bg-gray-100",
                    value === option.value && "font-medium text-blue-600",
                  )}
                >
                  {renderOption ? renderOption(option) : option.label}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    );
  },
);

Combobox.displayName = "Combobox";

export default Combobox;
