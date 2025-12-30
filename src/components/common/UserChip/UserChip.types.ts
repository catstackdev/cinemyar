export interface UserInfo {
  id: string;
  username: string;
  email?: string | null;
  role?: string;
  avatar?: string | null;
}

export interface UserChipProps {
  user: UserInfo | null | undefined;
  size?: "sm" | "md" | "lg";
  showAvatar?: boolean;
  showRole?: boolean;
  showEmail?: boolean;
  clickable?: boolean;
  onUserClick?: (userId: string) => void;
  className?: string;
}
