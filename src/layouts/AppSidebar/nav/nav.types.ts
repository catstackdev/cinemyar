export type NavChildItem = {
  id: string;
  icon?: React.ReactNode;
  name: string;
  path: string;
};
export type NavItem = {
  id: string;
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: NavChildItem[];
};
