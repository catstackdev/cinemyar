export const useScrollTo = () => {
  const scrollToElement = (id: string, options?: ScrollIntoViewOptions) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        ...options,
      });

      // Optional: Add a highlight effect
      element.classList.add("highlight-flash");
      setTimeout(() => element.classList.remove("highlight-flash"), 2000);
    }
  };

  return { scrollToElement };
};
