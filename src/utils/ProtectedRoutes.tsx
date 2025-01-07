import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

// Define the types for protected route props
interface ProtectedRoutesProps {
  isLoggedIn: boolean;
  children: ReactNode;
}

// Wrapper Component to Protect All Routes
const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
  isLoggedIn,
  children,
}) => {
  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate to="/not-authorized" replace />
  );
};

export default ProtectedRoutes;
