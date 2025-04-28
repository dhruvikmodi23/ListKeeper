import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'

function TodoForm() {
    const [todo, setTodo] = useState("")
    const { addTodo } = useTodo()

    const add = (e) => {
      e.preventDefault()
      if (!todo.trim()) return
      addTodo({ todo, completed: false })
      setTodo("")
    }

    return (
      <form onSubmit={add} className="flex gap-2">
          <input
              type="text"
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              autoFocus
          />
          <button 
              type="submit" 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg active:scale-95"
          >
              Add Task
          </button>
      </form>
    )
}

export default TodoForm