import React, { useState } from "react";
import { cn } from "@/utils/helpers/classNames";
import type { PageNotFoundProps } from "./PageNotFound.types";
import { useNavigate } from "react-router-dom";
import { SearchX, Home, ArrowLeft } from "lucide-react";
import { Button, MessageBox } from "@/components/ui";

const PageNotFound: React.FC<PageNotFoundProps> = ({
  children,
  className,
  message = "The page you're looking for doesn't exist or has been moved.",
  showHomeButton = true,
  showBackButton = true,
  ...rest
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Handle close animation with callback
  const handleClose = (callback: () => void) => {
    setPendingAction(() => callback);
    setIsOpen(false);
  };

  const handleAnimationEnd = () => {
    if (pendingAction) {
      pendingAction();
    }
  };

  const handleGoBack = () => {
    handleClose(() => window.history.back());
  };

  const handleGoHome = () => {
    handleClose(() => navigate("/"));
  };

  return (
    <MessageBox
      animated
      open={isOpen}
      onClose={handleAnimationEnd}
      withPortal
      portalVariant="mystic"
      portalIntensity="low"
      portalSize="lg"
      portalPosition="center"
      portalAnimated
      variant="warning"
      fullScreen
      className={cn("text-center", className)}
      {...rest}
    >
      {/* Icon */}
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-warning-50 mb-4">
          <SearchX className="w-10 h-10 text-warning animate-pulse" />
        </div>

        {/* 404 Text */}
        <div className="mb-4">
          <h1 className="text-8xl md:text-9xl font-bold text-warning tracking-tight">
            404
          </h1>
          <div className="h-1 w-24 mx-auto bg-warning rounded-full mt-4" />
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
          {message}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-6">
        {showBackButton && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleGoBack}
            disabled={!isOpen}
            withPulse={isOpen}
            className="w-full sm:w-auto"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Go Back
          </Button>
        )}

        {showHomeButton && (
          <Button
            variant="glass"
            size="sm"
            onClick={handleGoHome}
            disabled={!isOpen}
            className="w-full sm:w-auto "
            leftIcon={<Home className="w-4 h-4" />}
          >
            Go Home
          </Button>
        )}
      </div>

      {/* Additional Content */}
      {children && (
        <div className="mt-8 pt-8 border-t border-border">{children}</div>
      )}

      {/* Helper Links */}
      {/* <div className="mt-8 text-center"> */}
      {/*   <p className="text-muted-foreground text-xs md:text-sm mb-4"> */}
      {/*     Here are some helpful links instead: */}
      {/*   </p> */}
      {/*   <div className="flex flex-wrap gap-3 justify-center"> */}
      {/*     <Button */}
      {/*       variant="link" */}
      {/*       size="sm" */}
      {/*       color="warning" */}
      {/*       as={Link} */}
      {/*       to="/" */}
      {/*       disabled={!isOpen} */}
      {/*     > */}
      {/*       Home */}
      {/*     </Button> */}
      {/*     <Button */}
      {/*       variant="link" */}
      {/*       size="sm" */}
      {/*       color="warning" */}
      {/*       as={Link} */}
      {/*       to="/authenticated" */}
      {/*       disabled={!isOpen} */}
      {/*     > */}
      {/*       Dashboard */}
      {/*     </Button> */}
      {/*     <Button */}
      {/*       variant="link" */}
      {/*       size="sm" */}
      {/*       color="warning" */}
      {/*       as={Link} */}
      {/*       to="/login" */}
      {/*       disabled={!isOpen} */}
      {/*     > */}
      {/*       Login */}
      {/*     </Button> */}
      {/*   </div> */}
      {/* </div> */}
    </MessageBox>
  );
};

export default PageNotFound;
