import { useState } from "react";

import SmallLogo from "../../../public/logo1.jpeg";
import NormalLogo from "../../../public/logo2.png";

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
import { Link } from "react-router-dom";
import { navItems } from "@/utils/nav-items";
import useAuthStore from "@/store/userAuthStore";

export function AppSidebar() {
  const { name, userType } = useAuthStore(); // Ensure userType and username are available
  const { state } = useSidebar();
  const [activeItem, setActiveItem] = useState(navItems.general[0].title);
  const [expandedGroups, setExpandedGroups] = useState({
    general: true,
    academics: true,
    profile: true,
    financial: true,
    performance: true,
  });

  const toggleGroup = (group: keyof typeof navItems) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  const getDynamicPath = (basePath: string) => {
    return `/user/${userType}/${name}${basePath}`;
  };

  return (
    <Sidebar collapsible="icon" className="w-[320px] text-lg ">
      <SidebarContent>
        <div className="flex w-full items-center justify-between p-4">
          {state === "expanded" ? (
            <img
              src={NormalLogo}
              alt="Full Logo"
              className="shadow rounded border"
            />
          ) : (
            <img src={SmallLogo} alt="Icon Logo" className="w-[50px]" />
          )}
        </div>

        {Object.entries(navItems).map(([group, items]) => (
          <SidebarGroup key={group}>
            <SidebarGroupLabel
              className="flex justify-between items-center px-4 py-2 font-bold cursor-pointer"
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
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={activeItem === item.title}
                        onClick={() => setActiveItem(item.title)}
                        tooltip={state === "collapsed" ? item.title : undefined}
                      >
                        <Link
                          to={getDynamicPath(item.path)}
                          className="flex items-center gap-3 px-4 py-2"
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
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
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
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
