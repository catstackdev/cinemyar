import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageMeta, { AppWrapper } from './AppWrapper';

describe('AppWrapper', () => {
  it('renders children correctly', () => {
    const testChildText = 'Hello World';
    render(<AppWrapper>{testChildText}</AppWrapper>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });
});

describe('PageMeta', () => {
  it('renders without crashing', () => {
    render(<PageMeta title="Test Title" description="Test Description" />);
    expect(document.title).toBe('Test Title');
  });

  it('sets the page title and description', () => {
    const title = 'Test Page';
    const description = 'Test Description';
    render(<PageMeta title={title} description={description} />);
    expect(document.title).toBe(title);
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute('content')).toBe(description);
  });
});
