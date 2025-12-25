import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  DrawerRoot,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "./index";
import Button from "../Button";

const meta: Meta<typeof DrawerRoot> = {
  title: "UI/Drawer",
  component: DrawerRoot,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const RightDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Right Drawer</Button>
        <DrawerRoot open={open} onOpenChange={setOpen}>
          <DrawerContent side="right" size="lg">
            <DrawerHeader>
              <DrawerTitle>Drawer Title</DrawerTitle>
              <DrawerDescription>
                This is a description of the drawer content.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p>This is the drawer content.</p>
              <p>You can put any content here.</p>
            </DrawerBody>
            <DrawerFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerRoot>
      </>
    );
  },
};

export const LeftDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Left Drawer</Button>
        <DrawerRoot open={open} onOpenChange={setOpen}>
          <DrawerContent side="left" size="md">
            <DrawerHeader>
              <DrawerTitle>Left Drawer</DrawerTitle>
              <DrawerDescription>
                Drawer sliding from the left side.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p>Content here</p>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose>Close</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </DrawerRoot>
      </>
    );
  },
};

export const FullWidth: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Full Width Drawer</Button>
        <DrawerRoot open={open} onOpenChange={setOpen}>
          <DrawerContent side="right" size="full">
            <DrawerHeader>
              <DrawerTitle>Full Width Drawer</DrawerTitle>
              <DrawerDescription>
                This drawer takes the full width of the screen.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p>Full width content area</p>
            </DrawerBody>
            <DrawerFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerRoot>
      </>
    );
  },
};
