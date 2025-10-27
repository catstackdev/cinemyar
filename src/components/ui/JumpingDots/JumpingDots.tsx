import type { JumpingDotsProps } from "./JumpingDots.types";
import { cn } from "@/utils/helpers/classNames";
import styles from "./JumpingDots.module.css";

const JumpingDots = ({
  count = 3,
  className,
  dotClassName,
}: JumpingDotsProps) => {
  return (
    <span className={cn(styles.jumpingDots, className)}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={dotClassName}>
          .
        </span>
      ))}
    </span>
  );
};

JumpingDots.displayName = "JumpingDots";

export default JumpingDots;
