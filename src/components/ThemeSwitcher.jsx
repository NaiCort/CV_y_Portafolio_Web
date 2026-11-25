import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

// Selector flotante de temas. `themes` es una lista de { id, nombre, color }.
export default function ThemeSwitcher({ themes, activeTheme, onThemeChange }) {
  const THEMES = Object.fromEntries(themes.map((t) => [t.id, { label: t.nombre, color: t.color }]))
  const [hovered, setHovered] = useState(null)
  const [focused, setFocused] = useState(null)
  const reduced = useReducedMotion()
  const expanded = !!hovered || !!focused
  const label = THEMES[focused || hovered || activeTheme]?.label || themes[0].nombre
  const selectTheme = (theme) => {
    setHovered(null)
    setFocused(null)
    onThemeChange(theme)
  }
  return (
    <>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            className="fixed inset-0 z-[70] pointer-events-none"
            aria-hidden="true"
            style={{
              background: "rgba(0,0,0,0.45)",
              backdropFilter: reduced ? "none" : "blur(4px)",
            }}
          />
        )}
      </AnimatePresence>
      <div
        className="demo-theme-switcher fixed right-3 sm:right-6 z-[80] flex flex-col items-end gap-1"
        role="group"
        aria-label="Estilo visual de la demo"
      >
        <span aria-live="polite" className="text-white text-xs bg-[#111318] px-3 py-1 rounded-full">
          {label}
        </span>
        <div
          className="flex items-center bg-[#111318]/90 rounded-full p-1"
          onPointerLeave={() => setHovered(null)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(null)
          }}
        >
          {Object.entries(THEMES).map(([key, theme]) => (
            <button
              type="button"
              key={key}
              onClick={() => selectTheme(key)}
              aria-label={`Tema ${theme.label}`}
              aria-pressed={key === activeTheme}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setHovered(key)
              }}
              onFocus={() => setFocused(key)}
              className="demo-icon-button rounded-full"
            >
              <motion.span
                animate={{
                  width: key === activeTheme ? 28 : 18,
                  height: key === activeTheme ? 28 : 18,
                }}
                transition={{ duration: reduced ? 0 : 0.2 }}
                className="rounded-full border-2 border-white/80"
                style={{ background: theme.color }}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
