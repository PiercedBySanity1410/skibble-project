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
      const sessionUser = localStorage.getItem("sessionUser");
      if (!sessionUser) {
        setStatus({ isLoading: false, isAuthenticated: false });
        return;
      }
      const sessionUserJson = JSON.parse(sessionUser);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/auth/protected`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionUserJson.accessToken}`,
            },
          }
        );
        const data = await res.json();
        if (data.msg) {
          localStorage.removeItem("sessionUser");
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
