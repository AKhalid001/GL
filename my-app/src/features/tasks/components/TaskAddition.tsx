import React from 'react'
import TaskForm from './TaskForm'
import useTaskActions from '../hooks/useTaskActions'

function TaskAddition() {
  const { createTaskHandler, updateTaskHandler } = useTaskActions()

  return (
    <div>
      <TaskForm
        onAddTask={createTaskHandler}
        onUpdateTask={updateTaskHandler}
        onCancelEdit={() => {}}
      />
    </div>
  )
}

export default TaskAddition
