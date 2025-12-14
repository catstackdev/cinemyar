import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import QueryParamSearch from './QueryParamSearch';

describe('QueryParamSearch', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<QueryParamSearch data-testid="queryParamSearch" />);
    expect(screen.getByTestId('queryParamSearch')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<QueryParamSearch>{testChildText}</QueryParamSearch>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<QueryParamSearch className={customClass} />);
    expect(screen.getByTestId('queryParamSearch')).toHaveClass(customClass);
  });

  
});
