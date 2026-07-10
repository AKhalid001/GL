import useUser from "../hooks/useUser";
import styles from "./UserTable.module.css";

function UserTable() {
  const { userlist } = useUser();

  return (
    <div>
      <table className="table table-hover align-middle mb-0">
        <thead>
          <tr>
            <th className={`${styles.thLabel} ps-3`} style={{ width: 48 }}>#</th>
            <th className={styles.thLabel}>User</th>
            <th className={styles.thLabel}>Email</th>
            <th className={styles.thLabel}>Role</th>
            <th className={styles.thLabel} style={{ width: 120 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userlist.length === 0 ? (
            <tr>
              <td colSpan={5}>
                <div className={styles.emptyState}>
                  <i className={`bi bi-people ${styles.emptyIcon}`} />
                  <p className={styles.emptyText}>No users found</p>
                </div>
              </td>
            </tr>
          ) : (
            userlist.map((user, index) => {
              const initials = user.username?.slice(0, 2).toUpperCase() ?? "U";
              const isAdmin = user.role === "ADMIN";
              return (
                <tr key={user.id}>
                  <td className={`ps-3 ${styles.thLabel}`}>{index + 1}</td>
                  <td>
                    <div className={styles.usernameCell}>
                      <div className={styles.miniAvatar}>{initials}</div>
                      <span className={styles.usernameText}>{user.username}</span>
                    </div>
                  </td>
                  <td className={styles.emailText}>{user.email}</td>
                  <td>
                    <span className={`${styles.roleBadge} ${isAdmin ? styles.roleAdmin : styles.roleUser}`}>
                      {isAdmin && <i className="bi bi-shield-check" />}
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      <button className={styles.actionBtn} title="View user">
                        <i className="bi bi-eye" />
                      </button>
                      <button className={styles.actionBtn} title="Edit user">
                        <i className="bi bi-pencil" />
                      </button>
                      <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`} title="Delete user">
                        <i className="bi bi-trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
