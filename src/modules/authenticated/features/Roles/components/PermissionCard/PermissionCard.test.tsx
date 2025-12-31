import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import PermissionCard from './PermissionCard';

describe('PermissionCard', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<PermissionCard data-testid="permissionCard" />);
    expect(screen.getByTestId('permissionCard')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<PermissionCard>{testChildText}</PermissionCard>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<PermissionCard className={customClass} />);
    expect(screen.getByTestId('permissionCard')).toHaveClass(customClass);
  });

  
});
