import { render, screen } from '@testing-library/react';
import Movies from './Movies';

describe('Movies', () => {
  it('renders without error', () => {
    render(<Movies />);
    expect(screen.getByText(/Movies/i)).toBeInTheDocument();
  });
});
