import { SidebarTrigger } from "@/components/ui/sidebar";

import logo from "../../../public/logo2.png";

export function MobileNavbar() {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-background border-b flex items-center justify-between px-4 lg:hidden md:hidden z-10">
      <div className="flex justify-between items-center w-full">
        <SidebarTrigger />
        <div className="w-48">
          <img src={logo} alt="BIT LOGO" />
        </div>

        <div></div>
      </div>
    </div>
  );
}
