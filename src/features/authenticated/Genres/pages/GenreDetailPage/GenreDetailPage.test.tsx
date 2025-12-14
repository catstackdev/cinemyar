import React from 'react';
import { render, screen } from '@testing-library/react';
import GenreDetailPage from './GenreDetailPage';

describe('GenreDetailPage', () => {
  it('renders without error', () => {
    render(<GenreDetailPage />);
    // Optional: simple check
    expect(screen.getByText(/GenreDetailPage/i)).toBeInTheDocument();
  });
});
