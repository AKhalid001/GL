import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthService } from "../services/authService";
import type { AuthUser } from "../model/AuthUser";
import { useToastContext } from "../../../contexts/ToastContext";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { showToast } = useToastContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loginResp = await AuthService.login(username, password);
      const loggedInUser: AuthUser = {
        id: loginResp.id,
        username: loginResp.username,
        email: loginResp.email,
        role: loginResp.role,
      };
      login(loggedInUser, loginResp.token);
      navigate("/");
    } catch {
      showToast("Invalid Credentials", "error");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className="text-center mb-4">
          <div className={`${styles.icon} text-primary mb-2`}>
            <i className="bi bi-check2-square" />
          </div>
          <h5 className="fw-bold mb-1">Task Management System</h5>
          <p className="text-muted small mb-0">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold small text-secondary">Username</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="bi bi-person text-muted" />
              </span>
              <input
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold small text-secondary">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="bi bi-lock text-muted" />
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            <i className="bi bi-box-arrow-in-right me-2" />
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
