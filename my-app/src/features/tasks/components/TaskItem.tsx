import type { Task, TaskStatus } from "../model/task.model";
import { ROUTES } from "../../../routes/routeConstants";
import { useNavigate } from "react-router-dom";
import { useTaskContext } from "../../../contexts/TaskContext";
import Pagination from "../../../components/Pagination/Pagination";
import PageSizeSelector from "../../../components/Pagination/PageSizeSelector";
import styles from "../css/TaskItem.module.css";

interface Props {
  tasks: Task[];
  onDelete: (task: Task) => void;
  onStatusChange: (id: number, status: TaskStatus) => void;
  onView: (task: Task) => void;
}

function TaskItem({ tasks, onDelete, onView }: Props) {
  const navigate = useNavigate();
  const { page, setPage, size, setSize, totalPages } = useTaskContext();

  const priorityBadge = (priority: string) => {
    const classMap: Record<string, string> = {
      HIGH: styles.badgeHigh,
      MEDIUM: styles.badgeMedium,
      LOW: styles.badgeLow,
    };
    return (
      <span className={`${styles.badge} ${classMap[priority] ?? ""}`}>
        {priority}
      </span>
    );
  };

  const statusBadge = (status: string) => {
    const classMap: Record<string, string> = {
      TODO: styles.badgeTodo,
      IN_PROGRESS: styles.badgeInProgress,
      DONE: styles.badgeDone,
    };
    const label: Record<string, string> = {
      TODO: "To Do",
      IN_PROGRESS: "In Progress",
      DONE: "Done",
    };
    return (
      <span className={`${styles.badge} ${classMap[status] ?? ""}`}>
        {label[status] ?? status}
      </span>
    );
  };

  return (
    <div>
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th className={`${styles.thLabel} ps-3`}>#</th>
            <th className={styles.thLabel}>Title</th>
            <th className={styles.thLabel}>Priority</th>
            <th className={styles.thLabel}>Status</th>
            <th className={styles.thLabel}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={5}>
                <div className={styles.emptyState}>
                  <i className={`bi bi-inbox ${styles.emptyIcon}`} />
                  <p className={styles.emptyText}>No tasks found</p>
                </div>
              </td>
            </tr>
          ) : (
            tasks.map((task, index) => (
              <tr key={task.id}>
                <td className={`ps-3 ${styles.thLabel}`}>{page * size + index + 1}</td>
                <td>
                  <div className={styles.titleCell}>{task.title}</div>
                  {task.description && (
                    <div className={styles.descCell}>{task.description}</div>
                  )}
                </td>
                <td>{priorityBadge(task.priority)}</td>
                <td>{statusBadge(task.status)}</td>
                <td>
                  <div className="d-flex gap-1">
                    <button
                      className={styles.actionBtn}
                      title="View"
                      onClick={() => onView(task)}
                    >
                      <i className="bi bi-eye" />
                    </button>
                    <button
                      className={styles.actionBtn}
                      title="Edit"
                      onClick={() => navigate(`${ROUTES.CREATE_TASK}/${task.id}`)}
                    >
                      <i className="bi bi-pencil" />
                    </button>
                    <button
                      className={`${styles.actionBtn} ${styles.actionBtnDanger}`}
                      title="Delete"
                      onClick={() => onDelete(task)}
                    >
                      <i className="bi bi-trash" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className={styles.paginationRow}>
        <PageSizeSelector
          size={size}
          onSizeChange={(newSize) => {
            setPage(0);
            setSize(newSize);
          }}
        />
        <Pagination page={page} onPageChange={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
}

export default TaskItem;
