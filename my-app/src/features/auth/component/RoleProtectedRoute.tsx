import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  roles: string[];
}

function RoleProtectedRoute({roles}:Props) {
  const { user } = useAuth();

  if (!roles.includes(user?.role ?? "")) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}   

export default RoleProtectedRoute;
