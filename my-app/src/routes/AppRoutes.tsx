import { Route, Routes } from "react-router-dom";
import DashboardPage from "../features/dashboard/components/DashboardPage";
import { ROUTES } from "./routeConstants";
import TaskFormPage from "../features/tasks/pages/TaskFormPage";
import TaskMain from "../features/tasks/pages/TaskMain";
import LoginPage from "../features/auth/component/LoginPage";
import ProtectedRoute from "../features/auth/component/ProtectedRoute";
import Profile from "../features/profile/component/Profile";
import UserMain from "../features/users/component/UserMain";
import RoleProtectedRoute from "../features/auth/component/RoleProtectedRoute";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.TASKS} element={<TaskMain />} />
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />

          <Route path={ROUTES.CREATE_TASK} element={<TaskFormPage />} />

          <Route path={ROUTES.EDIT_TASK} element={<TaskFormPage />} />

          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route element={<RoleProtectedRoute roles={["ADMIN"]} />}>
            <Route path={ROUTES.USER} element={<UserMain />} />
          </Route>
        </Route>

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
