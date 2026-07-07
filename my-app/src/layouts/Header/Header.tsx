import { Link } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";
import styles from "./Header.module.css";

interface Props {
  onToggleSidebar: () => void;
}

function Header({ onToggleSidebar }: Props) {
  const { user, isAuthenticated, logout } = useAuth();

  const initials = user?.username?.slice(0, 2).toUpperCase() ?? "U";

  return (
    <header className={styles.header}>
      <button className={styles.toggleBtn} onClick={onToggleSidebar} title="Toggle sidebar">
        <i className="bi bi-layout-sidebar" />
      </button>

      <span className={styles.title}>
        Task<span className={styles.titleAccent}>Flow</span>
      </span>

      <div className={styles.right}>
        {isAuthenticated && (
          <>
            <Link to="/profile" className={styles.userChip}>
              <div className={styles.avatar}>{initials}</div>
              {user?.username}
            </Link>
            <button className={styles.logoutBtn} onClick={logout} title="Sign out">
              <i className="bi bi-box-arrow-right" />
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
