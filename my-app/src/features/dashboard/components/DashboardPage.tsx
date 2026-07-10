import { Link } from "react-router-dom";
import { useTaskContext } from "../../../contexts/TaskContext";
import { useAuth } from "../../auth/context/AuthContext";
import TaskStats from "../../tasks/components/TaskStats";
import TaskAddition from "../../tasks/components/TaskAddition";
import layoutStyles from "../../../layouts/AppLayout/AppLayout.module.css";
import styles from "./DashboardPage.module.css";
import { ROUTES } from "../../../routes/routeConstants";

function DashboardPage() {
  const { tasks } = useTaskContext();
  const { user } = useAuth();

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className={layoutStyles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.greeting}>{greeting}</p>
          <h1 className={styles.heroTitle}>
            Welcome back, {user?.username ?? "there"} 👋
          </h1>
          <p className={styles.heroSub}>
            Here's what's happening with your tasks today. Stay organised and keep moving forward.
          </p>
          <div className={styles.heroActions}>
            <Link to={ROUTES.CREATE_TASK} className={styles.heroBtnPrimary}>
              <i className="bi bi-plus-lg" />
              New Task
            </Link>
            <Link to={ROUTES.TASKS} className={styles.heroBtnSecondary}>
              <i className="bi bi-list-check" />
              View All Tasks
            </Link>
          </div>
        </div>
        <div className={styles.heroIllustration}>
          <i className="bi bi-kanban" />
        </div>
      </div>

      {/* Stats */}
      <div className={layoutStyles.section}>
        <div className={styles.sectionRow}>
          <div>
            <h2 className={styles.sectionTitle}>Overview</h2>
            <p className={styles.sectionSubtitle}>A summary of your current task status</p>
          </div>
          <Link to={ROUTES.TASKS} className={styles.viewAllLink}>
            View all <i className="bi bi-arrow-right" />
          </Link>
        </div>
        <TaskStats tasks={tasks} />
      </div>

      {/* Quick add */}
      <div className={layoutStyles.section}>
        <TaskAddition />
      </div>
    </div>
  );
}

export default DashboardPage;
