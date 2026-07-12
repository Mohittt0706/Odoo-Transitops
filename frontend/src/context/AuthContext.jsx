import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth.service";

const AuthContext = createContext(null);

const ROLE_MAP = {
  OPERATION_LEAD: "operations",
  ROAD_CAPTAIN: "road-captain",
  SAFETY_OFFICER: "safety",
  FINANCE_HUB: "finance",
  DESTINATION_CONTROL: "destination",
};

function mapRole(backendRole) {
  return ROLE_MAP[backendRole] || backendRole;
}

function getInitialUser() {
  try {
    const stored = localStorage.getItem("transitops_auth");
    return stored ? JSON.parse(stored) : null;
  } catch {
    localStorage.removeItem("transitops_auth");
    return null;
  }
}

function buildUserData(u) {
  return {
    id: u._id || u.id,
    email: u.email,
    role: mapRole(u.role),
    name: u.fullName || u.name,
  };
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
            const userData = buildUserData(u);
            localStorage.setItem("transitops_auth", JSON.stringify(userData));
            setUser(userData);
          } else {
            setUser(null);
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
      const role = mapRole(u.role);
      if (!role) {
        return { success: false, error: "Invalid user role returned from server." };
      }
      if (role !== expectedRole) {
        return { success: false, error: "Invalid credentials for this role." };
      }
      localStorage.setItem("authToken", token);
      const userData = buildUserData(u);
      localStorage.setItem("transitops_auth", JSON.stringify(userData));
      setUser(userData);
      return { success: true, role };
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
