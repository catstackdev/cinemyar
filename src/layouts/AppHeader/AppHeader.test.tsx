import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import AppHeader from './AppHeader';

describe('AppHeader', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<AppHeader data-testid="appHeader" />);
    expect(screen.getByTestId('appHeader')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<AppHeader>{testChildText}</AppHeader>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<AppHeader className={customClass} />);
    expect(screen.getByTestId('appHeader')).toHaveClass(customClass);
  });

  // Test 4: Renders as a different element when 'as' prop is used
  it('renders as a different element when the "as" prop is used', () => {
    render(<AppHeader as="span" data-testid="appHeader" />);
    const component = screen.getByTestId('appHeader');
    expect(component.tagName).toBe('SPAN'); // Check that the rendered element is a <span>
  });
});
