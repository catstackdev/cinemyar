import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import AdminRoleFilterState from './AdminRoleFilterState';

describe('AdminRoleFilterState', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<AdminRoleFilterState data-testid="adminRoleFilterState" />);
    expect(screen.getByTestId('adminRoleFilterState')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<AdminRoleFilterState>{testChildText}</AdminRoleFilterState>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<AdminRoleFilterState className={customClass} />);
    expect(screen.getByTestId('adminRoleFilterState')).toHaveClass(customClass);
  });

  
});
