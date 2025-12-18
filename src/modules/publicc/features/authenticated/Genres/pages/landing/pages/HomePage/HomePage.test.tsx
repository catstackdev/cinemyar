import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';

// Mock the context providers
const MockProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
};

describe('HomePage', () => {
  it('renders without error', () => {
    render(
      <MockProviders>
        <HomePage />
      </MockProviders>
    );
    // Check for main sections
    expect(screen.getByText(/Stream Movies, Series & More/i)).toBeInTheDocument();
  });
});
