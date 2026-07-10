import UserTable from "./UserTable";
import layoutStyles from "../../../layouts/AppLayout/AppLayout.module.css";
import styles from "./UserMain.module.css";

function UserMain() {
  return (
    <div className={layoutStyles.page}>

      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageTitleGroup}>
          <span className={styles.pageBreadcrumb}>
            <i className="bi bi-people" /> Admin
          </span>
          <h1 className={styles.pageTitle}>User Management</h1>
          <p className={styles.pageSubtitle}>View and manage all registered users</p>
        </div>
      </div>

      {/* Table card */}
      <div className={layoutStyles.section}>
        <div className={styles.tableHeader}>
          <div>
            <h2 className={styles.tableTitle}>All Users</h2>
            <p className={styles.tableSubtitle}>Registered accounts in the system</p>
          </div>
        </div>
        <UserTable />
      </div>

    </div>
  );
}

export default UserMain;
