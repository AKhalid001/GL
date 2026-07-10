import { Link } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";
import styles from "./Header.module.css";

function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const initials = user?.username?.slice(0, 2).toUpperCase() ?? "U";

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand}>
        <div className={styles.brandIconWrap}>
          <i className="bi bi-check2-square" />
        </div>
        <span className={styles.brandName}>
          Task<span className={styles.brandAccent}>Flow</span>
        </span>
      </Link>

      <div className={styles.right}>
        {isAuthenticated && (
          <>
            <Link to="/profile" className={styles.userChip}>
              <div className={styles.avatar}>{initials}</div>
              {user?.username}
            </Link>
            <div className={styles.divider} />
            <button className={styles.logoutBtn} onClick={logout} title="Sign out">
              <i className="bi bi-box-arrow-right" />
              Sign out
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
