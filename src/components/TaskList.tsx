
import { useState } from "react"

import "../styles/tasklist.scss"

import { FiCheckSquare, FiTrash } from "react-icons/fi"

// Você deve criar as funcionalidades para as três funções presentes nesse arquivo, que são:

// - handleCreateNewTask: Deve ser possível adicionar uma nova task no estado de `tasks`, com os campos `id` que deve ser gerado de forma aleatória, `title` que deve ser um texto e `isComplete` que deve iniciar como false.
// - handleToggleTaskCompletion: Deve alterar o status de `isComplete` para uma task com um ID específico que é recebido por parâmetro.
// - handleRemoveTask: Deve receber um ID por parâmetro e remover a task que contém esse ID do estado.

interface Task {
  id: number
  title: string
  isComplete: boolean
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState("")

  function handleCreateNewTask() {
    if (!newTaskTitle) return

    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    }

    setTasks((tasks) => [...tasks, newTask])
    setNewTaskTitle("")
  }

  function handleToggleTaskCompletion(id: number) {
    const currentTasks = tasks.map((task) => task.id === id ? {
      ...task,
      isComplete: !task.isComplete,
    } : task)

    setTasks(currentTasks)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    // Aqui eu percorro a lista de tarefas e armazeno em um novo array as tarefas com ID diferente do ID da tarefa a ser deletada
    const currentTasks = tasks.filter((task) => task.id !== id)
    setTasks(currentTasks)
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
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
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

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  )
}