import { Navigate } from "react-router";
import { useAuthStatus } from "./useAuthRedirect";
import type { JSX } from "react";
import "../styles/authentication.scss";
export default function GuestGuard({ children }: { children: JSX.Element }) {
  const { isLoading, isAuthenticated } = useAuthStatus();

  if (isLoading) return null;

  return isAuthenticated ? <Navigate to="/chat" replace /> : children;
}
