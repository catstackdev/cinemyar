import React from "react";
import { cn } from "@/utils/helpers/classNames";
import type { PageRouteErrorProps } from "./PageRouteError.types";
import { Link } from "react-router-dom";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { AlertCircle, Home } from "lucide-react";

const PageRouteError: React.FC<PageRouteErrorProps> = ({
  children,
  className,
  ...rest
}) => {
  const error = useRouteError();
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

  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950",
        className,
      )}
      {...rest}
    >
      <div className="max-w-md w-full mx-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-theme-lg p-8 text-center border border-gray-200 dark:border-gray-800">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error-50 dark:bg-error-950 mb-4">
              <AlertCircle className="w-8 h-8 text-error-500" />
            </div>
            {statusCode && (
              <div className="text-6xl font-bold text-error-500 mb-2">
                {statusCode}
              </div>
            )}
            <h1 className="text-title-md font-bold text-gray-900 dark:text-white mb-2">
              Oops! Something went wrong
            </h1>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-6 text-theme-sm">
            Sorry, an unexpected error has occurred.
          </p>

          <div className="bg-error-50 dark:bg-error-950/50 border border-error-200 dark:border-error-900 rounded-lg p-4 mb-6">
            <p className="text-error-700 dark:text-error-400 text-theme-sm font-medium">
              {errorMessage}
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-brand-500 text-white font-medium text-theme-sm hover:bg-brand-600 focus:outline-none focus:ring-4 focus:ring-brand-500/20 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PageRouteError;
