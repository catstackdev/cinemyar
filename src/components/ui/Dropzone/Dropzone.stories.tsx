import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Dropzone from './Dropzone';
import type { DropzoneProps } from './Dropzone.types';

const meta: Meta<typeof Dropzone> = {
  title: 'Components/UI/Dropzone',
  component: Dropzone,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dashed', 'solid'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    showFileList: {
      control: 'boolean',
    },
    maxFiles: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropzone>;

const DropzoneWithState = (args: Partial<DropzoneProps>) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>('');

  const handleDrop = (acceptedFiles: File[], rejectedFiles: File[]) => {
    if (rejectedFiles.length > 0) {
      setError('Some files were rejected. Please check file type and size.');
      return;
    }
    setError('');
    setFiles((prev) => [...prev, ...acceptedFiles].slice(0, args.maxFiles || 1));
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Dropzone
      {...args}
      files={files}
      onDrop={handleDrop}
      onRemoveFile={handleRemoveFile}
      error={error || args.error}
    />
  );
};

export const Default: Story = {
  render: (args) => <DropzoneWithState {...args} />,
  args: {
    label: 'Upload File',
    description: 'Drag & drop a file here, or click to select',
    variant: 'default',
    size: 'md',
    showFileList: true,
    maxFiles: 1,
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
    ),
  },
};

export const ImageUpload: Story = {
  render: (args) => <DropzoneWithState {...args} />,
  args: {
    label: 'Upload Images',
    description: 'Upload up to 5 images',
    variant: 'dashed',
    size: 'lg',
    showFileList: true,
    maxFiles: 5,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
};

export const VideoUpload: Story = {
  render: (args) => <DropzoneWithState {...args} />,
  args: {
    label: 'Upload Video',
    description: 'Upload a video file',
    variant: 'solid',
    size: 'lg',
    showFileList: true,
    maxFiles: 1,
    accept: {
      'video/*': ['.mp4', '.webm', '.ogg', '.mov'],
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
  },
};

export const DocumentUpload: Story = {
  render: (args) => <DropzoneWithState {...args} />,
  args: {
    label: 'Upload Documents',
    description: 'Upload PDF or Word documents',
    variant: 'dashed',
    size: 'md',
    showFileList: true,
    maxFiles: 3,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  },
};

export const Small: Story = {
  render: (args) => <DropzoneWithState {...args} />,
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const Large: Story = {
  render: (args) => <DropzoneWithState {...args} />,
  args: {
    ...Default.args,
    size: 'lg',
  },
};

export const Disabled: Story = {
  render: (args) => <DropzoneWithState {...args} />,
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const WithError: Story = {
  render: (args) => (
    <Dropzone
      {...args}
      onDrop={() => {}}
      error="Please upload a valid file"
    />
  ),
  args: {
    ...Default.args,
  },
};

export const MultipleFiles: Story = {
  render: (args) => <DropzoneWithState {...args} />,
  args: {
    ...Default.args,
    label: 'Upload Multiple Files',
    description: 'Upload up to 10 files',
    maxFiles: 10,
  },
};

export const NoFileList: Story = {
  render: (args) => <DropzoneWithState {...args} />,
  args: {
    ...Default.args,
    showFileList: false,
  },
};
