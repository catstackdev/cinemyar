import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSeparator,
} from "./";

describe("Dropdown", () => {
  it("renders without crashing", () => {
    render(
      <Dropdown>
        <DropdownTrigger>Menu</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Item 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  it("menu is hidden by default", () => {
    render(
      <Dropdown>
        <DropdownTrigger>Menu</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Item 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
  });

  it("shows menu when trigger is clicked", () => {
    render(
      <Dropdown>
        <DropdownTrigger>Menu</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Item 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    fireEvent.click(screen.getByText("Menu"));
    expect(screen.getByText("Item 1")).toBeInTheDocument();
  });

  it("closes menu when item is clicked", () => {
    render(
      <Dropdown>
        <DropdownTrigger>Menu</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Item 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    fireEvent.click(screen.getByText("Menu"));
    fireEvent.click(screen.getByText("Item 1"));
    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
  });

  it("calls onClick handler when item is clicked", () => {
    const handleClick = jest.fn();
    render(
      <Dropdown>
        <DropdownTrigger>Menu</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem onClick={handleClick}>Item 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    fireEvent.click(screen.getByText("Menu"));
    fireEvent.click(screen.getByText("Item 1"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled item is clicked", () => {
    const handleClick = jest.fn();
    render(
      <Dropdown>
        <DropdownTrigger>Menu</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem onClick={handleClick} disabled>Item 1</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    fireEvent.click(screen.getByText("Menu"));
    fireEvent.click(screen.getByText("Item 1"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders separator correctly", () => {
    render(
      <Dropdown>
        <DropdownTrigger>Menu</DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownSeparator data-testid="separator" />
          <DropdownItem>Item 2</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    
    fireEvent.click(screen.getByText("Menu"));
    expect(screen.getByTestId("separator")).toBeInTheDocument();
  });
});
