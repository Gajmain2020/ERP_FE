import LOGO from "../../../public/full logo.png";
import BackgroundImage from "../../../public/mainbackground.jpg";
import CenterImage from "../../../public/landing image.avif";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { ContactModal } from "./Helper/Helpline";
import LoginForm from "./Helper/LoginForm";
import LandingFooter from "./Helper/LandingFooter";
// import useAuthStore from "@/store/userAuthStore";

export default function Landing() {
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
        <div className="text-center max-w-6xl gap-x-10 text-white z-10 w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div className="hidden lg:block">
            <img
              src={CenterImage}
              alt="Landing Center Image"
              className="h-auto w-full object-contain rounded-md shadow-lg"
            />
          </div>
          <div className="h-full w-full px-4 py-6 bg-white rounded-lg shadow-lg">
            <LoginForm />
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
          {/* <Button
            onClick={() => alert("General Notice Clicked")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md"
          >
            General Notice
          </Button> */}
        </div>
      </div>
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />

      <LandingFooter />
    </div>
  );
}
