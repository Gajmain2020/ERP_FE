import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "../Sidebar/Sidebar";
import { MobileNavbar } from "../Mobile Navbar/MobileNavbar";
import BackgroundImage from "/mainbackground.jpg";
import "../../App.css";

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar with fixed width */}
        <div className="w-[320px] flex-shrink-0">
          <AppSidebar />
        </div>

        {/* Main content area */}
        <SidebarInset
          style={{
            backgroundImage: `linear-gradient(rgba(211, 211, 211, 0.95), rgba(211, 211, 211, 0.85)), url(${BackgroundImage})`,
          }}
          className="flex flex-col w-[100dvw] h-full  flex-1items-center justify-center p-4 bg-cover bg-center relative"
        >
          <MobileNavbar />
          <main className="flex-1 overflow-y-auto py-[calc(0.5rem+0.2rem)] px-[calc(0.2rem+0.1rem)] no-scrollbar">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
