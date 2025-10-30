import React from "react";
import { cn } from "@/utils/helpers/classNames";
import type { PageNotFoundProps } from "./PageNotFound.types";
import { Link } from "react-router-dom";
import { SearchX, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui";

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
        "flex items-center justify-center min-h-screen bg-card/80 backdrop-blur-lg",
        className,
      )}
      {...rest}
    >
      <div className="max-w-2xl w-full mx-4">
        <div className=" rounded-2xl shadow-theme-xl p-8 md:p-12 text-center border border-border/40">
          {/* Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-brand-50  mb-6 animate-pulse-slow">
              <SearchX className="w-12 h-12 text-brand-500 " />
            </div>

            {/* 404 Text */}
            <div className="mb-4">
              <h1 className="text-9xl font-bold text-brand-500  tracking-tight">
                404
              </h1>
              <div className="h-1 w-24 mx-auto bg-brand-500  rounded-full mt-4" />
            </div>

            {/* Title */}
            <h2 className="text-title-lg font-bold text-muted-foreground  mb-3">
              Page Not Found
            </h2>

            {/* Description */}
            <p className="text-muted-foreground text-theme-xl max-w-md mx-auto">
              {message}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            {showBackButton && (
              <Button
                color="secondary"
                onClick={() => window.history.back()}
                leftIcon={<ArrowLeft className="w-5 h-5" />}
              >
                Go Back
              </Button>
            )}

            {showHomeButton && (
              <Button
                color="primary"
                as={Link}
                to="/"
                rightIcon={<Home className="w-5 h-5" />}
              >
                Go Home
              </Button>
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
            <Button variant="link" size="sm" color="primary" as={Link} to="/">
              Home
            </Button>
            <Button
              variant="link"
              size="sm"
              color="primary"
              as={Link}
              to="/about"
            >
              About
            </Button>
            <Button
              color="primary"
              as={Link}
              to="/contact"
              variant="link"
              size="sm"
            >
              Contact
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
