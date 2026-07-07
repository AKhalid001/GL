import type { TaskRequestDto } from "../model/dto/taskRequesDto";
import { taskService } from "../services/task.service";
import {
  type Task,
  TaskStatus,
  type TaskPriority,
} from "./../model/task.model";
import { useEffect, useState } from "react";

function useTask() {
  //set list of task
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(0);
  const [size,setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    taskService.getAllTasks(page,size).then((data) => {
      setTasks(data.content);
      setTotalPages(data.totalPages);
    });
  }, [page,size]);

  const addTask = async (taskData: TaskRequestDto) => {
    const task: TaskRequestDto = {
      title: taskData.title,

      description: taskData.description,

      priority: taskData.priority,

      taskStatus: taskData.taskStatus,
    };
    const createdTask = await taskService.createTask(task);

    setTasks((prev) => [...prev, createdTask]);
  };

  const deleteTask = async (id: number) => {
    try {
      await taskService.deleteTask(id);

      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = (id: number, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status,
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    );
  };

  const updateTask = async (id: number, updates: TaskRequestDto) => {
    const updatedTask = await taskService.updateTask(id, updates);

    setTasks((prev) =>
      prev.map((task) => (task.id === id ? updatedTask : task)),
    );
  };

  return {
    tasks,
    addTask,
    deleteTask,
    updateStatus,
    updateTask,
    page,
    size,
    setPage,
    setSize,
    totalPages
  };
}

export default useTask;
