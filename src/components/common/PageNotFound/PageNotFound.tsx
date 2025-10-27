import React from "react";
import { cn } from "@/utils/helpers/classNames";
import type { PageNotFoundProps } from "./PageNotFound.types";
import { Link } from "react-router-dom";
import { SearchX, Home, ArrowLeft } from "lucide-react";

const PageNotFound: React.FC<PageNotFoundProps> = ({
  children,
  className,
  message = "The page you're looking for doesn't exist or has been moved.",
  showHomeButton = true,
  showBackButton = true,
  ...rest
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-screen bg-background",
        className,
      )}
      {...rest}
    >
      <div className="max-w-2xl w-full mx-4">
        <div className=" rounded-2xl shadow-theme-xl p-8 md:p-12 text-center border border-gray-200 bg-background">
          {/* Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-brand-50 dark:bg-brand-950 mb-6 animate-pulse-slow">
              <SearchX className="w-12 h-12 text-brand-500 dark:text-brand-400" />
            </div>

            {/* 404 Text */}
            <div className="mb-4">
              <h1 className="text-9xl font-bold text-brand-500 dark:text-brand-400 tracking-tight">
                404
              </h1>
              <div className="h-1 w-24 mx-auto bg-brand-500 dark:bg-brand-400 rounded-full mt-4" />
            </div>

            {/* Title */}
            <h2 className="text-title-lg font-bold text-gray-900 dark:text-white mb-3">
              Page Not Found
            </h2>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 text-theme-xl max-w-md mx-auto">
              {message}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            {showBackButton && (
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium text-theme-sm hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500/20 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>
            )}

            {showHomeButton && (
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-brand-500 text-white font-medium text-theme-sm hover:bg-brand-600 focus:outline-none focus:ring-4 focus:ring-brand-500/20 transition-colors shadow-theme-sm"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            )}
          </div>

          {/* Additional Content */}
          {children && (
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
              {children}
            </div>
          )}
        </div>

        {/* Helper Links (Optional) */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-theme-sm mb-4">
            Here are some helpful links instead:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/"
              className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 text-theme-sm font-medium underline"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 text-theme-sm font-medium underline"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 text-theme-sm font-medium underline"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
