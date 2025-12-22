import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import AddUpdateRole from './AddUpdateRole';

describe('AddUpdateRole', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<AddUpdateRole data-testid="addUpdateRole" />);
    expect(screen.getByTestId('addUpdateRole')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<AddUpdateRole>{testChildText}</AddUpdateRole>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<AddUpdateRole className={customClass} />);
    expect(screen.getByTestId('addUpdateRole')).toHaveClass(customClass);
  });

  
});
