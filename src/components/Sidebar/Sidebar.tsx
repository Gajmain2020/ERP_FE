import { useState } from "react";
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

// Define the type for the item
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

const SidebarNavItem = ({
  item,
  isActive,
  onClick,
  path,
}: SidebarNavItemProps) => (
  <SidebarMenuItem key={item.title}>
    <SidebarMenuButton
      asChild
      isActive={isActive}
      onClick={onClick}
      tooltip={item.title}
    >
      <Link to={path} className="flex items-center gap-3 px-4 py-2">
        <item.icon />
        <span>{item.title}</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const reset = useAuthStore().reset;

  console.log(reset);
  const { name, userType } = useAuthStore() as {
    name: string;
    userType: keyof typeof navItems;
  };
  const { state } = useSidebar();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {
      general: true,
      academics: true,
      profile: true,
      financial: true,
      performance: true,
    }
  );

  if (!userType) {
    navigate("/");
    return null;
  }

  const toggleGroup = (group: keyof typeof navItems) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  const getDynamicPath = (basePath: string) => {
    return `/user/${userType}/${name}${basePath}`;
  };

  const navItemsForUser = navItems[userType];

  // Determine the active item based on the current path
  const activePath = location.pathname;

  const handleLogout = () => {
    reset();
    navigate("/");
  };

  return (
    <Sidebar collapsible="icon" className="w-[320px] text-lg">
      <SidebarContent>
        <div className="flex w-full sticky top-0 items-center justify-between p-4">
          <img
            src={NormalLogo}
            alt="Full Logo"
            className="shadow rounded border"
          />
        </div>

        {Object.entries(navItemsForUser).map(([group, items]) => (
          <SidebarGroup className="py-1" key={group}>
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
                        onClick={() => {}}
                      />
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            )}
          </SidebarGroup>
        ))}
      </SidebarContent>

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
  );
}
