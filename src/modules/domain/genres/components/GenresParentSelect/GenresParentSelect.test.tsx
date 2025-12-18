import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import GenresParentSelect from './GenresParentSelect';

describe('GenresParentSelect', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<GenresParentSelect data-testid="genresParentSelect" />);
    expect(screen.getByTestId('genresParentSelect')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<GenresParentSelect>{testChildText}</GenresParentSelect>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<GenresParentSelect className={customClass} />);
    expect(screen.getByTestId('genresParentSelect')).toHaveClass(customClass);
  });

  
});
