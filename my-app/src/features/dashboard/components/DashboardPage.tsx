import { useTaskContext } from "../../../contexts/TaskContext";
import TaskStats from "../../tasks/components/TaskStats";
import styles from "../../../layouts/AppLayout/AppLayout.module.css";
import TaskAddition from "../../tasks/components/TaskAddition";


function DashboardPage() {
  const { tasks } = useTaskContext();
  return (
    <>
      <div className={styles.section}>
        <TaskStats tasks={tasks} />
      </div>
      <div className={styles.section}>
        <TaskAddition />
      </div>
    </>
  );
}

export default DashboardPage;
