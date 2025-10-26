import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<ErrorMessage data-testid="errorMessage" />);
    expect(screen.getByTestId('errorMessage')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<ErrorMessage>{testChildText}</ErrorMessage>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<ErrorMessage className={customClass}>Error text</ErrorMessage>);
    expect(screen.getByRole('alert')).toHaveClass(customClass);
  });
});
