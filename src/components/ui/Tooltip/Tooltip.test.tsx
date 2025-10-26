import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import Tooltip from './Tooltip';

describe('Tooltip', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<Tooltip data-testid="tooltip" content="Tooltip">Trigger</Tooltip>);
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<Tooltip content="Tooltip">{testChildText}</Tooltip>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<Tooltip className={customClass} data-testid="tooltip" content="Tooltip">Trigger</Tooltip>);
    expect(screen.getByTestId('tooltip')).toHaveClass(customClass);
  });

  // Test 4: Renders as a different element when 'as' prop is used
  // it('renders as a different element when the "as" prop is used', () => {
  //   render(<Tooltip as="span" data-testid="tooltip" content="Tooltip">Trigger</Tooltip>);
  //   const component = screen.getByTestId('tooltip');
  //   expect(component.tagName).toBe('SPAN'); // Check that the rendered element is a <span>
  // });
});
