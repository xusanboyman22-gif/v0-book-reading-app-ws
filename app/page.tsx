"use client"

import { useState, useMemo, useEffect } from "react"
import { Header } from "@/components/header"
import { BookCard } from "@/components/book-card"
import { BookReader } from "@/components/book-reader"
import { AIChat } from "@/components/ai-chat"
import { CategoryFilter } from "@/components/category-filter"
import { FeaturesSection } from "@/components/features-section"
import { AddBookForm } from "@/components/add-book-form"
import { uzbekBooks, categories, type Book } from "@/lib/books-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, BookOpen, Sparkles, ChevronRight, Plus } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Barchasi")
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [showChat, setShowChat] = useState(false)
  const [chatContext, setChatContext] = useState<{ question?: string; context?: string }>({})
  const [showAddBook, setShowAddBook] = useState(false)
  const [userBooks, setUserBooks] = useState<Book[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("kitobxon_user_books")
    if (stored) {
      setUserBooks(JSON.parse(stored))
    }
  }, [])

  const handleBookAdded = () => {
    const stored = localStorage.getItem("kitobxon_user_books")
    if (stored) {
      setUserBooks(JSON.parse(stored))
    }
  }

  const allBooks = useMemo(() => [...uzbekBooks, ...userBooks], [userBooks])

  const filteredBooks = useMemo(() => {
    return allBooks.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "Barchasi" || book.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory, allBooks])

  const handleAskAI = (question: string, context: string) => {
    setChatContext({ question, context })
    setShowChat(true)
    setSelectedBook(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Sun'iy intellekt bilan</span>
            </div>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              O'zbek kitoblarini o'qing va kashf eting
            </h1>
            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
              Klassik adabiyotdan zamonaviy asarlargacha - bepul o'qing, AI yordamchi bilan savollar bering va kitob
              tavsiyalari oling.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <a href="#books">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Kitoblarni ko'rish
                </a>
              </Button>
              <Link href="/ai-assistant">
                <Button size="lg" variant="outline">
                  <Bot className="mr-2 h-5 w-5" />
                  AI Yordamchi
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Books Section */}
      <section id="books" className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Kitoblar kutubxonasi</h2>
              <p className="text-muted-foreground">{filteredBooks.length} ta kitob topildi</p>
            </div>
            <Button onClick={() => setShowAddBook(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Kitob qo'shish
            </Button>
          </div>

          <div className="mb-6">
            <CategoryFilter categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
          </div>

          {filteredBooks.length === 0 ? (
            <Card className="py-12">
              <CardContent className="text-center">
                <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold text-foreground">Kitob topilmadi</h3>
                <p className="text-muted-foreground">Boshqa qidiruv so'zi yoki kategoriya tanlang</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} onClick={() => setSelectedBook(book)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-2xl border-primary/20 bg-card">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-foreground">AI yordamchi bilan suhbatlashing</h3>
              <p className="mb-6 text-muted-foreground">
                Kitoblar haqida savollar bering, tavsiyalar oling yoki murakkab matnlarni tushuntirib berishini so'rang.
              </p>
              <Link href="/ai-assistant">
                <Button size="lg">
                  Suhbatni boshlash
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© 2026 Kitobxon - O'zbek kitoblar ilovasi</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Sun'iy intellekt yordamida kitob o'qish va tavsiyalar olish
          </p>
        </div>
      </footer>

      {/* Book Reader Modal */}
      {selectedBook && <BookReader book={selectedBook} onClose={() => setSelectedBook(null)} onAskAI={handleAskAI} />}

      {/* AI Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
          <div className="w-full max-w-lg">
            <AIChat initialQuestion={chatContext.question} bookContext={chatContext.context} />
            <Button variant="outline" className="mt-4 w-full bg-transparent" onClick={() => setShowChat(false)}>
              Yopish
            </Button>
          </div>
        </div>
      )}

      {/* Add Book Modal */}
      {showAddBook && (
        <AddBookForm onClose={() => setShowAddBook(false)} onBookAdded={handleBookAdded} categories={categories} />
      )}
    </div>
  )
}
