import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageRouteError from './PageRouteError';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

const createTestRouter = () => {
  return createMemoryRouter(
    [
      {
        path: '/',
        element: <div>Home</div>,
        errorElement: <PageRouteError />,
      },
    ],
    {
      initialEntries: ['/'],
      initialIndex: 0,
    }
  );
};

describe('PageRouteError', () => {
  it('renders error message when error occurs', () => {
    const mockError = new Error('Test error message');
    const router = createTestRouter();
    
    jest.spyOn(require('react-router-dom'), 'useRouteError').mockReturnValue(mockError);
    
    render(<RouterProvider router={router} />);
    
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Test error message/i)).toBeInTheDocument();
  });

  it('renders 404 status code for route errors', () => {
    const mockError = {
      status: 404,
      statusText: 'Not Found',
      data: { message: 'Page not found' },
    };
    
    jest.spyOn(require('react-router-dom'), 'useRouteError').mockReturnValue(mockError);
    jest.spyOn(require('react-router-dom'), 'isRouteErrorResponse').mockReturnValue(true);
    
    const router = createTestRouter();
    render(<RouterProvider router={router} />);
    
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders back to home link', () => {
    const mockError = new Error('Test error');
    jest.spyOn(require('react-router-dom'), 'useRouteError').mockReturnValue(mockError);
    
    const router = createTestRouter();
    render(<RouterProvider router={router} />);
    
    const homeLink = screen.getByRole('link', { name: /back to home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
