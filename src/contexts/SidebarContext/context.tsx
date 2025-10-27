import { createContext } from 'react';
import { type SidebarContextType } from './SidebarContext.types';

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);