import type { TextareaResize } from "./Textarea.types";

export const textareaResize: Record<TextareaResize, string> = {
  none: "resize-none",
  vertical: "resize-y",
  horizontal: "resize-x",
  both: "resize",
};
