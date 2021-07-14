import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (!newTaskTitle) return;
    let id = Math.floor(Math.random() * (999999999 - 1) + 1);
    const task = {
      id,
      title: newTaskTitle,
      isComplete: false,
    }

    let idAlreadyExists = tasks.filter(task => task.id === id)

    while (idAlreadyExists[0]) {
      id = Math.floor(Math.random() * (999999999 - 1) + 1);
      task.id = id
      idAlreadyExists = tasks.filter(task => task.id === id)
    }

    setTasks([...tasks, task]);
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {
    const newArray = [...tasks]
    const [taskToUpdate] = newArray.filter(task => task.id === id)
    taskToUpdate.isComplete = !taskToUpdate.isComplete

    setTasks(newArray)
  }

  function handleRemoveTask(id: number) {
    const newArray = [...tasks]
    const [taskToRemove] = newArray.filter(task => task.id === id)
    newArray.splice(newArray.indexOf(taskToRemove), 1)

    setTasks(newArray)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}
