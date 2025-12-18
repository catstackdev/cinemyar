import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import AppLayout from './AppLayout';
import { ThemeContextProvider } from '@/contexts/ThemeContext';

describe('AppLayout', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ThemeContextProvider>
          <AppLayout />
        </ThemeContextProvider>
      </BrowserRouter>
    );
  });
});
