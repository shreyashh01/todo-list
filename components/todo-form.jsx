"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export default function TodoForm({ addTodo }) {
  const [text, setText] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    const trimmedText = text.trim()
    if (!trimmedText) return
    
    addTodo(trimmedText)
    setText('')
  }
  
  return (
    <div>
      <h2 className="text-lg font-medium mb-2">Add Task</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1"
        />
        <Button type="submit" disabled={!text.trim()} size="icon">
          <Plus size={18} />
          <span className="sr-only">Add task</span>
        </Button>
      </form>
    </div>
  )
}