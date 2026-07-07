import React from "react";
import type { Task } from "../model/task.model";

interface Props {
  task: Task | null;
}

function TaskDetails({ task }: Props) {
  if (!task) {
    return <div>Select a task</div>;
  }
  return (
    <div>
      <h2>{task.title}</h2>

      <p>{task.description}</p>

      <p>
        Priority:
        {task.priority}
      </p>

      <p>
        Status:
        {task.status}
      </p>

      <p>
        Created:
        {new Date(task.createdAt).toLocaleString()}
      </p>

      <p>
        Updated:
        {new Date(task.updatedAt).toLocaleString()}
      </p>
    </div>
  );
}

export default TaskDetails;
