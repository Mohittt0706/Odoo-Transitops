import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";

const AuthContext = createContext(null);

function getInitialUser() {
  try {
    const stored = localStorage.getItem("transitops_auth");
    return stored ? JSON.parse(stored) : null;
  } catch {
    localStorage.removeItem("transitops_auth");
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && !user) {
      authService.getProfile()
        .then((res) => {
          const u = res.data.user;
          if (u) {
            const userData = { id: u._id || u.id, email: u.email, role: u.role, name: u.name };
            localStorage.setItem("transitops_auth", JSON.stringify(userData));
            setUser(userData);
          }
        })
        .catch(() => {
          localStorage.removeItem("authToken");
          localStorage.removeItem("transitops_auth");
          setUser(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password, expectedRole) => {
    try {
      const res = await authService.login({ email, password });
      const { token, user: u } = res.data;
      if (!token || !u) {
        return { success: false, error: "Invalid response from server." };
      }
      localStorage.setItem("authToken", token);
      const userData = { id: u._id || u.id, email: u.email, role: u.role, name: u.name };
      localStorage.setItem("transitops_auth", JSON.stringify(userData));
      setUser(userData);
      return { success: true, role: u.role };
    } catch (err) {
      const msg = err?.response?.data?.message || "Invalid email or password.";
      return { success: false, error: msg };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("transitops_auth");
    setUser(null);
    navigate("/login");
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
