"use client"

import FolderForm from '@/components/folder-form'
import FolderList from '@/components/folder-list'
import ThemeToggle from '@/components/theme-toggle'
import TodoForm from '@/components/todo-form'
import TodoList from '@/components/todo-list'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Home() {
  const [todos, setTodos] = useState([])
  const [folders, setFolders] = useState([])
  const [activeFolder, setActiveFolder] = useState(null)
  const [filter, setFilter] = useState('all')
  const [isMounted, setIsMounted] = useState(false)
  
  // Set mounted state to true after hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Load todos and folders from localStorage on component mount
  useEffect(() => {
    if (isMounted) {
      const storedTodos = localStorage.getItem('todos')
      const storedFolders = localStorage.getItem('folders')
      
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos))
      }
      
      if (storedFolders) {
        setFolders(JSON.parse(storedFolders))
      } else {
        // Create default folder if none exists
        const defaultFolder = { id: 'default', name: 'General' }
        setFolders([defaultFolder])
        setActiveFolder(defaultFolder.id)
      }
    }
  }, [isMounted])
  
  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos, isMounted])
  
  // Save folders to localStorage whenever they change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('folders', JSON.stringify(folders))
    }
  }, [folders, isMounted])
  
  // Set default active folder if none is selected
  useEffect(() => {
    if (folders.length > 0 && !activeFolder) {
      setActiveFolder(folders[0].id)
    }
  }, [folders, activeFolder])
  
  // Add a new todo
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      folderId: activeFolder || (folders.length > 0 ? folders[0].id : 'default')
    }
    setTodos([...todos, newTodo])
  }
  
  // Toggle todo completion status
  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }
  
  // Edit a todo
  const editTodo = (id, text) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text } : todo
      )
    )
  }
  
  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  
  // Add a new folder
  const addFolder = (name) => {
    const newFolder = {
      id: `folder-${Date.now()}`,
      name
    }
    setFolders([...folders, newFolder])
    setActiveFolder(newFolder.id)
  }
  
  // Edit a folder
  const editFolder = (id, name) => {
    setFolders(
      folders.map(folder =>
        folder.id === id ? { ...folder, name } : folder
      )
    )
  }
  
  // Delete a folder
  const deleteFolder = (id) => {
    // Remove todos in this folder
    setTodos(todos.filter(todo => todo.folderId !== id))
    
    // Remove the folder
    setFolders(folders.filter(folder => folder.id !== id))
    
    // If active folder was deleted, select the first available folder
    if (activeFolder === id) {
      const remainingFolders = folders.filter(folder => folder.id !== id)
      setActiveFolder(remainingFolders.length > 0 ? remainingFolders[0].id : null)
    }
  }
  
  // Get todos for the current active folder
  const folderTodos = todos.filter(todo => todo.folderId === activeFolder)
  
  // Filter todos based on completion status
  const filteredTodos = filter === 'all'
    ? folderTodos
    : filter === 'active'
      ? folderTodos.filter(todo => !todo.completed)
      : folderTodos.filter(todo => todo.completed)
  
  // Get active folder name
  const activeFolderName = folders.find(folder => folder.id === activeFolder)?.name || 'Tasks'
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-4 border-b flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-primary">Todo App</h1>
        <ThemeToggle />
      </motion.header>
      
      <div className="flex flex-col md:flex-row flex-1 h-[calc(100vh-73px)]">
        {/* Sidebar with folders */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-full md:w-64 p-4 border-r md:h-full overflow-y-auto"
        >
          <FolderForm addFolder={addFolder} />
          
          <div className="mt-6">
            <h2 className="text-lg font-medium mb-2">Folders</h2>
            <FolderList 
              folders={folders}
              activeFolder={activeFolder}
              setActiveFolder={setActiveFolder}
              editFolder={editFolder}
              deleteFolder={deleteFolder}
              todoCount={folders.map(folder => ({
                id: folder.id, 
                count: todos.filter(todo => todo.folderId === folder.id).length
              }))}
            />
          </div>
          
          <div className="mt-6">
            <TodoForm addTodo={addTodo} />
          </div>
        </motion.div>
        
        {/* Main content with todos */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 p-4 md:p-6 overflow-y-auto"
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <h2 className="text-xl font-bold mb-2 sm:mb-0">
                {activeFolderName}
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({folderTodos.length})
                </span>
              </h2>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded text-sm ${filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilter('active')}
                  className={`px-3 py-1 rounded text-sm ${filter === 'active' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
                >
                  Active
                </button>
                <button 
                  onClick={() => setFilter('completed')}
                  className={`px-3 py-1 rounded text-sm ${filter === 'completed' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
                >
                  Completed
                </button>
              </div>
            </div>
            
            <AnimatePresence>
              {filteredTodos.length > 0 ? (
                <TodoList
                  todos={filteredTodos}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-secondary/50 rounded-lg p-8 text-center"
                >
                  <p className="text-muted-foreground">
                    No {filter === 'all' ? '' : filter} tasks in this folder.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {folderTodos.some(todo => todo.completed) && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete all completed tasks in this folder?')) {
                      setTodos(todos.filter(todo => 
                        todo.folderId !== activeFolder || !todo.completed
                      ))
                    }
                  }}
                  className="text-sm text-destructive hover:underline"
                >
                  Clear completed tasks
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}