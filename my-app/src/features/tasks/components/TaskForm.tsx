import React, { useEffect, useState } from "react";
import { TaskPriority, TaskStatus, type Task } from "../model/task.model";
import type { TaskRequestDto } from "../model/dto/taskRequesDto";
import styles from "../css/TaskForm.module.css";

interface Props {
  editingTask?: Task | null;
  onAddTask: (task: TaskRequestDto) => void;
  onUpdateTask: (id: number, updates: TaskRequestDto) => void;
  onCancelEdit: () => void;
}

function TaskForm({ onAddTask, editingTask, onUpdateTask, onCancelEdit }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [taskStatus, setTaskStatus] = useState<TaskStatus>(TaskStatus.TODO);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
      setTaskStatus(editingTask.status);
    } else {
      resetForm();
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingTask) {
      onUpdateTask(editingTask.id, { title, description, priority, taskStatus });
    } else {
      onAddTask({ title, description, priority, taskStatus });
    }

    resetForm();
    onCancelEdit();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority(TaskPriority.MEDIUM);
    setTaskStatus(TaskStatus.TODO);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <p className={styles.formEyebrow}>
          {editingTask ? "Editing task" : "New task"}
        </p>
        <h2 className={styles.formTitle}>
          {editingTask ? "Edit Task" : "Create New Task"}
        </h2>
        <p className={styles.formSubtitle}>
          {editingTask ? "Update the task details below" : "Fill in the details to create a new task"}
        </p>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Description</label>
          <input
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description (optional)"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Priority</label>
          <select
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value as TaskStatus)}
          >
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.submitBtn}>
          <i className={`bi ${editingTask ? "bi-check-lg" : "bi-plus-lg"}`} />
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
