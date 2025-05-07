"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export default function FolderForm({ addFolder }) {
  const [name, setName] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    const trimmedName = name.trim()
    if (!trimmedName) return
    
    addFolder(trimmedName)
    setName('')
  }
  
  return (
    <div>
      <h2 className="text-lg font-medium mb-2">New Folder</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Create a new folder..."
          className="flex-1"
        />
        <Button type="submit" disabled={!name.trim()} size="icon">
          <Plus size={18} />
          <span className="sr-only">Add folder</span>
        </Button>
      </form>
    </div>
  )
}
