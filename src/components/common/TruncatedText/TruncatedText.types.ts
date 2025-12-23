export interface TruncatedTextProps {
  /**
   * The text content to display
   */
  text: string | null | undefined;

  /**
   * Maximum number of characters before truncation
   * @default 50
   */
  maxLength?: number;

  /**
   * CSS class for the text container
   */
  className?: string;

  /**
   * CSS class for the tooltip content
   */
  tooltipClassName?: string;

  /**
   * Tooltip position
   * @default 'top'
   */
  tooltipPosition?: "top" | "bottom" | "left" | "right";

  /**
   * Placeholder text when text is null/undefined
   * @default '—'
   */
  placeholder?: string;

  /**
   * Disable tooltip (only show truncated text)
   * @default false
   */
  disableTooltip?: boolean;

  /**
   * Show tooltip even if text is not truncated
   * @default false
   */
  alwaysShowTooltip?: boolean;
  textClassName?: string;
}
