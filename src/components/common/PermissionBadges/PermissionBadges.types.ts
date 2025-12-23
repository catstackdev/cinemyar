export interface PermissionBadgesProps {
  /**
   * Array of permission strings (e.g., ['movie.view', 'movie.edit', 'user.*'])
   */
  permissions: string[];
  
  /**
   * Maximum number of badges to show before truncating
   * @default 3
   */
  maxDisplay?: number;
  
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  
  /**
   * Show detailed tooltip on hover
   * @default true
   */
  showTooltip?: boolean;
  
  /**
   * Size variant for badges
   * @default 'sm'
   */
  size?: 'sm' | 'md' | 'lg';
}
