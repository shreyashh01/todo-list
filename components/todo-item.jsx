"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { Check, Pencil, Trash2, X } from 'lucide-react'
import { useState } from 'react'

export default function TodoItem({ todo, toggleTodo, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  
  const handleEdit = () => {
    const trimmedText = editText.trim()
    if (!trimmedText) return
    
    editTodo(todo.id, trimmedText)
    setIsEditing(false)
  }
  
  return (
    <Card className="border-l-4 h-full" style={{ borderLeftColor: todo.completed ? 'var(--success)' : 'var(--primary)' }}>
      <CardContent className="p-4">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1"
              autoFocus
            />
            <Button size="sm" onClick={handleEdit} variant="outline">
              <Check size={16} />
            </Button>
            <Button size="sm" onClick={() => setIsEditing(false)} variant="outline">
              <X size={16} />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Checkbox 
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                  id={`todo-${todo.id}`}
                  className="mt-1"
                />
                <motion.label 
                  htmlFor={`todo-${todo.id}`}
                  className={`${todo.completed ? 'line-through text-muted-foreground' : ''} cursor-pointer`}
                  whileTap={{ scale: 0.98 }}
                >
                  {todo.text}
                </motion.label>
              </div>
              <div className="flex gap-1 ml-2 shrink-0">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => {
                    setEditText(todo.text)
                    setIsEditing(true)
                  }}
                  className="h-8 w-8 p-0"
                >
                  <Pencil size={14} />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => deleteTodo(todo.id)}
                  className="text-destructive h-8 w-8 p-0"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {new Date(todo.createdAt).toLocaleDateString()} {new Date(todo.createdAt).toLocaleTimeString()}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}