import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import MediaItemPreview from './MediaItemPreview';

describe('MediaItemPreview', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<MediaItemPreview data-testid="mediaItemPreview" />);
    expect(screen.getByTestId('mediaItemPreview')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<MediaItemPreview>{testChildText}</MediaItemPreview>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<MediaItemPreview className={customClass} />);
    expect(screen.getByTestId('mediaItemPreview')).toHaveClass(customClass);
  });

  
});
