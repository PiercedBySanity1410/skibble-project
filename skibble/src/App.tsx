import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router";
import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MainLayout from "./pages/MainLayout";
import Welcome from "./pages/Welcome";
import ChatArea from "./pages/ChatArea";
import NotFoundPage from "./pages/NotFoundPage";
import ResolveInitialElement from "./guards/ResolveInitialElement";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Guest Routes (Only visible if NOT logged in) */}
        <Route
          path="/login"
          element={
            <GuestGuard>
              <Login />
            </GuestGuard>
          }
        />
        <Route
          path="/register"
          element={
            <GuestGuard>
              <Register />
            </GuestGuard>
          }
        />

        {/* Redirect / to best path */}
        <Route path="/" element={<ResolveInitialElement />} />

        {/* Protected Chat Routes */}
        <Route element={<AuthGuard />}>
          <Route path="/chat" element={<MainLayout />}>
            <Route index element={<Welcome />} />
            <Route path=":userid" element={<ChatArea />} />
          </Route>
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
