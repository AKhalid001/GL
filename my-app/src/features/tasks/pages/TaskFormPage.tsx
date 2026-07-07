import TaskForm from "../components/TaskForm";
import styles from "../../../layouts/AppLayout/AppLayout.module.css";
import useTaskActions from "../hooks/useTaskActions";
import { useEffect, useState } from "react";
import type { Task } from "../model/task.model";
import { useParams } from "react-router-dom";
import { taskService } from "../services/task.service";

function TaskFormPage() {
  const { createTaskHandler, updateTaskHandler } = useTaskActions();

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const onCancelClick = () => {
    setEditingTask(null);
  };

  const {id} = useParams();

  useEffect(()=>{
    if(!id) return;

    fetchTaskById(parseInt(id));
  },[id])

  const fetchTaskById = async(id : number) =>{
    const task = await taskService.getTaskById(id);
    setEditingTask(task);
  }

  return (
    <div className={styles.section}>
      <TaskForm
        editingTask={editingTask}
        onAddTask={createTaskHandler}
        onUpdateTask={updateTaskHandler}
        onCancelEdit={onCancelClick}
      />
    </div>
  );
}

export default TaskFormPage;
