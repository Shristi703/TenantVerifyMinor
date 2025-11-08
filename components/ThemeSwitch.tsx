import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { AiOutlineSun, AiOutlineMoon } from "react-icons/ai"

const ThemeSwitch = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const isDark = theme === "dark" || resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative p-2 rounded-lg bg-encora-gray dark:bg-encora-mint/20 text-encora-green dark:text-white hover:bg-encora-mint/20 dark:hover:bg-encora-mint/30 transition-all duration-300 group"
      aria-label="Toggle Dark Mode"
    >
      <div className="relative w-6 h-6">
        <AiOutlineSun
          className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
            }`}
        />
        <AiOutlineMoon
          className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
            }`}
        />
      </div>
    </button>
  )
}

export default ThemeSwitch