import React from 'react';
import { render, screen } from '@testing-library/react';
import Movies from './Movies';

describe('Movies', () => {
  it('renders without error', () => {
    render(<Movies />);
    // Optional: simple check
    expect(screen.getByText(/Movies/i)).toBeInTheDocument();
  });
});
