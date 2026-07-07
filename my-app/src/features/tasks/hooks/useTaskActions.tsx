import { useTaskContext } from "../../../contexts/TaskContext";
import { useToastContext } from "../../../contexts/ToastContext";
import type { TaskRequestDto } from "../model/dto/taskRequesDto";
import type { Task } from "../model/task.model";

function useTaskActions() {
  const { addTask, updateTask, deleteTask } = useTaskContext();
  const { showToast } = useToastContext();

  const createTaskHandler = (
    task: TaskRequestDto
  ) => {
    addTask(task);

    showToast(
      "Task created successfully",
      "success"
    );
  };

  const updateTaskHandler = (id: number, updates: TaskRequestDto) => {
    updateTask(id, updates);
    showToast("Task updated successfully ...", "success");
  };

  const deleteTaskHandler = (id:number) =>{
    deleteTask(id);
    showToast("Task deleted successfully ...", "success");

  }



  return {createTaskHandler,updateTaskHandler,deleteTaskHandler};
}

export default useTaskActions;
