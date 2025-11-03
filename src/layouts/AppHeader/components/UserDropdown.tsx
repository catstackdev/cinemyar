import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/state/auth";
import { cn } from "@/utils/helpers";
import Avatar from "@/components/ui/Avatar";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void | Promise<void>;
  variant?: "danger";
}

type MenuItemOrDivider = MenuItem | "divider";

const UserDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // Force logout even if API call fails
      navigate("/");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }
    
    return undefined;
  }, [isOpen]);

  if (!user) {
    return null;
  }

  const getUserDisplayName = () => user.username || user.email.split("@")[0];
  const getUserInitials = () => {
    const displayName = user.username || user.email;
    return displayName.slice(0, 2).toUpperCase();
  };

  const menuItems: MenuItemOrDivider[] = [
    {
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      label: "Profile",
      onClick: () => {
        navigate("/authenticated/profile");
        setIsOpen(false);
      },
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Settings",
      onClick: () => {
        navigate("/authenticated/settings");
        setIsOpen(false);
      },
    },
    "divider",
    {
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ),
      label: "Sign out",
      onClick: handleLogout,
      variant: "danger" as const,
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Avatar Button */}
      <button
        onClick={toggleDropdown}
        className={cn(
          "flex items-center gap-2 p-2 rounded-lg transition-colors duration-200",
          "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          isOpen && "bg-muted"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User menu"
      >
        <Avatar
          size="sm"
          alt={user.username || user.email}
          src={user.avatar}
          fallback={getUserInitials()}
          className="ring-2 ring-background"
        />
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-foreground truncate max-w-32">
            {getUserDisplayName()}
          </div>
          <div className="text-xs text-muted-foreground truncate max-w-32">
            {user.email}
          </div>
        </div>
        <svg
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={cn(
          "absolute right-0 top-full mt-2 w-56 z-50",
          "bg-popover border border-border rounded-lg shadow-lg",
          "py-1 backdrop-blur-sm"
        )}>
          {/* User Info Header */}
          <div className="px-3 py-2 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar
                size="sm"
                alt={user.username || user.email}
                src={user.avatar}
                fallback={getUserInitials()}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">
                  {getUserDisplayName()}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {user.email}
                </div>
                {user.role && (
                  <div className="text-xs text-primary font-medium">
                    {user.role}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems.map((item, index) => {
              if (item === "divider") {
                return (
                  <div key={index} className="h-px bg-border my-1" />
                );
              }

              const menuItem = item as MenuItem;
              return (
                <button
                  key={index}
                  onClick={menuItem.onClick}
                  disabled={isLoading}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2 text-sm transition-colors duration-200",
                    "hover:bg-muted focus:outline-none focus:bg-muted",
                    menuItem.variant === "danger" 
                      ? "text-danger hover:text-danger" 
                      : "text-foreground",
                    isLoading && menuItem.label === "Sign out" && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <span className={cn(
                    "flex-shrink-0",
                    menuItem.variant === "danger" ? "text-danger" : "text-muted-foreground"
                  )}>
                    {menuItem.icon}
                  </span>
                  <span className="flex-1 text-left">{menuItem.label}</span>
                  {isLoading && menuItem.label === "Sign out" && (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;