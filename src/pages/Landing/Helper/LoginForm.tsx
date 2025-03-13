import { z, ZodError } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

import { Mail, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import UserTypeSelector from "./UserTypeSelector";
import { LoginStudentAPI } from "@/api/studentAPI";
import useAuthStore from "@/store/userAuthStore";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),
});

const LoginForm = () => {
  const navigate = useNavigate();

  const { setAuthToken, setUserType, setName, setId } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate input
      loginSchema.parse({ email, password });

      // Call API
      const res = await LoginStudentAPI(email, password);

      if (!res.success) return; // Stop if login fails

      // Store authentication data
      setAuthToken(res.authToken);
      setName(res.name);
      setUserType(res.userType);
      setId(res.id);

      // Redirect to student dashboard
      navigate(`student/${res.id}`);
    } catch (err) {
      if (err instanceof ZodError) {
        // Handle validation errors from loginSchema
        toast.error(err.errors.map((e) => e.message).join(", "));
      } else {
        // Handle unexpected errors
        toast.error("An unexpected error occurred. Please try again.");
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
