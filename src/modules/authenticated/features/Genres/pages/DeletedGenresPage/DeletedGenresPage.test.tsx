import React from 'react';
import { render, screen } from '@testing-library/react';
import DeletedGenresPage from './DeletedGenresPage';

describe('DeletedGenresPage', () => {
  it('renders without error', () => {
    render(<DeletedGenresPage />);
    // Optional: simple check
    expect(screen.getByText(/DeletedGenresPage/i)).toBeInTheDocument();
  });
});
