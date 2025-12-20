import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import MediaListPreview from './MediaListPreview';

describe('MediaListPreview', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<MediaListPreview data-testid="mediaListPreview" />);
    expect(screen.getByTestId('mediaListPreview')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<MediaListPreview>{testChildText}</MediaListPreview>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<MediaListPreview className={customClass} />);
    expect(screen.getByTestId('mediaListPreview')).toHaveClass(customClass);
  });

  
});
