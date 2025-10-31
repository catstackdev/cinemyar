import { render, screen } from '@testing-library/react';
import PricingPage from './PricingPage';

describe('PricingPage', () => {
  it('renders without error', () => {
    render(<PricingPage />);
    // Optional: simple check
    expect(screen.getByText(/PricingPage/i)).toBeInTheDocument();
  });
});
