import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from './index';

describe('Input', () => {
  it('renders input field without crashing', () => {
    render(
      <Input.Root name="test">
        <Input.Field data-testid="input-field" placeholder="Test" />
      </Input.Root>
    );
    expect(screen.getByTestId('input-field')).toBeInTheDocument();
  });

  it('renders label and field', () => {
    render(
      <Input.Root name="username">
        <Input.Label>Username</Input.Label>
        <Input.Field placeholder="Enter username" />
      </Input.Root>
    );
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(
      <Input.Root name="email" error="Invalid email">
        <Input.Field type="email" />
        <Input.Error />
      </Input.Root>
    );
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');
  });

  it('shows required asterisk on label', () => {
    render(
      <Input.Root name="required">
        <Input.Label required>Required Field</Input.Label>
        <Input.Field />
      </Input.Root>
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('disables input when disabled prop is set', () => {
    render(
      <Input.Root name="disabled" disabled>
        <Input.Field data-testid="input-field" />
      </Input.Root>
    );
    expect(screen.getByTestId('input-field')).toBeDisabled();
  });
});
