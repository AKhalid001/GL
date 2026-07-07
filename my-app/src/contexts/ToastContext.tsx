import { createContext, useContext, useState } from "react";
import ToastContainer from "../components/Toast/ToastContainer";

export type ToastType = "success" | "error" | "warning";

export interface ToastData {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}
export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useTaskContext must be used within TaskProvider");
  }

  return context;
};

interface Props {
  children: React.ReactNode;
}

export function ToastProvider({ children }: Props) {
  const [toast, setToasts] = useState<ToastData[]>([]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showToast = (message: string, type: ToastType) => {
    const id = crypto.randomUUID();

    const toast: ToastData = {
      id,
      message,
      type,
    };

    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  return (
    <ToastContext.Provider
      value={{ showToast }}
    >
      {children}

      <ToastContainer
        toasts={toast}
      />
    </ToastContext.Provider>
  );
}
