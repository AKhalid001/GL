import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./utils/styles/global.css";
import "./utils/styles/reset.css";
import "./utils/styles/variable.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter } from "react-router-dom";
import { TaskProvider } from "./contexts/TaskContext.tsx";
import { ToastProvider } from "./contexts/ToastContext.tsx";
import AuthProvider from "./features/auth/context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TaskProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </TaskProvider>
  </StrictMode>,
);
