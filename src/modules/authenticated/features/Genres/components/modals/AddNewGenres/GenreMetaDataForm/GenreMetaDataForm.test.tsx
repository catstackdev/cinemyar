import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For the toBeInTheDocument matcher
import GenreMetaDataForm from './GenreMetaDataForm';

describe('GenreMetaDataForm', () => {
  // Test 1: Renders the component without crashing
  it('renders without crashing', () => {
    render(<GenreMetaDataForm data-testid="genreMetaDataForm" />);
    expect(screen.getByTestId('genreMetaDataForm')).toBeInTheDocument();
  });

  // Test 2: Renders children correctly
  it('renders children passed to it', () => {
    const testChildText = 'Hello World';
    render(<GenreMetaDataForm>{testChildText}</GenreMetaDataForm>);
    expect(screen.getByText(testChildText)).toBeInTheDocument();
  });

  // Test 3: Applies custom className
  it('applies a custom className', () => {
    const customClass = 'test-class';
    render(<GenreMetaDataForm className={customClass} />);
    expect(screen.getByTestId('genreMetaDataForm')).toHaveClass(customClass);
  });

  
});
