import { Navigate } from "react-router";
import { useAuthStatus } from "./useAuthRedirect";

export default function ResolveInitialElement() {
  const { isLoading, isAuthenticated } = useAuthStatus();

  if (isLoading) return null;

  return isAuthenticated ? (
    <Navigate to="/chat" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}
