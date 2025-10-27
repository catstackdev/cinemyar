import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import AppWrapper from './AppWrapper';

describe('AppWrapper', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<AppWrapper data-testid="appWrapper" />);
    expect(screen.getByTestId('appWrapper')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<AppWrapper>{testChildText}</AppWrapper>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<AppWrapper className={customClass} />);
    expect(screen.getByTestId('appWrapper')).toHaveClass(customClass);
  });

  // Test 4: Renders as a different element when 'as' prop is used
  it('renders as a different element when the "as" prop is used', () => {
    render(<AppWrapper as="span" data-testid="appWrapper" />);
    const component = screen.getByTestId('appWrapper');
    expect(component.tagName).toBe('SPAN'); // Check that the rendered element is a <span>
  });
});
