import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useAuth } from "../../features/auth/context/AuthContext";

interface Props {
  isOpen: boolean;
}

function Sidebar({ isOpen }: Props) {
  const { user } = useAuth();

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.show : ""}`}>
      <div className={styles.inner}>
        <nav className={styles.navSection}>
          <div className={styles.navLabel}>Menu</div>
          <ul className={styles.navList}>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                <i className="bi bi-grid-1x2" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                <i className="bi bi-list-check" />
                Tasks
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                <i className="bi bi-person" />
                Profile
              </NavLink>
            </li>
            {user?.role === "ADMIN" && (
              <li>
                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  <i className="bi bi-people" />
                  Users
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
