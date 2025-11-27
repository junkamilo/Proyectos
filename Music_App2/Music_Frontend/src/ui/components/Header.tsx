import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Menu, Search } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <nav className="flex items-center justify-between px-4 md:px-8 lg:px-12 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
            ♪
          </div>
          <span className="text-xl font-bold text-foreground">Harmonia</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-foreground hover:text-primary transition">
            Home
          </a>
          <a href="#" className="text-foreground hover:text-primary transition">
            Explorar
          </a>
          <a href="#" className="text-foreground hover:text-primary transition">
            Tus Listas
          </a>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-card border border-border rounded-full px-4 py-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar música..."
              className="bg-transparent border-0 outline-none px-2 py-1 w-40 text-sm text-foreground placeholder-muted-foreground"
            />
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-card p-4 space-y-3">
          <a href="#" className="block text-foreground hover:text-primary transition">
            Home
          </a>
          <a href="#" className="block text-foreground hover:text-primary transition">
            Explorar
          </a>
          <a href="#" className="block text-foreground hover:text-primary transition">
            Tus Listas
          </a>
        </div>
      )}
    </header>
  )
}
