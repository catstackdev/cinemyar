import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import SplashScreen from './SplashScreen';

describe('SplashScreen', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    const mockComplete = jest.fn();
    render(<SplashScreen onComplete={mockComplete} data-testid="splashScreen" />);
    expect(screen.getByTestId('splashScreen')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const mockComplete = jest.fn();
    const testChildText = 'Hello World';
    render(<SplashScreen onComplete={mockComplete}>{testChildText}</SplashScreen>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const mockComplete = jest.fn();
    const customClass = 'test-class';
    render(<SplashScreen onComplete={mockComplete} className={customClass} />);
    expect(screen.getByTestId('splashScreen')).toHaveClass(customClass);
  });

  // Test 4: Calls onComplete after animation (4 seconds)
  it('calls onComplete after animation duration', () => {
    jest.useFakeTimers();
    const mockComplete = jest.fn();
    render(<SplashScreen onComplete={mockComplete} />);
    
    // Should not be called before 4 seconds
    jest.advanceTimersByTime(3000);
    expect(mockComplete).not.toHaveBeenCalled();
    
    // Should be called after 4 seconds
    jest.advanceTimersByTime(1000);
    expect(mockComplete).toHaveBeenCalled();
    
    jest.useRealTimers();
  });
});
