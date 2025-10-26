import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import Modal from './Modal';

describe('Modal', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<Modal data-testid="modal" />);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<Modal>{testChildText}</Modal>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<Modal className={customClass} data-testid="modal">Content</Modal>);
    expect(screen.getByTestId('modal')).toHaveClass(customClass);
  });

  // Test 4: Renders as a different element when 'as' prop is used
  // it('renders as a different element when the "as" prop is used', () => {
  //   render(<Modal as="span" data-testid="modal">Content</Modal>);
  //   const component = screen.getByTestId('modal');
  //   expect(component.tagName).toBe('SPAN'); // Check that the rendered element is a <span>
  // });
});
