import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "./useAuthRedirect";

export default function AuthGuard() {
  const { isLoading, isAuthenticated } = useAuthStatus();

  if (isLoading) return null; // or a loading spinner

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
