import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import StepTwo from './StepTwo';

describe('StepTwo', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<StepTwo data-testid="stepTwo" />);
    expect(screen.getByTestId('stepTwo')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<StepTwo>{testChildText}</StepTwo>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<StepTwo className={customClass} />);
    expect(screen.getByTestId('stepTwo')).toHaveClass(customClass);
  });

  
});
