import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import Can from './Can';

describe('Can', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<Can data-testid="can" />);
    expect(screen.getByTestId('can')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<Can>{testChildText}</Can>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<Can className={customClass} />);
    expect(screen.getByTestId('can')).toHaveClass(customClass);
  });

  
});
