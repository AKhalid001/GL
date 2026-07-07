import Modal from "../../../components/Modal/Modal";
import type { Task } from "../model/task.model";
import styles from "../css/ViewTaskDetails.module.css";

interface Props {
  task: Task | null;
  onClose: () => void;
}

function ViewTaskDetails({ task, onClose }: Props) {
  const priorityClass: Record<string, string> = {
    HIGH: styles.tagDanger,
    MEDIUM: styles.tagWarning,
    LOW: styles.tagSuccess,
  };
  const statusClass: Record<string, string> = {
    TODO: styles.tagDefault,
    IN_PROGRESS: styles.tagPrimary,
    DONE: styles.tagSuccess,
  };
  const statusLabel: Record<string, string> = {
    TODO: "To Do",
    IN_PROGRESS: "In Progress",
    DONE: "Done",
  };

  return (
    <Modal isOpen={task !== null} title="Task Details" onClose={onClose}>
      <div className={styles.detail}>
        <div className={styles.detailTitle}>{task?.title}</div>
        {task?.description && (
          <p className={styles.detailDesc}>{task.description}</p>
        )}
        <div className={styles.tagRow}>
          {task?.priority && (
            <span className={`${styles.tag} ${priorityClass[task.priority] ?? ""}`}>
              <i className="bi bi-flag" />
              {task.priority}
            </span>
          )}
          {task?.status && (
            <span className={`${styles.tag} ${statusClass[task.status] ?? ""}`}>
              <i className="bi bi-circle-half" />
              {statusLabel[task.status] ?? task.status}
            </span>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ViewTaskDetails;
