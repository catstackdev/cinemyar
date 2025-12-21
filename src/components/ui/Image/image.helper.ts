export function generateSizesAttribute(imageType?: GenreImageType): string {
  switch (imageType) {
    case "icon":
      return "(max-width: 640px) 64px, (max-width: 1024px) 128px, 256px";
    case "banner":
      return "(max-width: 640px) 768px, (max-width: 1024px) 1280px, 1920px";
    case "thumbnail":
      return "(max-width: 640px) 320px, (max-width: 1024px) 480px, 640px";
    default:
      return "100vw";
  }
}
