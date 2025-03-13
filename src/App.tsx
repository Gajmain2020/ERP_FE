import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";

import StudentHomepage from "./components/Homepage/StudentHomepage";
import Layout from "./components/Layout/Layout";
import Landing from "./pages/Landing/Landing";
import useAuthStore from "./store/userAuthStore";
import NotAuthorized from "./pages/Common/NotAuthorized";
import NotFound from "./pages/Common/NotFound";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import UserTypeCheck from "./utils/UsetTypeCheck";
import ImageUpload from "./components/Testing/Test";
import StudentDetails from "./pages/Student/StudentDetails";

const App: React.FC = () => {
  const { authToken, userType, id } = useAuthStore();

  // User is logged in if `authToken` exists
  const isLoggedIn = !!authToken;

  const userRoute = `/user/${userType}/${id}`;

  return (
    <>
      <Router>
        <Routes>
          {/* Landing Page */}
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to={userRoute} replace /> : <Landing />
            }
          />
          <Route path="/test" element={<ImageUpload />} />

          {/* Protected Routes for student */}
          <Route
            path="/user/student/:id"
            element={
              <ProtectedRoutes isLoggedIn={isLoggedIn}>
                <UserTypeCheck>
                  <Layout />
                </UserTypeCheck>
              </ProtectedRoutes>
            }
          >
            <Route index element={<StudentHomepage />} />
            <Route path="details" element={<StudentDetails />} />
            <Route path="notice" element={<>Hello from student side</>} />
          </Route>

          {/* Protected Routes for faculty */}
          <Route
            path="/user/faculty/:userName/*"
            element={
              <ProtectedRoutes isLoggedIn={isLoggedIn}>
                <UserTypeCheck>
                  <Layout />
                </UserTypeCheck>
              </ProtectedRoutes>
            }
          >
            <Route index element={<>faculty home page comming soon</>} />
            <Route path="notice" element={<>Hello from faculty side</>} />
          </Route>

          {/* Not Authorized Page */}
          <Route
            path="/not-authorized"
            element={
              isLoggedIn ? (
                <Navigate to={userRoute} replace />
              ) : (
                <NotAuthorized />
              )
            }
          />

          {/* Catch-All for Page Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
};

export default App;
