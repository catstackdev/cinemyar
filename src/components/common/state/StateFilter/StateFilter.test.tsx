import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import StateFilter from './StateFilter';

describe('StateFilter', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<StateFilter data-testid="stateFilter" />);
    expect(screen.getByTestId('stateFilter')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<StateFilter>{testChildText}</StateFilter>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<StateFilter className={customClass} />);
    expect(screen.getByTestId('stateFilter')).toHaveClass(customClass);
  });

  
});
