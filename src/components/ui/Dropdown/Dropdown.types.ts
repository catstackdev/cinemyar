import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type DropdownAlign = "start" | "center" | "end";

export interface DropdownProps {
  children: ReactNode;
}

export interface DropdownTriggerProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  className?: string;
}

export interface DropdownMenuProps extends ComponentPropsWithoutRef<"div"> {
  align?: DropdownAlign;
  className?: string;
  children: ReactNode;
}

export interface DropdownItemProps extends ComponentPropsWithoutRef<"button"> {
  icon?: ReactNode;
  destructive?: boolean;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export interface DropdownSeparatorProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
}
