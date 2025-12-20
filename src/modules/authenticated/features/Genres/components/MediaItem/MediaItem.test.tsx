import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import MediaItem from './MediaItem';

describe('MediaItem', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<MediaItem data-testid="mediaItem" />);
    expect(screen.getByTestId('mediaItem')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<MediaItem>{testChildText}</MediaItem>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<MediaItem className={customClass} />);
    expect(screen.getByTestId('mediaItem')).toHaveClass(customClass);
  });

  
});
