import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { navItems } from "@/lib/nav-items";
import { AppSidebar } from "../Sidebar/Sidebar";

export function Layout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentRoute = navItems.find((item) => item.path === location.pathname);

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <div className={`md:block ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <AppSidebar />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center h-16 px-4 border-b">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle mobile menu</span>
            </Button>
            <h1 className="text-2xl font-semibold">
              {currentRoute?.title || "ERP & LMS"}
            </h1>
          </header>
          <main className="flex-1 overflow-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
