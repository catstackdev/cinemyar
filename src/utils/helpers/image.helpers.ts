import type { ImageUrls } from "@/shared/types/types";

export const getSrcSet = (urls?: ImageUrls) => {
  if (!urls) return { src: "", srcSet: "" };

  const sizes = [
    { key: "sm", width: "768w" },
    { key: "md", width: "1280w" },
    { key: "lg", width: "1920w" },
  ];

  const srcSet = sizes
    .filter((s) => urls[s.key])
    .map((s) => `${urls[s.key]} ${s.width}`)
    .join(", ");
  const src = urls.md || urls.original || urls.lg || "";

  return { src, srcSet };
};
