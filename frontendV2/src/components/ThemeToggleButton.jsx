'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, LightbulbOff } from 'lucide-react'

const STORAGE_KEY = 'theme'

function getInitialTheme() {
  if (typeof window === 'undefined') return false
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'dark') return true
  if (saved === 'light') return false
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

const ThemeToggleButton = ({ className = '' }) => {
  const [isDark, setIsDark] = useState(getInitialTheme)

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <button
      type="button"
      onClick={() => setIsDark(d => !d)}
      aria-label="Toggle dark mode"
      className={`relative inline-flex items-center justify-center rounded-full p-2 ${className}`}
    >
      {/* Icono “modo claro disponible” */}
      <motion.span
        initial={false}
        animate={{ scale: isDark ? 0 : 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="rounded-full p-0.5">
          <LightbulbOff className="w-5 h-5 text-yellow-600 hover:text-yellow-500" />
        </span>
      </motion.span>

      {/* Icono “modo oscuro activo” */}
      <motion.span
        initial={false}
        animate={{ scale: isDark ? 1 : 0 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="rounded-full p-0.5">
          <Lightbulb className="w-5 h-5  text-yellow-600 hover:text-yellow-500" />
        </span>
      </motion.span>
    </button>
  )
}

export default ThemeToggleButton
