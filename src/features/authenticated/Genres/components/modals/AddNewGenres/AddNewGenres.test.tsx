import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import AddNewGenres from './AddNewGenres';

describe('AddNewGenres', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<AddNewGenres data-testid="addNewGenres" />);
    expect(screen.getByTestId('addNewGenres')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<AddNewGenres>{testChildText}</AddNewGenres>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<AddNewGenres className={customClass} />);
    expect(screen.getByTestId('addNewGenres')).toHaveClass(customClass);
  });

  // Test 4: Renders as a different element when 'as' prop is used
  it('renders as a different element when the "as" prop is used', () => {
    render(<AddNewGenres as="span" data-testid="addNewGenres" />);
    const component = screen.getByTestId('addNewGenres');
    expect(component.tagName).toBe('SPAN'); // Check that the rendered element is a <span>
  });
});
