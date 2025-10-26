import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import LoadingOverlay from './LoadingOverlay';

describe('LoadingOverlay', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<LoadingOverlay data-testid="loadingOverlay" />);
    expect(screen.getByTestId('loadingOverlay')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<LoadingOverlay>{testChildText}</LoadingOverlay>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<LoadingOverlay className={customClass} />);
    expect(screen.getByTestId('loadingOverlay')).toHaveClass(customClass);
  });

  // Test 4: Renders as a different element when 'as' prop is used
  // it('renders as a different element when the "as" prop is used', () => {
  //   render(<LoadingOverlay as="span" data-testid="loadingoverlay" />);
  //   const component = screen.getByTestId('loadingoverlay');
  //   expect(component.tagName).toBe('SPAN'); // Check that the rendered element is a <span>
  // });
});
