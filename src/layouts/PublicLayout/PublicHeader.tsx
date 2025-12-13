import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/utils/helpers";
import type { PublicHeaderProps } from "./PublicLayout.types";
import { useAppSelector } from "@/store/hooks";
import { UserDropdown } from "../AppHeader/components";

const PublicHeader: React.FC<PublicHeaderProps> = ({ className }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { actualTheme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(actualTheme === "dark" ? "light" : "dark");
  };

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  const handleGetStarted = () => {
    navigate("/auth/signup");
  };

  const handleLogin = () => {
    navigate("/auth/login");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-background/80 backdrop-blur-md border-b border-border/50",
        "glass",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo
              size="md"
              variant="full"
              withGlow={actualTheme === "dark"}
              className="transition-all duration-300 hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  "text-muted-foreground hover:text-foreground",
                  "relative py-2",
                  "before:absolute before:bottom-0 before:left-0 before:h-0.5",
                  "before:w-0 before:bg-primary before:transition-all before:duration-300",
                  "hover:before:w-full",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleThemeToggle}
              className="p-2 w-9 h-9"
              aria-label="Toggle theme"
            >
              {actualTheme === "dark" ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </Button>

            {/* Login Button */}
            {isAuthenticated ? (
              <UserDropdown />
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogin}
                  className="hidden sm:inline-flex"
                >
                  Log In
                </Button>

                {/* Get Started Button */}
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleGetStarted}
                  className="shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2 w-9 h-9"
              aria-label="Open menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;

