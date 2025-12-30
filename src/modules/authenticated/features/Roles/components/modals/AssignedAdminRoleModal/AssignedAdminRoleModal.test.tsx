import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import AssignedAdminRoleModal from './AssignedAdminRoleModal';

describe('AssignedAdminRoleModal', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<AssignedAdminRoleModal data-testid="assignedAdminRoleModal" />);
    expect(screen.getByTestId('assignedAdminRoleModal')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<AssignedAdminRoleModal>{testChildText}</AssignedAdminRoleModal>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<AssignedAdminRoleModal className={customClass} />);
    expect(screen.getByTestId('assignedAdminRoleModal')).toHaveClass(customClass);
  });

  
});
