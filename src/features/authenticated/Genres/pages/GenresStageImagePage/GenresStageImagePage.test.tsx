import React from 'react';
import { render, screen } from '@testing-library/react';
import GenresStageImagePage from './GenresStageImagePage';

describe('GenresStageImagePage', () => {
  it('renders without error', () => {
    render(<GenresStageImagePage />);
    // Optional: simple check
    expect(screen.getByText(/GenresStageImagePage/i)).toBeInTheDocument();
  });
});
