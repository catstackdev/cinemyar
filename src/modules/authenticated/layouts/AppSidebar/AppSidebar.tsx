import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { AppSidebarProps } from "./AppSidebar.types";
import { useSidebar } from "@/contexts/SidebarContext";
import { ChevronDownIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { NavItem } from "./nav";
import { getNavForRole } from "./utils/navRoleHelper";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Logo from "@/components/ui/Logo";
import { cn } from "@/utils/helpers";
import { useAppSelector } from "@/store/hooks";
import { filterNavItems } from "@/utils/navPermissions";

const AppSidebar: React.FC<AppSidebarProps> = () => {
  // Get user from Redux state
  const user = useAppSelector((state) => state.auth.user);

  // Get navigation for admin role
  const { main, others } = getNavForRole("admin");

  // Filter navigation items based on user permissions
  const navItems = useMemo(() => filterNavItems(main, user), [main, user]);
  const othersItems = useMemo(
    () => filterNavItems(others, user),
    [others, user],
  );

  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {},
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Check if the current path matches or is a child of the nav path
  // const isActive = useCallback(
  //   (path: string) => {
  //     // Exact match
  //     if (location.pathname === path) return true;
  //
  //     // For parent routes, check if current path starts with nav path
  //     // But exclude root paths to avoid matching everything
  //     if (path !== "/" && location.pathname.startsWith(path + "/")) {
  //       return true;
  //     }
  //
  //     return false;
  //   },
  //   [location.pathname],
  // );
  // 1. Update your isActive logic inside AppSidebar
  const isActive = useCallback(
    (path: string, exact = false) => {
      const currentPath = location.pathname;

      // If 'exact' is true (for Deleted/Staged), only match if strings are identical
      if (exact) {
        return currentPath === path;
      }

      // Exact match is always true
      if (currentPath === path) return true;

      // For the base route (All Genres), check if it's a child (Detail page)
      // but ONLY if the current URL isn't actually matching another sibling
      if (path !== "/" && currentPath.startsWith(path + "/")) {
        // Check if we are in a sub-directory that is actually a sibling in the menu
        // e.g., if path is /genres, and current is /genres/deleted
        // This logic prevents "All Genres" from being active when "Deleted" is active
        const remainingPath = currentPath.replace(path + "/", "");

        // If the next part of the path is "deleted" or "staged-images",
        // we consider this a sibling match, not a child match.
        const siblings = ["deleted", "staged-images"];
        const isSiblingMatch = siblings.some((s) =>
          remainingPath.startsWith(s),
        );

        return !isSiblingMatch;
      }

      return false;
    },
    [location.pathname],
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (subItem.path && isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive, navItems, othersItems]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li
          key={nav.name}
          style={{
            animation: `menu-item-enter 0.3s ease-out ${index * 0.05}s both`,
          }}
        >
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item items-center group w-full ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={cn(
                  "menu-item-icon-size",
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive",
                )}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-primary"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item items-center group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem, subIndex) => {
                  // Skip subitems without a path
                  if (!subItem.path) return null;

                  return (
                    <li
                      key={subItem.name}
                      style={{
                        animation:
                          openSubmenu?.type === menuType &&
                          openSubmenu?.index === index
                            ? `submenu-slide 0.2s ease-out ${subIndex * 0.05}s both`
                            : "none",
                      }}
                    >
                      <Link
                        to={subItem.path}
                        className={`menu-dropdown-item ${
                          isActive(subItem.path)
                            ? "menu-dropdown-item-active"
                            : "menu-dropdown-item-inactive"
                        }`}
                      >
                        {subItem.name}
                        <span className="flex items-center gap-1 ml-auto">
                          {/* {subItem.new && ( */}
                          {/*   <span */}
                          {/*     className={`ml-auto ${ */}
                          {/*       isActive(subItem.path) */}
                          {/*         ? "menu-dropdown-badge-active" */}
                          {/*         : "menu-dropdown-badge-inactive" */}
                          {/*     } menu-dropdown-badge`} */}
                          {/*   > */}
                          {/*     new */}
                          {/*   </span> */}
                          {/* )} */}
                          {/* {subItem.pro && ( */}
                          {/*   <span */}
                          {/*     className={`ml-auto ${ */}
                          {/*       isActive(subItem.path) */}
                          {/*         ? "menu-dropdown-badge-active" */}
                          {/*         : "menu-dropdown-badge-inactive" */}
                          {/*     } menu-dropdown-badge`} */}
                          {/*   > */}
                          {/*     pro */}
                          {/*   </span> */}
                          {/* )} */}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={cn(
        "fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 text-card-foreground h-screen transition-all duration-300 ease-in-out z-50",
        "bg-card/60 backdrop-blur-lg border-r-2 border-r-primary/20 border-t border-t-border/30",
        "supports-[backdrop-filter]:bg-card/40",
        "shadow-2xl shadow-primary/5",
        "before:absolute before:inset-0 before:bg-gradient-to-b before:from-primary/5 before:to-transparent before:pointer-events-none",
        isExpanded || isMobileOpen
          ? "w-[290px]"
          : isHovered
            ? "w-[290px]"
            : "w-[90px]",
        isMobileOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0",
      )}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <Logo variant="full" size="sm" animated />
          ) : (
            <Logo variant="icon" size="md" animated />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-muted-foreground ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <DotsHorizontalIcon className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-muted-foreground ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <DotsHorizontalIcon />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
        {/* {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null} */}
      </div>
    </aside>
  );
};

export default AppSidebar;
