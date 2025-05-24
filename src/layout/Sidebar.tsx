import { useState } from "react"
import { Menu, X } from "lucide-react"
import clsx from "clsx"

export function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Botón de abrir (solo cuando está cerrado) */}
      {!open && (
        <button
          className="md:hidden p-3 fixed top-4 left-4 z-50"
          onClick={() => setOpen(true)}
        >
          <Menu />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed md:static top-0 left-0 h-full w-64 bg-muted p-4 z-40 transition-transform",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Botón de cerrar (solo en móvil) */}
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col space-y-4">
          <a href="#" className="hover:underline">Inicio</a>
          <a href="#" className="hover:underline">Transacciones</a>
        </nav>
      </aside>
    </>
  )
}
