import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useAuth } from "../../features/auth/context/AuthContext";

const NAV_ITEMS = [
  { to: "/",        end: true,  icon: "bi-grid-1x2",  label: "Dashboard" },
  { to: "/tasks",   end: false, icon: "bi-list-check", label: "Tasks"     },
  { to: "/profile", end: false, icon: "bi-person",     label: "Profile"   },
];

function Sidebar() {
  const { user } = useAuth();
  const initials = user?.username?.slice(0, 2).toUpperCase() ?? "U";

  return (
    <aside className={styles.sidebar}>
      <div className={styles.inner}>

        <nav className={styles.navSection}>
          <p className={styles.navLabel}>Main Menu</p>
          <ul className={styles.navList}>
            {NAV_ITEMS.map(({ to, end, icon, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  <i className={`bi ${icon}`} />
                  {label}
                </NavLink>
              </li>
            ))}

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

        <div className={styles.sidebarFooter}>
          <div className={styles.userStrip}>
            <div className={styles.userStripAvatar}>{initials}</div>
            <div className={styles.userStripInfo}>
              <span className={styles.userStripName}>{user?.username}</span>
              <span className={styles.userStripRole}>{user?.role}</span>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
}

export default Sidebar;
