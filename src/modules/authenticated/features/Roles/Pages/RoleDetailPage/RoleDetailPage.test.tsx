import React from 'react';
import { render, screen } from '@testing-library/react';
import RoleDetailPage from './RoleDetailPage';

describe('RoleDetailPage', () => {
  it('renders without error', () => {
    render(<RoleDetailPage />);
    // Optional: simple check
    expect(screen.getByText(/RoleDetailPage/i)).toBeInTheDocument();
  });
});
