import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import AppLayout from "../../../layouts/AppLayout/AppLayout";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

export default ProtectedRoute;
