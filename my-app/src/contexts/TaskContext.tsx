import { createContext, useContext } from "react";
import type { Task, TaskStatus } from "../features/tasks/model/task.model";
import useTask from "../features/tasks/hooks/useTask";
import type { TaskRequestDto } from "../features/tasks/model/dto/taskRequesDto";

export interface TaskContextType {
  tasks: Task[];

  addTask: (task: any) => void;

  deleteTask: (id: number) => void;

  updateTask: (id: number, updates: TaskRequestDto) => void;

  updateStatus: (id: number, status: TaskStatus) => void;

  page :number,
  size :number,
  setPage : (page:number) =>void,
  setSize : (size:number) => void,
  totalPages : number
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined,
);

export const useTaskContext = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTaskContext must be used within TaskProvider");
  }

  return context;
};

interface Props {
  children: React.ReactNode;
}

export function TaskProvider({ children }: Props) {
  const { tasks, addTask, deleteTask, updateTask, updateStatus, page,size,setPage,setSize,totalPages} = useTask();
  return (
    <TaskContext.Provider
      value={{ addTask, updateStatus, deleteTask, updateTask, tasks,page,size,setPage,setSize,totalPages }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskContext;
