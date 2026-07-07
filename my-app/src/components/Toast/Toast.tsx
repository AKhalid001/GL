import styles from "./Toast.module.css";

interface ToastProps {
  message: string;

  type: "success" | "error" | "warning";
}
function Toast({ message, type }: ToastProps) {
  return <div className={`${styles.toast} ${styles[type]}`}>{message}</div>;
}

export default Toast;
