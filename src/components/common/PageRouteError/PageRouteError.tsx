import React, { useState } from "react";
import { cn } from "@/utils/helpers/classNames";
import type { PageRouteErrorProps } from "./PageRouteError.types";
import { useNavigate } from "react-router-dom";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button, MessageBox } from "@/components/ui";

const PageRouteError: React.FC<PageRouteErrorProps> = ({
  children,
  className,
  ...rest
}) => {
  const error = useRouteError();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  let errorMessage: string;
  let statusCode: number | undefined;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText;
    statusCode = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = "Unknown error occurred";
  }

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

  const handleTryAgain = () => {
    handleClose(() => window.location.reload());
  };

  return (
    <MessageBox
      animated
      open={isOpen}
      onClose={handleAnimationEnd}
      withPortal
      portalVariant="cosmic"
      portalIntensity="medium"
      portalSize="lg"
      portalAnimated
      variant="danger"
      fullScreen
      className={cn("text-center", className)}
      {...rest}
    >
      {/* Icon and Status Code */}
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-danger-50 mb-4 transition-all duration-300">
          <AlertCircle className="w-8 h-8 text-danger animate-pulse" />
        </div>
        {statusCode && (
          <div className="text-6xl font-bold text-danger mb-2">
            {statusCode}
          </div>
        )}
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Oops! Something went wrong
        </h1>
      </div>

      {/* Error Description */}
      <p className="text-muted-foreground mb-6 text-sm">
        Sorry, an unexpected error has occurred.
      </p>

      {/* Error Message Box */}
      <div className="bg-danger/10 border border-danger rounded-lg p-4 mb-6">
        <p className="text-danger text-sm font-medium">{errorMessage}</p>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center gap-2">
        <Button
          variant="outline"
          withPulse={isOpen}
          size="sm"
          className="w-full justify-center"
          onClick={handleGoBack}
          disabled={!isOpen}
        >
          Go Back
        </Button>

        <Button
          variant="glass"
          size="sm"
          onClick={handleGoHome}
          className="w-full justify-center"
          disabled={!isOpen}
        >
          Go Home
        </Button>
      </div>

      <Button
        variant="glass"
        size="sm"
        onClick={handleTryAgain}
        className="mt-4 w-full justify-center"
        disabled={!isOpen}
      >
        Try Again
      </Button>

      {children}
    </MessageBox>
  );
};

export default PageRouteError;
