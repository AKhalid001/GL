import styles from "./Toast.module.css";

interface ToastProps {
  message: string;
  type: "success" | "error" | "warning";
}

const iconMap = {
  success: "bi-check-circle-fill",
  error:   "bi-x-circle-fill",
  warning: "bi-exclamation-triangle-fill",
};

function Toast({ message, type }: ToastProps) {
  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <i className={`bi ${iconMap[type]}`} />
      {message}
    </div>
  );
}

export default Toast;
