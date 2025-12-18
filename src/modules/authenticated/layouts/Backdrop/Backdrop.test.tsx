import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Backdrop from './Backdrop';
import { SidebarProvider } from '@/contexts/SidebarContext';

describe('Backdrop', () => {
  it('renders without crashing', () => {
    render(
      <SidebarProvider>
        <Backdrop />
      </SidebarProvider>
    );
  });
});
