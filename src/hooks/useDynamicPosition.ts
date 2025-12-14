import { useState, useLayoutEffect, RefObject } from "react";

interface UseDynamicPositionProps {
  /** The reference to the button/trigger element */
  triggerRef: RefObject<HTMLElement>;
  /** The reference to the dropdown/content element */
  contentRef: RefObject<HTMLElement>;
  /** Whether the dropdown is currently visible */
  isOpen: boolean;
  /** Space (in px) between the trigger and the content */
  offset?: number;
}

export const useDynamicPosition = ({
  triggerRef,
  contentRef,
  isOpen,
  offset = 4,
}: UseDynamicPositionProps) => {
  // Default to 0,0 - these will update immediately via useLayoutEffect
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    // If not open or refs are missing, skip calculation
    if (!isOpen || !triggerRef.current || !contentRef.current) return;

    const updatePosition = () => {
      const triggerRect = triggerRef.current!.getBoundingClientRect();
      const contentRect = contentRef.current!.getBoundingClientRect();

      // 1. Calculate default position (below trigger, aligned left)
      let top = triggerRect.bottom + offset;
      let left = triggerRect.left;

      // 2. Vertical Collision: If it hits bottom of screen, flip up
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - top;

      // If content is taller than space below, move it above the trigger
      if (contentRect.height > spaceBelow) {
        top = triggerRect.top - contentRect.height - offset;
      }

      // 3. Horizontal Collision: If it hits right of screen, shift left
      const viewportWidth = window.innerWidth;

      if (left + contentRect.width > viewportWidth) {
        // Align right edge of content with right edge of trigger
        left = triggerRect.right - contentRect.width;
      }

      // Safety: Don't let it go off the left screen edge
      if (left < 0) left = offset;

      setCoords({ top, left });
    };

    // Run once immediately
    updatePosition();

    // Re-calculate on scroll or window resize
    // 'true' for capture phase helps detect scroll in parent containers
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, triggerRef, contentRef, offset]);

  return coords;
};
