import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Homepage from "./components/Homepage/Homepage";
import Layout from "./components/Layout/Layout";
import Landing from "./pages/Landing/Landing";
import { Toaster } from "sonner";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Example state for login status

  return (
    <>
      <Router>
        <Routes>
          {/* Landing page for non-logged-in users */}
          <Route path="/" element={<Landing />} />

          {/* Routes wrapped with Layout for logged-in users */}
          {isLoggedIn && (
            <Route element={<Layout />}>
              <Route path="/user" element={<Homepage />} />
            </Route>
          )}

          <Route path="*" element={<>Page not found.</>} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
