"use client"

import { useState } from "react"
import { Book, Menu, Moon, Search, Sun, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface HeaderProps {
  onSearch: (query: string) => void
  searchQuery: string
}

export function Header({ onSearch, searchQuery }: HeaderProps) {
  const [isDark, setIsDark] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Book className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Kitobxon</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden flex-1 max-w-md md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Kitob, muallif yoki mavzu qidiring..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-2 md:flex">
            <Link href="/">
              <Button variant="ghost">Bosh sahifa</Button>
            </Link>
            <Link href="/ai-assistant">
              <Button variant="ghost">AI Yordamchi</Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mt-4 space-y-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Kitob qidiring..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/">
                <Button variant="ghost" className="w-full justify-start">
                  Bosh sahifa
                </Button>
              </Link>
              <Link href="/ai-assistant">
                <Button variant="ghost" className="w-full justify-start">
                  AI Yordamchi
                </Button>
              </Link>
              <Button variant="ghost" className="w-full justify-start" onClick={toggleTheme}>
                {isDark ? <Sun className="mr-2 h-5 w-5" /> : <Moon className="mr-2 h-5 w-5" />}
                {isDark ? "Yorug' rejim" : "Tungi rejim"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
