import React from "react";
import type { CustomSelectProps } from "./CustomSelect.types";
import { TAILWIND_SELECT_CLASSES } from "./const";
import Select, { type StylesConfig } from "react-select";

const CustomSelect: React.FC<CustomSelectProps> = ({ children, ...rest }) => {
  const portalStyles: StylesConfig = {
    // The menuPortal element is the outer container added to document.body
    menuPortal: (base) => ({
      ...base,
      // Set an extremely high z-index (e.g., 9999 or 99999)
      // to ensure it stacks above the modal (which is probably z-1000 or z-50).
      zIndex: 99999,
    }),
  };
  return (
    <Select
      {...rest}
      isClearable={rest.isClearable ?? true}
      classNames={TAILWIND_SELECT_CLASSES}
      menuPortalTarget={document.body}
      styles={portalStyles}
      menuPlacement="auto"
    />
  );
};

export default CustomSelect;
