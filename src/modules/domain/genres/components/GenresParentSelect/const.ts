import type { ClassNamesConfig } from "react-select";

export const tailwindSelectClasses: ClassNamesConfig = {
  control: (state) =>
    `!rounded-md !border !px-1 !py-1 text-sm ${
      state.isFocused
        ? "!border-primary !ring-2 !ring-primary !ring-offset-2"
        : "!border-input"
    } !bg-background`,
  menu: () =>
    "!rounded-md !border !border-input !bg-background !shadow-lg !mt-1",
  option: (state) =>
    `!px-3 !py-2 text-sm ${
      state.isSelected
        ? "!bg-primary !text-primary-foreground"
        : state.isFocused
          ? "!bg-muted !text-foreground"
          : "!bg-background !text-foreground"
    } transition-colors duration-150`,
  // Add other necessary component classes here (e.g., placeholder, singleValue, input)
};
