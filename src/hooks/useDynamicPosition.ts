import { useState, useLayoutEffect } from "react";
import type { RefObject } from "react";

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

      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // Calculate available space in vertical directions
      const spaceAbove = triggerRect.top;
      const spaceBelow = viewportHeight - triggerRect.bottom;

      // 1. Calculate default position (below trigger, aligned left)
      let top = triggerRect.bottom + offset;
      let left = triggerRect.left;

      // 2. Vertical Positioning: Choose best position
      // If content is taller than space below AND there's more space above
      if (contentRect.height > spaceBelow && spaceAbove > spaceBelow) {
        // Position above trigger
        top = triggerRect.top - contentRect.height - offset;
        
        // Ensure it doesn't go off top of screen
        if (top < offset) {
          top = offset;
        }
      } else {
        // Position below trigger
        top = triggerRect.bottom + offset;
        
        // Ensure it doesn't go off bottom of screen
        const maxTop = viewportHeight - contentRect.height - offset;
        if (top > maxTop) {
          top = Math.max(offset, maxTop);
        }
      }

      // 3. Horizontal Positioning: Handle overflow
      if (left + contentRect.width > viewportWidth - offset) {
        // Try to align right edge of content with right edge of trigger
        left = triggerRect.right - contentRect.width;
        
        // If still overflowing, align with right viewport edge
        if (left < offset) {
          left = viewportWidth - contentRect.width - offset;
        }
      }

      // Safety: Don't let it go off the left screen edge
      if (left < offset) left = offset;

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
