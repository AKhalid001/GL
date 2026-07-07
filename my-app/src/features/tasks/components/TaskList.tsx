import type { Task, TaskStatus } from "../model/task.model";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];

  onDelete: (task: Task) => void;

  onStatusChange: (id: number, status: TaskStatus) => void;
  onView: (task:Task) => void;
}

function TaskList({
  tasks,
  onDelete,
  onStatusChange,
  onView,
}: Props) {
  
  return (
    <>
      <TaskItem
        tasks={tasks}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
        onView={onView}
      />

    </>
  );
}

export default TaskList;
