import { render, screen } from "@testing-library/react";
import { DrawerRoot, DrawerContent, DrawerTitle } from "./index";
import "@testing-library/jest-dom";

describe("Drawer", () => {
  it("renders drawer when open", () => {
    render(
      <DrawerRoot open={true}>
        <DrawerContent>
          <DrawerTitle>Test Drawer</DrawerTitle>
        </DrawerContent>
      </DrawerRoot>,
    );

    expect(screen.getByText("Test Drawer")).toBeInTheDocument();
  });

  it("does not render drawer when closed", () => {
    render(
      <DrawerRoot open={false}>
        <DrawerContent>
          <DrawerTitle>Test Drawer</DrawerTitle>
        </DrawerContent>
      </DrawerRoot>,
    );

    expect(screen.queryByText("Test Drawer")).not.toBeInTheDocument();
  });
});
