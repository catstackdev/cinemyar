import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import Logo from './Logo';

describe('Logo', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<Logo data-testid="logo" />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<Logo>{testChildText}</Logo>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<Logo className={customClass} />);
    expect(screen.getByTestId('logo')).toHaveClass(customClass);
  });

  // Test 4: Renders with default element
  it('renders with default element', () => {
    render(<Logo data-testid="logo" />);
    const component = screen.getByTestId('logo');
    expect(component).toBeInTheDocument();
  });
});
