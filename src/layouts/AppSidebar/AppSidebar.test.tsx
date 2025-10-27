import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import AppSidebar from './AppSidebar';

describe('AppSidebar', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<AppSidebar data-testid="appSidebar" />);
    expect(screen.getByTestId('appSidebar')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<AppSidebar>{testChildText}</AppSidebar>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<AppSidebar className={customClass} />);
    expect(screen.getByTestId('appSidebar')).toHaveClass(customClass);
  });

  // Test 4: Renders as a different element when 'as' prop is used
  it('renders as a different element when the "as" prop is used', () => {
    render(<AppSidebar as="span" data-testid="appSidebar" />);
    const component = screen.getByTestId('appSidebar');
    expect(component.tagName).toBe('SPAN'); // Check that the rendered element is a <span>
  });
});
