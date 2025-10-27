import { useContext } from 'react';
import { SidebarContext } from './context';

export function useSidebar() {
  const context = useContext(SidebarContext);
  
  if (context === undefined) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  
  return context;
}
