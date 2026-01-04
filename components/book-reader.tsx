"use client"

import type React from "react"
import { useState, useRef, useEffect, useMemo } from "react"
import type { Book } from "@/lib/books-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  BookOpen,
  MessageCircle,
  Minus,
  Pause,
  Plus,
  Volume2,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { splitContentIntoPages } from "@/lib/page-utils"

interface BookReaderProps {
  book: Book
  onClose: () => void
  onAskAI: (question: string, context: string) => void
}

export function BookReader({ book, onClose, onAskAI }: BookReaderProps) {
  const [fontSize, setFontSize] = useState(18)
  const [isReading, setIsReading] = useState(false)
  const [selectedText, setSelectedText] = useState("")
  const [showExplanation, setShowExplanation] = useState(false)
  const [explanation, setExplanation] = useState("")
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [showPageInput, setShowPageInput] = useState(false)
  const [pageInputValue, setPageInputValue] = useState("")
  const contentRef = useRef<HTMLDivElement>(null)
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)

  const pages = useMemo(() => splitContentIntoPages(book.content), [book.content])
  const totalPages = pages.length

  useEffect(() => {
    return () => {
      if (speechRef.current) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [book.id])

  const handleTextToSpeech = () => {
    if (isReading) {
      window.speechSynthesis.cancel()
      setIsReading(false)
    } else {
      const utterance = new SpeechSynthesisUtterance(pages[currentPage - 1])
      utterance.lang = "uz-UZ"
      utterance.rate = 0.9
      utterance.onend = () => setIsReading(false)
      speechRef.current = utterance
      window.speechSynthesis.speak(utterance)
      setIsReading(true)
    }
  }

  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      setSelectedText(selection.toString().trim())
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      window.speechSynthesis.cancel()
      setIsReading(false)
      contentRef.current?.scrollTo(0, 0)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      window.speechSynthesis.cancel()
      setIsReading(false)
      contentRef.current?.scrollTo(0, 0)
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.speechSynthesis.cancel()
      setIsReading(false)
      setShowPageInput(false)
      contentRef.current?.scrollTo(0, 0)
    }
  }

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const page = Number.parseInt(pageInputValue)
    if (!isNaN(page)) {
      goToPage(page)
    }
    setPageInputValue("")
  }

  const explainText = async () => {
    if (!selectedText) return
    setShowExplanation(true)
    setIsLoadingExplanation(true)

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: selectedText, bookTitle: book.title }),
      })

      if (response.ok) {
        const data = await response.json()
        setExplanation(data.explanation)
      } else {
        setExplanation("Tushuntirish yuklanmadi. Iltimos, qaytadan urinib ko'ring.")
      }
    } catch {
      setExplanation("Xatolik yuz berdi. Internet aloqasini tekshiring.")
    }

    setIsLoadingExplanation(false)
  }

  const askAboutSelection = () => {
    if (selectedText) {
      onAskAI(`"${selectedText}" - bu matn nimani anglatadi?`, book.content)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Orqaga
            </Button>

            <div className="flex items-center gap-2">
              {/* Font Size Controls */}
              <div className="hidden sm:flex items-center gap-2 rounded-lg border border-border px-3 py-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-sm w-8 text-center">{fontSize}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setFontSize(Math.min(28, fontSize + 2))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Text to Speech */}
              <Button variant={isReading ? "default" : "outline"} size="sm" onClick={handleTextToSpeech}>
                {isReading ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">To'xtatish</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">O'qitish</span>
                  </>
                )}
              </Button>

              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto" ref={contentRef}>
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-3xl">
            {/* Book Info Header - Only show on first page */}
            {currentPage === 1 && (
              <div className="mb-8 flex flex-col sm:flex-row gap-6">
                <div className="relative h-48 w-32 flex-shrink-0 overflow-hidden rounded-lg mx-auto sm:mx-0">
                  <Image src={book.cover || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                </div>
                <div className="text-center sm:text-left">
                  <Badge variant="secondary" className="mb-2">
                    {book.category}
                  </Badge>
                  <h1 className="mb-2 text-2xl font-bold text-foreground">{book.title}</h1>
                  <p className="mb-2 text-lg text-muted-foreground">{book.author}</p>
                  <p className="text-sm text-muted-foreground">{book.description}</p>
                  <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {totalPages} sahifa
                    </span>
                    <span>{book.year} yil</span>
                    <span>{book.language}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Selected Text Actions */}
            {selectedText && (
              <Card className="mb-6 border-primary/50 bg-primary/5">
                <CardContent className="p-4">
                  <p className="mb-3 text-sm italic text-muted-foreground">
                    "{selectedText.length > 100 ? selectedText.slice(0, 100) + "..." : selectedText}"
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={explainText}>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Tushuntirish
                    </Button>
                    <Button size="sm" variant="outline" onClick={askAboutSelection}>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      AI dan so'rash
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setSelectedText("")}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Explanation Popup */}
            {showExplanation && (
              <Card className="mb-6 border-accent/50 bg-accent/5">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-accent" />
                      Tushuntirish
                    </CardTitle>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowExplanation(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingExplanation ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                      Tushuntirilmoqda...
                    </div>
                  ) : (
                    <p className="text-foreground leading-relaxed">{explanation}</p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Book Content - Current Page */}
            <Card className="min-h-[60vh]">
              <CardContent className="p-6 sm:p-8">
                <div
                  className="prose prose-lg max-w-none text-foreground leading-relaxed"
                  style={{ fontSize: `${fontSize}px` }}
                  onMouseUp={handleTextSelection}
                >
                  {pages[currentPage - 1].split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Page Navigation Footer */}
      <div className="flex-shrink-0 border-t border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <Button variant="outline" size="sm" onClick={goToPrevPage} disabled={currentPage === 1}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Oldingi
            </Button>

            <div className="flex items-center gap-2">
              {showPageInput ? (
                <form onSubmit={handlePageInputSubmit} className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={1}
                    max={totalPages}
                    value={pageInputValue}
                    onChange={(e) => setPageInputValue(e.target.value)}
                    placeholder={String(currentPage)}
                    className="w-16 h-8 text-center"
                    autoFocus
                  />
                  <span className="text-muted-foreground">/ {totalPages}</span>
                  <Button type="submit" size="sm" variant="ghost">
                    O'tish
                  </Button>
                  <Button type="button" size="sm" variant="ghost" onClick={() => setShowPageInput(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <button
                  onClick={() => setShowPageInput(true)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="font-medium text-foreground">{currentPage}</span> / {totalPages} sahifa
                </button>
              )}
            </div>

            <Button variant="outline" size="sm" onClick={goToNextPage} disabled={currentPage === totalPages}>
              Keyingi
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
