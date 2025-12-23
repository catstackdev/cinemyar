import { useMemo } from "react";
import type { TruncatedTextProps } from "./TruncatedText.types";
import { Tooltip } from "@/components/ui";
import { cn } from "@/utils/helpers/classNames";

/**
 * TruncatedText - Displays text with automatic truncation and tooltip
 *
 * Features:
 * - Automatically truncates text beyond maxLength
 * - Shows full text in tooltip on hover when truncated
 * - Customizable placeholder for null/undefined values
 * - Supports CSS class customization
 *
 * @example
 * ```tsx
 * <TruncatedText
 *   text="This is a very long description that will be truncated"
 *   maxLength={30}
 * />
 * ```
 */
const TruncatedText = ({
  text,
  maxLength = 50,
  className,
  tooltipClassName,
  tooltipPosition = "top",
  placeholder = "—",
  disableTooltip = false,
  alwaysShowTooltip = false,
  textClassName = "whitespace-nowrap",
}: TruncatedTextProps) => {
  const { displayText, isTruncated, originalText } = useMemo(() => {
    if (!text || text.trim() === "") {
      return {
        displayText: placeholder,
        isTruncated: false,
        originalText: "",
      };
    }

    const trimmed = text.trim();
    const truncated = trimmed.length > maxLength;

    return {
      displayText: truncated ? `${trimmed.slice(0, maxLength)}...` : trimmed,
      isTruncated: truncated,
      originalText: trimmed,
    };
  }, [text, maxLength, placeholder]);

  const showTooltip = !disableTooltip && (isTruncated || alwaysShowTooltip);

  // Note: displayText is already truncated by JavaScript logic above
  const textElement = (
    <span
      className={className}
      title={disableTooltip ? originalText : undefined}
    >
      {displayText}
    </span>
  );

  if (!showTooltip || !originalText) {
    return textElement;
  }

  return (
    <Tooltip
      content={
        <div
          className={cn(
            "max-w-md whitespace-pre-wrap break-words",
            tooltipClassName,
          )}
        >
          {originalText}
        </div>
      }
      position={tooltipPosition}
      maxWidth={400}
    >
      <span className={textClassName}>{textElement}</span>
    </Tooltip>
  );
};

export default TruncatedText;
