import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="w-full px-4 py-3 border-b bg-background text-foreground">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Mi App</h1>
        <Button variant="outline">Acción</Button>
      </div>
    </header>
  )
}