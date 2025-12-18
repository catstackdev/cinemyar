import type { ClassNamesConfig } from "react-select";

export const TAILWIND_SELECT_CLASSES: ClassNamesConfig = {
  // --- A1. Control (The main wrapper/input area) ---
  control: (state) =>
    `!rounded-md !border !px-1 !py-1 text-sm !min-h-[40px] ${
      state.isFocused
        ? "!border-primary !ring-2 !ring-primary !ring-offset-2 !ring-offset-background"
        : "!border-input"
    } !bg-background !shadow-sm transition-colors`,

  // --- A2. Menu (The dropdown box) ---
  menu: () =>
    "!rounded-md !border !border-input !bg-transparent !backdrop-blur !shadow-lg !mb-8 ",

  // --- A3. Option (Individual items in the dropdown) ---
  option: (state) =>
    `!px-3 !py-2 text-sm ${
      state.isSelected
        ? "!bg-primary !text-primary-foreground" // Selected value
        : state.isFocused
          ? "!bg-muted !text-foreground" // Hovered/Active
          : ""
      // "!bg-background !text-foreground" // Default
    } transition-colors duration-150`,

  // --- A4. Input/Placeholder ---
  placeholder: () => "!text-muted-foreground",
  input: () => "!text-foreground",

  // --- A5. Value Display ---
  singleValue: () => "!text-foreground",

  // --- A6. Indicators (Arrows, Clear, Loading) ---
  indicatorSeparator: () => "!bg-border",
  dropdownIndicator: () => "!text-muted-foreground",
  clearIndicator: () => "!text-muted-foreground hover:!text-foreground",
  loadingIndicator: () => "!text-muted-foreground",
};
