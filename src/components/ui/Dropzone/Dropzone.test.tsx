import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Dropzone from './Dropzone';

describe('Dropzone', () => {
  const mockOnDrop = jest.fn();

  beforeEach(() => {
    mockOnDrop.mockClear();
  });

  it('renders with label', () => {
    render(
      <Dropzone
        label="Upload File"
        onDrop={mockOnDrop}
      />
    );
    expect(screen.getByText('Upload File')).toBeInTheDocument();
  });

  it('renders with custom description', () => {
    render(
      <Dropzone
        description="Custom drop message"
        onDrop={mockOnDrop}
      />
    );
    expect(screen.getByText('Custom drop message')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(
      <Dropzone
        error="Invalid file type"
        onDrop={mockOnDrop}
      />
    );
    expect(screen.getByText('Invalid file type')).toBeInTheDocument();
  });

  it('renders file list when files are provided', () => {
    const files = [
      new File(['content'], 'test.txt', { type: 'text/plain' }),
    ];

    render(
      <Dropzone
        files={files}
        showFileList={true}
        onDrop={mockOnDrop}
      />
    );

    expect(screen.getByText('test.txt')).toBeInTheDocument();
    expect(screen.getByText('Selected files (1)')).toBeInTheDocument();
  });

  it('does not render file list when showFileList is false', () => {
    const files = [
      new File(['content'], 'test.txt', { type: 'text/plain' }),
    ];

    render(
      <Dropzone
        files={files}
        showFileList={false}
        onDrop={mockOnDrop}
      />
    );

    expect(screen.queryByText('test.txt')).not.toBeInTheDocument();
  });

  it('calls onRemoveFile when remove button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnRemove = jest.fn();
    const files = [
      new File(['content'], 'test.txt', { type: 'text/plain' }),
    ];

    render(
      <Dropzone
        files={files}
        showFileList={true}
        onDrop={mockOnDrop}
        onRemoveFile={mockOnRemove}
      />
    );

    const removeButton = screen.getByLabelText('Remove test.txt');
    await user.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalledWith(0);
  });

  it('applies disabled styles when disabled', () => {
    const { container } = render(
      <Dropzone
        disabled={true}
        onDrop={mockOnDrop}
      />
    );

    const dropzoneElement = container.querySelector('[class*="cursor-not-allowed"]');
    expect(dropzoneElement).toBeInTheDocument();
  });

  it('displays accept and maxSize information', () => {
    render(
      <Dropzone
        accept={{ 'image/*': ['.png', '.jpg'] }}
        maxSize={5 * 1024 * 1024}
        onDrop={mockOnDrop}
      />
    );

    expect(screen.getByText(/Accepted:/)).toBeInTheDocument();
    expect(screen.getByText(/Max size:/)).toBeInTheDocument();
  });

  it('displays maxFiles information when greater than 1', () => {
    render(
      <Dropzone
        maxFiles={5}
        onDrop={mockOnDrop}
      />
    );

    expect(screen.getByText('Max files: 5')).toBeInTheDocument();
  });
});
