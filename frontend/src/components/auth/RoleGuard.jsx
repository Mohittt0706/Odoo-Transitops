import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { roleDashboardMap } from "../../data/mockUsers";

export default function RoleGuard({ requiredRole, children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== requiredRole) {
    const target = roleDashboardMap[user.role] || "/login";
    return <Navigate to={target} replace />;
  }

  return children;
}
