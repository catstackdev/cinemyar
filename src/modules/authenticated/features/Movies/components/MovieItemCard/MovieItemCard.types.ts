export interface MovieItemCardProps {
  title: string;
  description?: string;
  imageUrl?: string | undefined | null;
  onClick?: () => void;
  className?: string;
}
