import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import AssignAdminRoleModal from './AssignAdminRoleModal';

describe('AssignAdminRoleModal', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<AssignAdminRoleModal data-testid="assignAdminRoleModal" />);
    expect(screen.getByTestId('assignAdminRoleModal')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<AssignAdminRoleModal>{testChildText}</AssignAdminRoleModal>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<AssignAdminRoleModal className={customClass} />);
    expect(screen.getByTestId('assignAdminRoleModal')).toHaveClass(customClass);
  });

  
});
