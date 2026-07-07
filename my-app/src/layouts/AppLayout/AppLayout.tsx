import React, { useState } from "react";
import styles from "./AppLayout.module.css";
import Sidebar from "../sidebar/Sidebar";
import Header from "../Header/Header";
interface Props {
  children: React.ReactNode;
}

function AppLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.appContainer}>
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className={styles.bodyContainer}>
        <Sidebar isOpen={sidebarOpen} />

        <main
          className={`
            ${styles.content}
            ${sidebarOpen ? styles.contentWithSidebar : ""}
          `}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;

{
  /* <div className={styles.navLinks}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              Tasks
            </NavLink>
          </div> */
}

{
  /* <div className="d-flex">
        <Sidebar />
        <nav className={`${styles.navbar} shadow-sm`}>
          <div className={`container-fluid ${styles.navbarContent}`}>
            <span className="navbar-brand mb-0 h1">Task Management System</span>
          </div>
        </nav>

        <div className={`container py-4 ${styles.content}`}>{children}</div>
      </div> */
}
