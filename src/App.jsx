import { useEffect, useState } from 'react'
import { TodoProvider } from './contexts'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])
  
  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev])
  }

  const updateTodo = (id, todo) => { 
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((todo) => 
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    ))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-white/10">
            <div className="p-6">
              <h1 className="text-3xl font-bold text-center text-white mb-8">
                Task Manager
                <span className="block text-sm font-normal text-white/60 mt-1">
                  Organize your work efficiently
                </span>
              </h1>
              
              <div className="mb-6">
                <TodoForm />
              </div>
              
              <div className="space-y-3">
                {todos.length === 0 ? (
                  <div className="text-center py-8 text-white/50">
                    No tasks yet. Add one above to get started!
                  </div>
                ) : (
                  todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                  ))
                )}
              </div>
              
              {todos.length > 0 && (
                <div className="text-xs text-white/50 mt-4 text-center">
                  {todos.filter(t => t.completed).length} of {todos.length} tasks completed
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App