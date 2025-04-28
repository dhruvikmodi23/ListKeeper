import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const [todoMsg, setTodoMsg] = useState(todo.todo)
  const { updateTodo, deleteTodo, toggleComplete } = useTodo()

  const editTodo = () => {
    if (todoMsg.trim()) {
      updateTodo(todo.id, {...todo, todo: todoMsg})
      setIsTodoEditable(false)
    }
  }

  const toggleCompleted = () => {
    toggleComplete(todo.id)
  }

  return (
    <div className={`group flex items-center gap-3 p-4 rounded-lg transition-all ${
      todo.completed 
        ? "bg-green-100/20 border border-green-500/30" 
        : "bg-white/5 border border-white/10 hover:border-white/20"
    }`}>
      <input
        type="checkbox"
        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      
      <input
        type="text"
        className={`flex-1 bg-transparent focus:outline-none ${
          isTodoEditable 
            ? "px-3 py-2 bg-white/10 rounded border border-white/20" 
            : "border-transparent"
        } ${todo.completed ? "line-through text-white/60" : "text-white"}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
        onKeyDown={(e) => e.key === 'Enter' && editTodo()}
        onBlur={editTodo}
      />
      
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          onClick={() => {
            if (todo.completed) return
            if (isTodoEditable) editTodo()
            else setIsTodoEditable((prev) => !prev)
          }}
          disabled={todo.completed}
          title={isTodoEditable ? "Save" : "Edit"}
        >
          {isTodoEditable ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          )}
        </button>
        
        <button
          className="p-2 text-gray-300 hover:text-red-400 rounded-full hover:bg-white/10 transition-colors"
          onClick={() => deleteTodo(todo.id)}
          title="Delete"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default TodoItem