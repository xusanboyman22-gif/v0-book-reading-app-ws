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
  FileText,
  ExternalLink
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
  // Ko'rish rejimi: 'text' (AI va matn) yoki 'pdf' (Asl fayl)
  const [viewMode, setViewMode] = useState<"text" | "pdf">("text")
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

  // Matnli kontentni sahifalarga bo'lish
  const pages = useMemo(() => {
    const content = book.content || "Matn mavjud emas";
    return splitContentIntoPages(content);
  }, [book.content])
  
  const totalPages = pages.length

  useEffect(() => {
    // Agar matn bo'sh bo'lsa, avtomatik PDF rejimiga o'tish
    if (!book.content || book.content === "Matn yuklanmoqda...") {
      setViewMode("pdf")
    }
    return () => {
      if (speechRef.current) window.speechSynthesis.cancel()
    }
  }, [book.id, book.content])

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
      }
    } catch {
      setExplanation("Xatolik yuz berdi.")
    }
    setIsLoadingExplanation(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-hidden flex flex-col">
      {/* Navigation Header */}
      <div className="flex-shrink-0 border-b bg-background/95 backdrop-blur z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Orqaga
            </Button>
            
            {/* VIEW MODE SWITCHER */}
            <div className="flex bg-muted rounded-lg p-1 shadow-inner">
              <Button 
                variant={viewMode === "text" ? "secondary" : "ghost"} 
                size="sm" 
                className="h-8 px-4"
                onClick={() => setViewMode("text")}
              >
                <BookOpen className="h-4 w-4 mr-2" /> Matn
              </Button>
              <Button 
                variant={viewMode === "pdf" ? "secondary" : "ghost"} 
                size="sm" 
                className="h-8 px-4"
                onClick={() => setViewMode("pdf")}
              >
                <FileText className="h-4 w-4 mr-2" /> PDF
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {viewMode === "text" && (
              <>
                <div className="hidden sm:flex items-center gap-1 border rounded-md px-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setFontSize(Math.max(12, fontSize - 2))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-xs font-mono w-6 text-center">{fontSize}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setFontSize(Math.min(32, fontSize + 2))}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant={isReading ? "default" : "outline"} size="icon" className="h-9 w-9" onClick={handleTextToSpeech}>
                  {isReading ? <Pause className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </>
            )}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-muted/20" ref={contentRef}>
        <div className="container mx-auto px-4 py-6 h-full">
          <div className="max-w-4xl mx-auto h-full">
            
            {viewMode === "text" ? (
              /* --- TEXT READING MODE --- */
              <div className="space-y-6">
                {currentPage === 1 && (
                  <div className="bg-background border rounded-xl p-6 flex flex-col md:flex-row gap-6 shadow-sm">
                    <div className="relative h-56 w-40 flex-shrink-0 shadow-md rounded-lg overflow-hidden">
                      <Image src={book.cover || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                    </div>
                    <div>
                      <Badge className="mb-2">{book.category}</Badge>
                      <h1 className="text-3xl font-bold">{book.title}</h1>
                      <p className="text-xl text-muted-foreground">{book.author}</p>
                      <p className="mt-4 text-muted-foreground leading-relaxed">{book.description}</p>
                    </div>
                  </div>
                )}

                {selectedText && (
                  <Card className="border-primary/40 bg-primary/5 animate-in fade-in slide-in-from-top-2">
                    <CardContent className="p-4 flex items-center justify-between gap-4">
                      <p className="text-sm italic truncate">"{selectedText}"</p>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button size="sm" onClick={explainText}><Sparkles className="h-3.5 w-3.5 mr-1"/> AI Tushuntir</Button>
                        <Button size="sm" variant="ghost" onClick={() => setSelectedText("")}><X className="h-4 w-4"/></Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className="min-h-[60vh] shadow-sm mb-10">
                  <CardContent className="p-8 md:p-12">
                    <div 
                      className="prose prose-slate max-w-none break-words" 
                      style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
                      onMouseUp={handleTextSelection}
                    >
                      {pages[currentPage - 1]?.split("\n\n").map((para, i) => (
                        <p key={i} className="mb-6">{para}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* --- PDF VIEW MODE --- */
              <div className="w-full h-[82vh] bg-background border rounded-xl overflow-hidden shadow-xl flex flex-col">
                {book.pdfUrl ? (
                  <iframe 
                    src={`${book.pdfUrl}#toolbar=0&navpanes=0`} 
                    className="w-full h-full border-none"
                    title={book.title}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-4 p-10 text-center">
                    <FileText className="h-16 w-16 text-muted-foreground" />
                    <h3 className="text-xl font-semibold">PDF fayl topilmadi</h3>
                    <p className="text-muted-foreground">Ushbu kitobning PDF varianti yuklanmagan yoki manzil noto'g'ri.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pagination (Only for Text Mode) */}
      {viewMode === "text" && (
        <div className="flex-shrink-0 border-t bg-background/95 backdrop-blur py-3">
          <div className="container mx-auto px-4 flex items-center justify-between max-w-lg">
            <Button variant="outline" size="sm" onClick={goToPrevPage} disabled={currentPage === 1}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Oldingi
            </Button>
            <div className="text-sm font-medium">
              {currentPage} / {totalPages}
            </div>
            <Button variant="outline" size="sm" onClick={goToNextPage} disabled={currentPage === totalPages}>
              Keyingi <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
