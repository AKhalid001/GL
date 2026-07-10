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
      showToast("Invalid credentials. Please try again.", "error");
    }
  };

  return (
    <div className={styles.page}>
      {/* Left decorative panel */}
      <div className={styles.panel}>
        <div className={styles.panelLogo}>
          <div className={styles.panelLogoIcon}>
            <i className="bi bi-check2-square" />
          </div>
          <span className={styles.panelLogoText}>
            Task<span className={styles.panelLogoAccent}>Flow</span>
          </span>
        </div>

        <h1 className={styles.panelHeading}>
          Manage your tasks<br />with clarity.
        </h1>
        <p className={styles.panelSub}>
          A clean, focused workspace to plan, track, and complete your work — all in one place.
        </p>

        <div className={styles.panelFeatures}>
          {[
            { icon: "bi-lightning-charge", text: "Fast task creation and editing" },
            { icon: "bi-bar-chart-line", text: "Visual progress at a glance" },
            { icon: "bi-shield-check", text: "Role-based access control" },
          ].map((f) => (
            <div className={styles.panelFeature} key={f.icon}>
              <div className={styles.panelFeatureIcon}>
                <i className={`bi ${f.icon}`} />
              </div>
              {f.text}
            </div>
          ))}
        </div>
      </div>

      {/* Right form */}
      <div className={styles.formSide}>
        <div className={styles.formBox}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Welcome back</h2>
            <p className={styles.formSubtitle}>Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Username</label>
              <div className={styles.inputWrap}>
                <i className={`bi bi-person ${styles.inputIcon}`} />
                <input
                  className={styles.input}
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Password</label>
              <div className={styles.inputWrap}>
                <i className={`bi bi-lock ${styles.inputIcon}`} />
                <input
                  type="password"
                  className={styles.input}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>
              <i className="bi bi-box-arrow-in-right" />
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
