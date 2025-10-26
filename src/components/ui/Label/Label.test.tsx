import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import Label from './Label';

describe('Label', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<Label data-testid="label" />);
    expect(screen.getByTestId('label')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<Label>{testChildText}</Label>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<Label className={customClass} data-testid="label">Label</Label>);
    expect(screen.getByTestId('label')).toHaveClass(customClass);
  });

  // Test 4: Renders as a different element when 'as' prop is used
  // it('renders as a different element when the "as" prop is used', () => {
  //   render(<Label as="span" data-testid="label">Label</Label>);
  //   const component = screen.getByTestId('label');
  //   expect(component.tagName).toBe('SPAN'); // Check that the rendered element is a <span>
  // });
});
