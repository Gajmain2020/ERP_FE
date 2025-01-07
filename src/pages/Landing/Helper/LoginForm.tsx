import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

import { Mail, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import UserTypeSelector from "./UserTypeSelector";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),
});

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePaste = (e: any) => {
    e.preventDefault();
    // Optionally, display a message to the user
    toast.info("Pasting is not allowed.");
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
          <Mail className="absolute right-3 top-1.5 text-gray-500" />
        </div>

        {/* Password Input */}
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="pr-10 text-black border-gray-300 focus:border-blue-500"
            required
            onChange={(e) => setPassword(e.target.value)}
            onPaste={handlePaste}
          />
          {showPassword ? (
            <EyeOff
              className="absolute right-3 top-1.5 text-gray-500 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <Eye
              className="absolute right-3 top-1.5 text-gray-500 cursor-pointer"
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

export default LoginForm;
