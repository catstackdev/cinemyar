import { cloneElement, isValidElement } from "react";
import type { ReactNode, ReactElement, ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/helpers/classNames";
import { useModalContext } from "./ModalContext";

export interface ModalCloseProps extends ComponentPropsWithoutRef<"button"> {
  children?: ReactNode;
  className?: string;
  asChild?: boolean;
}

export const ModalClose = ({
  children,
  className,
  asChild = false,
  onClick,
  ...props
}: ModalCloseProps) => {
  const { close } = useModalContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) {
      close();
    }
  };
  const isChildButton = isValidElement(children) && children.type === "button";

  // console.log("isChildButton", isChildButton, children);
  // if (isChildButton) {
  //   const child = children as ReactElement<any>;
  //   return cloneElement(child, {
  //     onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
  //       child.props.onClick?.(e);
  //       if (!e.defaultPrevented) close();
  //     },
  //     className: cn(child.props.className, className),
  //   });
  // }

  // const shouldUseAsChild =
  //   asChild ?? (isValidElement(children) && typeof children.type !== "string");

  if (asChild && isValidElement(children || isChildButton)) {
    const child = children as ReactElement<{
      onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
      className?: string;
    }>;

    const childOnClick = child.props.onClick;
    const mergedOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      childOnClick?.(e);
      if (!e.defaultPrevented) {
        close();
      }
    };

    return cloneElement(child, {
      onClick: mergedOnClick,
      className: cn(child.props.className, className),
    } as Partial<typeof child.props>);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default ModalClose;
