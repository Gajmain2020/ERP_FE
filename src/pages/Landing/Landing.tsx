import LOGO from "../../../public/full logo.png";
import BackgroundImage from "../../../public/mainbackground.jpg";
import CenterImage from "../../../public/landing image.avif";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "sonner";
import { ContactModal } from "./Helper/Helpline";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),
});

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

      {/* Footer */}
      <footer className="h-auto bg-[#3D3D3D] text-white py-4 px-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm">
            © 2025 BIT. All Rights Reserved.
            <br />
            Developed by Gajendra Sahu.
          </p>
          <div className="space-x-4 text-sm mt-2 sm:mt-0">
            <a href="#privacy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      loginSchema.parse({ email, password });
      toast.success("Login Successful!");
      // Login logic here

      //

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.errors) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        err.errors.forEach((error: any) => {
          toast.error(error.message);
        });
      }
    }
  };

  const handleUserTypeChange = (type: "Faculty" | "Student") => {
    console.log("Selected User Type:", type);
  };

  return (
    <div className="w-full h-full mx-auto bg-white rounded-lg shadow-lg p-6 flex flex-col gap-5">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Login
      </h2>

      <UserTypeSelector onChange={handleUserTypeChange} />

      <div>
        {/* Email Input */}
        <div className="relative mb-4">
          <Input
            type="email"
            placeholder="Enter your email"
            className="pr-10 text-black border-gray-300 focus:border-blue-500"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Mail className="absolute right-3 top-2.5 text-gray-500" />
        </div>

        {/* Password Input */}
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="pr-10 text-black border-gray-300 focus:border-blue-500"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <EyeOff
              className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <Eye
              className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
      </div>

      {/* Login Button */}
      <Button
        onClick={handleSubmit}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
      >
        Login
      </Button>
    </div>
  );
};

interface UserTypeSelectorProps {
  selectedType?: "Faculty" | "Student";
  onChange: (type: "Faculty" | "Student") => void;
}

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({
  selectedType = "Student",
  onChange,
}) => {
  const [userType, setUserType] = useState<"Faculty" | "Student">(selectedType);

  const handleSelect = (type: "Faculty" | "Student") => {
    setUserType(type);
    onChange(type);
  };

  return (
    <div className="flex gap-4">
      <div
        onClick={() => handleSelect("Student")}
        className={`cursor-pointer px-4 py-1 border rounded-lg flex-1 text-center ${
          userType === "Student"
            ? "bg-blue-500 text-white border-blue-700 hover:bg-blue-600/90 transition"
            : "bg-gray-100 text-gray-700 border-gray-300"
        }`}
      >
        Student
      </div>
      <div
        onClick={() => handleSelect("Faculty")}
        className={`cursor-pointer px-4 py-1 border rounded-lg flex-1 text-center ${
          userType === "Faculty"
            ? "bg-blue-500 text-white border-blue-700 hover:bg-blue-600/90 transition"
            : "bg-gray-100 text-gray-700 border-gray-300"
        }`}
      >
        Faculty
      </div>
    </div>
  );
};
