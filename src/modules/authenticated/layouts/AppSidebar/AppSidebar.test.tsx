import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import { SidebarProvider } from '@/contexts/SidebarContext';

describe('AppSidebar', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </BrowserRouter>
    );
  });
});
