import { TaskStatus, type Task } from "../model/task.model";
import styles from "../css/TaskStats.module.css";

interface Props {
  tasks: Task[];
}

function TaskStats({ tasks }: Props) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === TaskStatus.DONE).length;
  const inProgress = tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS).length;
  const todo = tasks.filter((t) => t.status === TaskStatus.TODO).length;

  const stats = [
    { label: "Total", value: total, icon: "bi-stack", cls: styles.statTotal },
    { label: "To Do", value: todo, icon: "bi-circle", cls: styles.statTodo },
    { label: "In Progress", value: inProgress, icon: "bi-hourglass-split", cls: styles.statProgress },
    { label: "Completed", value: completed, icon: "bi-check-circle-fill", cls: styles.statDone },
  ];

  return (
    <div className={styles.statsGrid}>
      {stats.map((s) => (
        <div key={s.label} className={styles.statCard}>
          <div className={`${styles.iconWrap} ${s.cls}`}>
            <i className={`bi ${s.icon}`} />
          </div>
          <div className={styles.statBody}>
            <div className={styles.statValue}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskStats;
