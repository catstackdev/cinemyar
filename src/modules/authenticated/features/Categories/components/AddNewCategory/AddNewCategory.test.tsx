import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddNewCategory from './AddNewCategory';

describe('AddNewCategory', () => {
  it('renders the modal when open', () => {
    render(<AddNewCategory open={true} />);
    expect(screen.getByText('Add New Category')).toBeInTheDocument();
  });

  it('renders form fields', () => {
    render(<AddNewCategory open={true} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<AddNewCategory open={true} />);
    expect(screen.getByRole('button', { name: /Add New Category/i })).toBeInTheDocument();
  });
});
