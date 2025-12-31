import React from 'react';
import { render, screen } from '@testing-library/react';
import GenresAuditPage from './GenresAuditPage';

describe('GenresAuditPage', () => {
  it('renders without error', () => {
    render(<GenresAuditPage />);
    // Optional: simple check
    expect(screen.getByText(/GenresAuditPage/i)).toBeInTheDocument();
  });
});
