import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import RolesSidebar from './RolesSidebar';

describe('RolesSidebar', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<RolesSidebar data-testid="rolesSidebar" />);
    expect(screen.getByTestId('rolesSidebar')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<RolesSidebar>{testChildText}</RolesSidebar>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<RolesSidebar className={customClass} />);
    expect(screen.getByTestId('rolesSidebar')).toHaveClass(customClass);
  });

  
});
