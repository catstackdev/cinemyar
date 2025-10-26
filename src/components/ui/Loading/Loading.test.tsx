import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import Loading from './Loading';

describe('Loading', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<Loading data-testid="loading" />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<Loading>{testChildText}</Loading>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<Loading className={customClass} />);
    expect(screen.getByTestId('loading')).toHaveClass(customClass);
  });

  // Test 4: Renders as a different element when 'as' prop is used
  // it('renders as a different element when the "as" prop is used', () => {
  //   render(<Loading as="span" data-testid="loading" />);
  //   const component = screen.getByTestId('loading');
  //   expect(component.tagName).toBe('SPAN'); // Check that the rendered element is a <span>
  // });
});
