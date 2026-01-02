import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import GenresAuditFilter from './GenresAuditFilter';

describe('GenresAuditFilter', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<GenresAuditFilter data-testid="genresAuditFilter" />);
    expect(screen.getByTestId('genresAuditFilter')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<GenresAuditFilter>{testChildText}</GenresAuditFilter>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<GenresAuditFilter className={customClass} />);
    expect(screen.getByTestId('genresAuditFilter')).toHaveClass(customClass);
  });

  
});
