import { Button } from "@/components/ui/button";
import { useState } from "react";
import LOGO from "../../../public/full logo.png";
import BackgroundImage from "../../../public/mainbackground.jpg";

import AdminLoginForm from "./Helper/AdminLoginForm";
import { ContactModal } from "./Helper/Helpline";
import LandingFooter from "./Helper/LandingFooter";
// import useAuthStore from "@/store/userAuthStore";

export default function AdminLanding() {
  const [isContactModalOpen, setContactModalOpen] = useState(false);

  const openContactModal = () => setContactModalOpen(true);
  const closeContactModal = () => setContactModalOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <div className="bg-[#3D3D3D] py-4 px-5 flex items-center justify-center shadow-md">
        <img
          src={LOGO}
          alt="BIT LOGO"
          className="h-12 sm:h-16 object-contain"
        />
      </div>

      {/* Main Content */}
      <div
        className="flex-1 flex items-center justify-center p-4 bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.90), rgba(0, 0, 0, 0.85)), url(${BackgroundImage})`,
        }}
      >
        <div className="text-center max-w-3xl gap-x-10 text-white z-10 w-full">
          <div className="h-full w-full px-4 py-6 bg-white rounded-lg shadow-lg">
            <AdminLoginForm />
          </div>
        </div>

        {/* Helpline & Notice Buttons */}
        <div className="absolute bottom-5 right-5 flex gap-4">
          <Button
            onClick={openContactModal}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg shadow-md"
          >
            Helpline
          </Button>
        </div>
      </div>
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />

      <LandingFooter />
    </div>
  );
}
