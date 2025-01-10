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

const App: React.FC = () => {
  const {
    authToken,
    setUserType,
    setName,
    setAuthToken,
    setId,
    userType,
    name,
  } = useAuthStore();

  // User is logged in if `authToken` exists
  const isLoggedIn = !!authToken;

  // Example login function
  const loginExample = () => {
    setUserType("student");
    setName("JohnDoe");
    setAuthToken("example-token-1234");
    setId("123");
  };

  const userRoute = `/user/${userType}/${name}`;

  return (
    <>
      {/* <button
        onClick={loginExample}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Simulate Login
      </button>
      <p>
        Current User: {name} ({userType})
      </p> */}
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
            path="/user/student/:userName/*"
            element={
              <ProtectedRoutes isLoggedIn={isLoggedIn}>
                <UserTypeCheck>
                  <Layout />
                </UserTypeCheck>
              </ProtectedRoutes>
            }
          >
            <Route index element={<StudentHomepage />} />
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
