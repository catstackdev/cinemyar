import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import AppHeader from './AppHeader';
import { SidebarProvider } from '@/contexts/SidebarContext';
import { ThemeContextProvider } from '@/contexts/ThemeContext';

describe('AppHeader', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ThemeContextProvider>
          <SidebarProvider>
            <AppHeader />
          </SidebarProvider>
        </ThemeContextProvider>
      </BrowserRouter>
    );
  });
});
