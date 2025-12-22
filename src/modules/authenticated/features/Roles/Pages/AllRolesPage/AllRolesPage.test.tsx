import React from 'react';
import { render, screen } from '@testing-library/react';
import AllRolesPage from './AllRolesPage';

describe('AllRolesPage', () => {
  it('renders without error', () => {
    render(<AllRolesPage />);
    // Optional: simple check
    expect(screen.getByText(/AllRolesPage/i)).toBeInTheDocument();
  });
});
