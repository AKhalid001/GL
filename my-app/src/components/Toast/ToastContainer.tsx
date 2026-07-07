import Toast from "./Toast";
import type { ToastData, ToastType } from "../../contexts/ToastContext";
import styles from "./ToastContainer.module.css";

interface Props {
  toasts: ToastData[];
}

function ToastContainer({toasts}:Props) {
  return (
     <div
      className={styles.container}
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={
            toast.message
          }
          type={toast.type}
        />
      ))}
    </div>
  )
}

export default ToastContainer
