import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminUsersListPage from './AdminUsersListPage';

describe('AdminUsersListPage', () => {
  it('renders without error', () => {
    render(<AdminUsersListPage />);
    // Optional: simple check
    expect(screen.getByText(/AdminUsersListPage/i)).toBeInTheDocument();
  });
});
