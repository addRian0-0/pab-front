import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import Home from "@/pages/Home"
import LoginPage from "./pages/Login"
import { Sidebar } from "./layout/Sidebar"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 bg-background text-foreground p-4">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/inicio" element={<Home />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
