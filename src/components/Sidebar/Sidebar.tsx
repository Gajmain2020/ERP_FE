import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import NormalLogo from "/logo2.png";

import { ChevronUp, User2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navItems } from "@/utils/nav-items";
import useAuthStore from "@/store/userAuthStore";
import ChangePassword from "../Helpers/ChangePasswordDialog";

// Define the type for the navigation item
interface NavItem {
  title: string;
  icon: React.ComponentType;
  path: string;
}

interface SidebarNavItemProps {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
  path: string;
}

// Sidebar navigation item component
const SidebarNavItem = ({
  item,
  isActive,
  onClick,
  path,
}: SidebarNavItemProps) => (
  <SidebarMenuItem key={item.title}>
    <SidebarMenuButton
      asChild
      // isActive={isActive}
      onClick={onClick}
      tooltip={item.title}
    >
      <Link
        to={path}
        className={`flex items-center gap-3 px-4 py-2 rounded-md ${
          isActive
            ? "bg-slate-600 font-semibold text-white hover:bg-gray-400 transition-all"
            : "hover:bg-gray-100"
        }`}
      >
        <item.icon />
        <span>{item.title}</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

// Main Sidebar Component
export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const reset = useAuthStore().reset;

  // Get user details from store
  const { id, name, userType } = useAuthStore() as {
    name: string;
    id: string;
    userType: keyof typeof navItems;
  };

  const [changePassword, setChangePassword] = useState(false);

  // Get sidebar state
  const { state } = useSidebar();

  // Sidebar group state for toggling sections
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {
      general: true,
      academics: true,
      profile: true,
      financial: true,
      performance: true,
    }
  );

  // Redirect if user type is not available
  if (!userType) {
    navigate("/");
    return null;
  }

  // Toggle sidebar group open/close state
  const toggleGroup = (group: keyof typeof navItems) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  // Generate dynamic navigation path based on user type and ID
  const getDynamicPath = (basePath: string) => {
    return `/user/${userType}/${id}${basePath}`;
  };

  // Get navigation items for the user type
  const navItemsForUser = navItems[userType];

  // Determine the active item based on the current URL
  const activePath = location.pathname;

  // Logout function
  const handleLogout = () => {
    reset();
    setTimeout(() => navigate("/"), 0);
  };

  const handleChangePassword = () => {
    setChangePassword(true);
  };

  return (
    <>
      <Sidebar collapsible="icon" className="w-[320px] text-lg">
        <SidebarContent>
          {/* Sidebar Header with Logo */}
          <div className="flex w-full sticky top-0 items-center justify-between p-4">
            <img
              src={NormalLogo}
              alt="Full Logo"
              className="shadow rounded border"
            />
          </div>

          {/* Sidebar Menu Groups */}
          {Object.entries(navItemsForUser).map(([group, items]) => (
            <SidebarGroup className="py-1" key={group}>
              {/* Sidebar Group Label with Toggle Button */}
              <SidebarGroupLabel
                className="flex justify-between items-center px-3 py-1 font-bold cursor-pointer"
                onClick={() => toggleGroup(group as keyof typeof navItems)}
              >
                {group.charAt(0).toUpperCase() + group.slice(1)}
                <ChevronUp
                  className={`ml-2 transition-transform ${
                    expandedGroups[group as keyof typeof navItems]
                      ? "rotate-0"
                      : "rotate-180"
                  }`}
                />
              </SidebarGroupLabel>

              {/* Sidebar Group Content */}
              {expandedGroups[group as keyof typeof navItems] && (
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((item) => {
                      const path = getDynamicPath(item.path);
                      const isActive = activePath === path;
                      return (
                        <SidebarNavItem
                          key={item.title}
                          item={item}
                          path={path}
                          isActive={isActive}
                          onClick={() => {
                            navigate(path);
                          }}
                        />
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              )}
            </SidebarGroup>
          ))}
        </SidebarContent>

        {/* Sidebar Footer with User Info and Logout */}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 />
                    {state === "expanded" && (
                      <>
                        <span>{name}</span>
                        <ChevronUp className="ml-auto" />
                      </>
                    )}
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="start" className="w-56">
                  <DropdownMenuItem
                    onClick={handleChangePassword}
                    className="cursor-pointer"
                  >
                    <span>Change Password</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      {changePassword && (
        <ChangePassword
          userType={userType}
          isOpen={changePassword}
          onOpenChange={setChangePassword}
        />
      )}
    </>
  );
}
