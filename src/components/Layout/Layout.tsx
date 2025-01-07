import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "../Sidebar/Sidebar";
import { MobileNavbar } from "../Mobile Navbar/MobileNavbar";

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex flex-col w-full">
          <MobileNavbar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 pt-[calc(4rem+1rem)] md:pt-6">
            <Outlet /> {/* This renders the child routes */}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
