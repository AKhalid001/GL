import Modal from "../../../components/Modal/Modal";
import type { Task } from "../model/task.model";
import styles from "../css/DeleteModal.module.css";

interface DeleteModalProps {
  taskToDelete: Task | null;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteComfirmationModal({ taskToDelete, onClose, onConfirm }: DeleteModalProps) {
  return (
    <Modal isOpen={taskToDelete !== null} title="Delete Task" onClose={onClose}>
      <div className={styles.iconWrap}>
        <i className="bi bi-exclamation-triangle-fill" />
      </div>
      <p className={styles.message}>
        Are you sure you want to delete <strong>"{taskToDelete?.title}"</strong>? This action cannot be undone.
      </p>
      <div className={styles.actions}>
        <button className={styles.cancelBtn} onClick={onClose}>
          Cancel
        </button>
        <button className={styles.deleteBtn} onClick={onConfirm}>
          <i className="bi bi-trash" />
          Delete Task
        </button>
      </div>
    </Modal>
  );
}

export default DeleteComfirmationModal;
