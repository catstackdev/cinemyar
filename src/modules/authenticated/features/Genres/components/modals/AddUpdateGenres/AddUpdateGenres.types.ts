import type { AdminGenreSerialized } from "@/shared/types";

export interface AddNewGenresProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  genre?: AdminGenreSerialized | null;
}
