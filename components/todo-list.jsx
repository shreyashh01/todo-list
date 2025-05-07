"use client"

import { AnimatePresence, motion } from 'framer-motion'
import TodoItem from './todo-item'

export default function TodoList({ todos, toggleTodo, deleteTodo, editTodo }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <AnimatePresence>
        {todos.map(todo => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            layout
          >
            <TodoItem
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}