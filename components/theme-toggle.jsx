"use client"

import { Button } from "@/components/ui/button"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { resolvedTheme, theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  

  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(3)].map((_, i) => (
          <Button key={i} variant="outline" size="icon" className="h-9 w-9">
            <span className="sr-only">Toggle theme</span>
            <div className="h-4 w-4" />
          </Button>
        ))}
      </div>
    )
  }
  
  return (
    <div className="flex items-center space-x-1">
      <Button
        variant={resolvedTheme === "light" ? "default" : "outline"}
        size="icon"
        onClick={() => setTheme("light")}
        title="Light Mode"
      >
        <Sun size={18} />
        <span className="sr-only">Light Mode</span>
      </Button>
      
      <Button
        variant={resolvedTheme === "dark" ? "default" : "outline"}
        size="icon"
        onClick={() => setTheme("dark")}
        title="Dark Mode"
      >
        <Moon size={18} />
        <span className="sr-only">Dark Mode</span>
      </Button>
      
      <Button
        variant={theme === "system" ? "default" : "outline"}
        size="icon"
        onClick={() => setTheme("system")}
        title="System Mode"
      >
        <Monitor size={18} />
        <span className="sr-only">System Mode</span>
      </Button>
    </div>
  )
}