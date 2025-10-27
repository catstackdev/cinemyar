import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from './404Page';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('NotFoundPage', () => {
  it('renders 404 heading', () => {
    renderWithRouter(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders page not found title', () => {
    renderWithRouter(<NotFoundPage />);
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('renders default message', () => {
    renderWithRouter(<NotFoundPage />);
    expect(
      screen.getByText(/The page you're looking for doesn't exist or has been moved/i)
    ).toBeInTheDocument();
  });

  it('renders custom message when provided', () => {
    const customMessage = 'Custom error message';
    renderWithRouter(<NotFoundPage message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('renders home button by default', () => {
    renderWithRouter(<NotFoundPage />);
    const homeButton = screen.getByRole('link', { name: /back to home/i });
    expect(homeButton).toBeInTheDocument();
    expect(homeButton).toHaveAttribute('href', '/');
  });

  it('hides home button when showHomeButton is false', () => {
    renderWithRouter(<NotFoundPage showHomeButton={false} />);
    const homeButton = screen.queryByRole('link', { name: /back to home/i });
    expect(homeButton).not.toBeInTheDocument();
  });

  it('renders back button by default', () => {
    renderWithRouter(<NotFoundPage />);
    expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument();
  });

  it('hides back button when showBackButton is false', () => {
    renderWithRouter(<NotFoundPage showBackButton={false} />);
    const backButton = screen.queryByRole('button', { name: /go back/i });
    expect(backButton).not.toBeInTheDocument();
  });

  it('renders children when provided', () => {
    const testChild = <div>Additional content</div>;
    renderWithRouter(<NotFoundPage>{testChild}</NotFoundPage>);
    expect(screen.getByText('Additional content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-404-class';
    const { container } = renderWithRouter(
      <NotFoundPage className={customClass} />
    );
    expect(container.firstChild).toHaveClass(customClass);
  });
});
