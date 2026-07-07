import { useNavigate } from "react-router-dom";
import { useTaskContext } from "../../../contexts/TaskContext";
import layoutStyles from "../../../layouts/AppLayout/AppLayout.module.css";
import pageStyles from "../css/TaskMain.module.css";
import useTaskActions from "../hooks/useTaskActions";
import useTaskFilters from "../hooks/useTaskFilters";
import type { Task } from "../model/task.model";
import DeleteComfirmationModal from "../modals/DeleteComfirmationModal";
import TaskFilters from "../components/TaskFilters";
import TaskList from "../components/TaskList";
import TaskStats from "../components/TaskStats";
import { useState } from "react";
import { ROUTES } from "../../../routes/routeConstants";
import ViewTaskDetails from "../modals/ViewTaskDetails";

function TaskMain() {
  const { updateStatus, tasks } = useTaskContext();
  const navigate = useNavigate();
  const { deleteTaskHandler } = useTaskActions();
  const { search, filter, setSearch, setFilter, filteredTasks } = useTaskFilters();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const onConfirm = () => {
    if (!taskToDelete) return;
    deleteTaskHandler(taskToDelete.id);
    setTaskToDelete(null);
  };

  const onClose = () => {
    setTaskToDelete(null);
    setSelectedTask(null);
  };

  return (
    <div className={layoutStyles.page}>
      <div className={pageStyles.pageHeader}>
        <div>
          <h4 className={pageStyles.pageTitle}>Tasks</h4>
          <p className={pageStyles.pageSubtitle}>Manage and track your work</p>
        </div>
        <button
          className={pageStyles.addBtn}
          onClick={() => navigate(ROUTES.CREATE_TASK)}
        >
          <i className="bi bi-plus-lg" />
          New Task
        </button>
      </div>

      <TaskStats tasks={tasks} />

      <div className={layoutStyles.section}>
        <div className={pageStyles.toolbar}>
          <div className={pageStyles.searchWrap}>
            <i className={`bi bi-search ${pageStyles.searchIcon}`} />
            <input
              className={pageStyles.searchInput}
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <TaskFilters
            currentFilter={filter as any}
            onChange={setFilter as any}
          />
        </div>
      </div>

      <div className={layoutStyles.section}>
        <TaskList
          tasks={filteredTasks}
          onDelete={setTaskToDelete}
          onStatusChange={updateStatus}
          onView={setSelectedTask}
        />
      </div>

      <DeleteComfirmationModal
        taskToDelete={taskToDelete}
        onConfirm={onConfirm}
        onClose={onClose}
      />
      <ViewTaskDetails task={selectedTask} onClose={onClose} />
    </div>
  );
}

export default TaskMain;
