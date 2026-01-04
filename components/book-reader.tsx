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
  Loader2,
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
  const [viewMode, setViewMode] = useState<"text" | "pdf">("text")
  const [fontSize, setFontSize] = useState(18)
  const [isReading, setIsReading] = useState(false)
  const [selectedText, setSelectedText] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const contentRef = useRef<HTMLDivElement>(null)
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Use the raw link but wrap it in Google's PDF viewer to bypass GitHub's download header
  const googlePdfViewerUrl = useMemo(() => {
    if (!book.pdfUrl) return null;
    return `https://docs.google.com/viewer?url=${encodeURIComponent(book.pdfUrl)}&embedded=true`;
  }, [book.pdfUrl]);

  const pages = useMemo(() => {
    const content = book.content || "Matn mavjud emas";
    return splitContentIntoPages(content);
  }, [book.content])
  
  const totalPages = pages.length

  useEffect(() => {
    if (!book.content || book.content === "Matn yuklanmoqda...") {
      setViewMode("pdf")
    }
    return () => {
      if (speechRef.current) window.speechSynthesis.cancel()
    }
  }, [book.id, book.content])

  // Navigation Logic
  const goToNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1) }
  const goToPrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1) }

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 border-b bg-background/95 backdrop-blur z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Orqaga
            </Button>
            
            <div className="flex bg-muted rounded-lg p-1">
              <Button variant={viewMode === "text" ? "secondary" : "ghost"} size="sm" onClick={() => setViewMode("text")}>
                <BookOpen className="h-4 w-4 mr-2" /> Matn
              </Button>
              <Button variant={viewMode === "pdf" ? "secondary" : "ghost"} size="sm" onClick={() => setViewMode("pdf")}>
                <FileText className="h-4 w-4 mr-2" /> PDF
              </Button>
            </div>
          </div>

          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden bg-muted/20">
        <div className="container mx-auto px-4 py-6 h-full">
          <div className="max-w-4xl mx-auto h-full">
            
            {viewMode === "text" ? (
              <div className="h-full overflow-y-auto space-y-6 pr-2">
                {/* Book Info Metadata */}
                <Card className="p-8">
                  <div className="prose prose-slate max-w-none" style={{ fontSize: `${fontSize}px` }}>
                    {pages[currentPage - 1]?.split("\n\n").map((para, i) => (
                      <p key={i} className="mb-6 leading-relaxed">{para}</p>
                    ))}
                  </div>
                </Card>
              </div>
            ) : (
              /* --- FIXED PDF VIEW MODE --- */
              <div className="w-full h-full bg-background border rounded-xl overflow-hidden shadow-xl flex flex-col relative">
                {googlePdfViewerUrl ? (
                  <>
                    <iframe 
                      src={googlePdfViewerUrl} 
                      className="w-full h-full border-none"
                      title={book.title}
                    />
                    {/* Fallback button in case iframe is slow */}
                    <div className="absolute bottom-4 right-4">
                       <Button asChild size="sm" variant="secondary" className="shadow-lg">
                          <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" /> Faylni ochish
                          </a>
                       </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-4">
                    <FileText className="h-12 w-12 text-muted-foreground" />
                    <p>PDF manzili topilmadi</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pagination Footer */}
      {viewMode === "text" && (
        <div className="flex-shrink-0 border-t bg-background py-3">
          <div className="container mx-auto px-4 flex items-center justify-between max-w-lg">
            <Button variant="outline" onClick={goToPrevPage} disabled={currentPage === 1}>Oldingi</Button>
            <span className="text-sm">{currentPage} / {totalPages}</span>
            <Button variant="outline" onClick={goToNextPage} disabled={currentPage === totalPages}>Keyingi</Button>
          </div>
        </div>
      )}
    </div>
  )
}
