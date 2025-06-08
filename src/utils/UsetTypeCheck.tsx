import useAuthStore from "@/store/userAuthStore";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

// Component to check if the user type in the route matches the logged-in user type
const UserTypeCheck: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { userType } = useAuthStore();
  const pathUserType = location.pathname.split("/")[2];

  // Check if the user type from the path matches the logged-in user type
  if (userType !== pathUserType) {
    return <Navigate to="/not-authorized" replace />;
  }

  return <>{children}</>;
};

export default UserTypeCheck;
