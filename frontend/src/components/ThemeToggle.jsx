// --- FILE: src/components/ThemeToggle.jsx ---
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle({ isDark, setIsDark }) {
  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="theme-toggle p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-sunlight-500" />
      ) : (
        <Moon className="w-5 h-5 text-forest-600" />
      )}
    </button>
  )
}
