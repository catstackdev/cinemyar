import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import AdminUserAdminsFilter from './AdminUserAdminsFilter';

describe('AdminUserAdminsFilter', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<AdminUserAdminsFilter data-testid="adminUserAdminsFilter" />);
    expect(screen.getByTestId('adminUserAdminsFilter')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<AdminUserAdminsFilter>{testChildText}</AdminUserAdminsFilter>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<AdminUserAdminsFilter className={customClass} />);
    expect(screen.getByTestId('adminUserAdminsFilter')).toHaveClass(customClass);
  });

  
});
