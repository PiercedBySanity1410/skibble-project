import { useEffect, useState } from "react";

export function useAuthStatus(): {
  isLoading: boolean;
  isAuthenticated: boolean;
} {
  const [status, setStatus] = useState({
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {

    const checkAuth = async () => {
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        setStatus({ isLoading: false, isAuthenticated: false });
        return;
      }

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/auth/protected`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (data.msg) {
          localStorage.removeItem("jwt_token");
        }
        setStatus({
          isLoading: false,
          isAuthenticated: !!data?.message,
        });
      } catch (e) {
        setStatus({ isLoading: false, isAuthenticated: false });
      }
    };

    checkAuth();
  }, []);

  return status;
}
