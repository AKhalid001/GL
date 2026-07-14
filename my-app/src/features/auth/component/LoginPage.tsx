import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthService } from "../services/authService";
import type { AuthUser } from "../model/AuthUser";
import { useToastContext } from "../../../contexts/ToastContext";
import styles from "./LoginPage.module.css";

const PANEL_FEATURES = [
  { icon: "bi-lightning-charge", text: "Fast task creation and editing" },
  { icon: "bi-bar-chart-line",   text: "Visual progress at a glance"   },
  { icon: "bi-shield-check",     text: "Role-based access control"     },
];

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToastContext();

  const [tab, setTab] = useState<"signin" | "signup">("signin");

  // Sign-in state
  const [username, setUsername]   = useState("");
  const [password, setPassword]   = useState("");

  // Sign-up state
  const [suName,     setSuName]     = useState("");
  const [suEmail,    setSuEmail]    = useState("");
  const [suPassword, setSuPassword] = useState("");
  const [suConfirm,  setSuConfirm]  = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loginResp = await AuthService.login(username, password);
      const loggedInUser: AuthUser = {
        id:       loginResp.id,
        username: loginResp.username,
        email:    loginResp.email,
        role:     loginResp.role,
      };
      login(loggedInUser, loginResp.token);
      navigate("/");
    } catch {
      showToast("Invalid credentials. Please try again.", "error");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (suPassword !== suConfirm) {
      showToast("Passwords do not match.", "error");
      return;
    }
    try {
      const signupResp = await AuthService.signup(suName, suEmail, suPassword);
      const signedUpUser: AuthUser = {
        id:       signupResp.id,
        username: signupResp.username,
        email:    signupResp.email,
        role:     signupResp.role,
      };
      login(signedUpUser, signupResp.token);
      showToast("Account created successfully!", "success");
      navigate("/");
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? err?.response?.data ?? "Sign up failed. Please try again.";
      showToast(typeof msg === "string" ? msg : "Sign up failed. Please try again.", "error");
    }
  };

  return (
    <div className={styles.page}>

      {/* ── Left decorative panel ── */}
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
          {PANEL_FEATURES.map((f) => (
            <div className={styles.panelFeature} key={f.icon}>
              <div className={styles.panelFeatureIcon}>
                <i className={`bi ${f.icon}`} />
              </div>
              {f.text}
            </div>
          ))}
        </div>
      </div>

      {/* ── Right form side ── */}
      <div className={styles.formSide}>
        <div className={styles.formBox}>

          {/* Tab switcher */}
          <div className={styles.tabs}>
            <button
              type="button"
              className={`${styles.tab} ${tab === "signin" ? styles.tabActive : ""}`}
              onClick={() => setTab("signin")}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`${styles.tab} ${tab === "signup" ? styles.tabActive : ""}`}
              onClick={() => setTab("signup")}
            >
              Sign Up
            </button>
          </div>

          {/* ── Sign In form ── */}
          {tab === "signin" && (
            <>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Welcome back</h2>
                <p className={styles.formSubtitle}>Sign in to your account to continue</p>
              </div>

              <form onSubmit={handleSignIn}>
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
                      required
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
                      required
                    />
                  </div>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <i className="bi bi-box-arrow-in-right" />
                  Sign In
                </button>
              </form>

              <p className={styles.switchRow}>
                Don't have an account?
                <button type="button" className={styles.switchLink} onClick={() => setTab("signup")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  Create one
                </button>
              </p>
            </>
          )}

          {/* ── Sign Up form ── */}
          {tab === "signup" && (
            <>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Create an account</h2>
                <p className={styles.formSubtitle}>Fill in the details below to get started</p>
              </div>

              <form onSubmit={handleSignUp}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Username</label>
                  <div className={styles.inputWrap}>
                    <i className={`bi bi-person ${styles.inputIcon}`} />
                    <input
                      className={styles.input}
                      placeholder="Choose a username"
                      value={suName}
                      onChange={(e) => setSuName(e.target.value)}
                      autoComplete="username"
                      required
                    />
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Email Address</label>
                  <div className={styles.inputWrap}>
                    <i className={`bi bi-envelope ${styles.inputIcon}`} />
                    <input
                      type="email"
                      className={styles.input}
                      placeholder="Enter your email"
                      value={suEmail}
                      onChange={(e) => setSuEmail(e.target.value)}
                      autoComplete="email"
                      required
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
                      placeholder="Create a password"
                      value={suPassword}
                      onChange={(e) => setSuPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                    />
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Confirm Password</label>
                  <div className={styles.inputWrap}>
                    <i className={`bi bi-lock-fill ${styles.inputIcon}`} />
                    <input
                      type="password"
                      className={styles.input}
                      placeholder="Repeat your password"
                      value={suConfirm}
                      onChange={(e) => setSuConfirm(e.target.value)}
                      autoComplete="new-password"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <i className="bi bi-person-plus" />
                  Create Account
                </button>
              </form>

              <p className={styles.switchRow}>
                Already have an account?
                <button type="button" className={styles.switchLink} onClick={() => setTab("signin")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  Sign in
                </button>
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default LoginPage;
