import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

describe('Dashboard', () => {
  it('renders without error', () => {
    render(<Dashboard />);
    // Optional: simple check
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });
});
