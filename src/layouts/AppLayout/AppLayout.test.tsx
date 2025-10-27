import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import AppLayout from './AppLayout';

describe('AppLayout', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<AppLayout data-testid="appLayout" />);
    expect(screen.getByTestId('appLayout')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<AppLayout>{testChildText}</AppLayout>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<AppLayout className={customClass} />);
    expect(screen.getByTestId('appLayout')).toHaveClass(customClass);
  });

  // Test 4: Renders as a different element when 'as' prop is used
  it('renders as a different element when the "as" prop is used', () => {
    render(<AppLayout as="span" data-testid="appLayout" />);
    const component = screen.getByTestId('appLayout');
    expect(component.tagName).toBe('SPAN'); // Check that the rendered element is a <span>
  });
});
