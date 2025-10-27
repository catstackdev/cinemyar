import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import Backdrop from './Backdrop';

describe('Backdrop', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<Backdrop data-testid="backdrop" />);
    expect(screen.getByTestId('backdrop')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<Backdrop>{testChildText}</Backdrop>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<Backdrop className={customClass} />);
    expect(screen.getByTestId('backdrop')).toHaveClass(customClass);
  });

  // Test 4: Renders as a different element when 'as' prop is used
  it('renders as a different element when the "as" prop is used', () => {
    render(<Backdrop as="span" data-testid="backdrop" />);
    const component = screen.getByTestId('backdrop');
    expect(component.tagName).toBe('SPAN'); // Check that the rendered element is a <span>
  });
});
