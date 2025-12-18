import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import AdminGenresParamFilter from './AdminGenresParamFilter';

describe('AdminGenresParamFilter', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<AdminGenresParamFilter data-testid="adminGenresParamFilter" />);
    expect(screen.getByTestId('adminGenresParamFilter')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<AdminGenresParamFilter>{testChildText}</AdminGenresParamFilter>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<AdminGenresParamFilter className={customClass} />);
    expect(screen.getByTestId('adminGenresParamFilter')).toHaveClass(customClass);
  });

  
});
