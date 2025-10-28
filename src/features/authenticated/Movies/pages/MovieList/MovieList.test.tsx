import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieList from './MovieList';

describe('MovieList', () => {
  it('renders without error', () => {
    render(<MovieList />);
    // Optional: simple check
    expect(screen.getByText(/MovieList/i)).toBeInTheDocument();
  });
});
