import { Header } from "./Header"
import { Sidebar } from "./Sidebar"

type LayoutProps = {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground">
      <Sidebar />
      {/* Contenedor derecho */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  )
}
