import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "../data/mockUsers";

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
    setIsLoading(false);
  }, []);

  const login = useCallback((email, password, expectedRole) => {
    const found = mockUsers.find(
      (u) => u.email === email && u.password === password && u.role === expectedRole
    );
    if (!found) {
      return { success: false, error: "Invalid email or password for this role." };
    }
    const userData = {
      id: found.id,
      email: found.email,
      role: found.role,
      name: found.name,
    };
    localStorage.setItem("transitops_auth", JSON.stringify(userData));
    setUser(userData);
    return { success: true, role: found.role };
  }, []);

  const logout = useCallback(() => {
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
