import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Toaster } from "sonner";

import StudentHomepage from "./components/Homepage/StudentHomepage";
import Layout from "./components/Layout/Layout";
import ImageUpload from "./components/Testing/Test";
import AdminHomepage from "./pages/Admin/AdminHomepage";
import ManageStudents from "./pages/Admin/ManageStudents";
import NotAuthorized from "./pages/Common/NotAuthorized";
import NotFound from "./pages/Common/NotFound";
import FacultyProfile from "./pages/Faculty/FacultyProfile";
import Homepage from "./pages/Faculty/Homepage";
import AdminLanding from "./pages/Landing/AdminLanding";
import Landing from "./pages/Landing/Landing";
import StudentDetails from "./pages/Student/StudentDetails";
import useAuthStore from "./store/userAuthStore";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import UserTypeCheck from "./utils/UsetTypeCheck";

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
          <Route
            path="/admin"
            element={
              isLoggedIn ? (
                <Navigate to={userRoute} replace />
              ) : (
                <AdminLanding />
              )
            }
          />
          <Route path="/test" element={<ImageUpload />} />

          {/* Protected Routes for admin */}
          <Route
            path="/user/admin/:id"
            element={
              <ProtectedRoutes isLoggedIn={isLoggedIn}>
                <UserTypeCheck>
                  <Layout />
                </UserTypeCheck>
              </ProtectedRoutes>
            }
          >
            <Route index element={<AdminHomepage />} />
            <Route path="manage-students" element={<ManageStudents />} />
            <Route
              path="manage-faculty"
              element={<>Hello from faculty side</>}
            />
          </Route>

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
            path="/user/faculty/:id"
            element={
              <ProtectedRoutes isLoggedIn={isLoggedIn}>
                <UserTypeCheck>
                  <Layout />
                </UserTypeCheck>
              </ProtectedRoutes>
            }
          >
            <Route index element={<Homepage />} />
            <Route path="Profile" element={<FacultyProfile />} />
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
