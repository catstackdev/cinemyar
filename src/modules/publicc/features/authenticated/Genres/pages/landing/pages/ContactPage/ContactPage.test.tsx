import { render, screen } from '@testing-library/react';
import ContactPage from './ContactPage';

describe('ContactPage', () => {
  it('renders without error', () => {
    render(<ContactPage />);
    // Optional: simple check
    expect(screen.getByText(/ContactPage/i)).toBeInTheDocument();
  });
});
