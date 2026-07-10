import { useEffect } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import { AuthService } from "../../auth/services/authService";
import layoutStyles from "../../../layouts/AppLayout/AppLayout.module.css";
import styles from "./Profile.module.css";

function Profile() {
  const { user } = useAuth();

  useEffect(() => { AuthService.me(); }, []);

  const initials = user?.username?.slice(0, 2).toUpperCase() ?? "U";

  return (
    <div className={layoutStyles.page}>
      <div className={styles.wrapper}>

        {/* Banner */}
        <div className={styles.banner}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatar}>{initials}</div>
          </div>
          <div className={styles.bannerInfo}>
            <h1 className={styles.bannerName}>{user?.username}</h1>
            <p className={styles.bannerEmail}>{user?.email}</p>
            {user?.role && (
              <span className={styles.rolePill}>
                <i className="bi bi-shield-check" />
                {user.role}
              </span>
            )}
          </div>
        </div>

        {/* Details card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderIcon}>
              <i className="bi bi-person-lines-fill" />
            </div>
            <h2 className={styles.cardTitle}>Account Details</h2>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Username</span>
              <span className={styles.fieldValue}>{user?.username ?? "—"}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Email Address</span>
              <span className={styles.fieldValue}>{user?.email ?? "—"}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Role</span>
              <span className={styles.fieldValue}>{user?.role ?? "—"}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;
