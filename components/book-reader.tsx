"use client"

import type React from "react"
import { useState, useRef, useEffect, useMemo } from "react"
import type { Book } from "@/lib/books-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  BookOpen,
  FileText,
  X,
  Plus,
  Minus,
  Volume2,
  Pause,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  Download
} from "lucide-react"
import Image from "next/image"
import { splitContentIntoPages } from "@/lib/page-utils"

interface BookReaderProps {
  book: Book
  onClose: () => void
  onAskAI: (question: string, context: string) => void
}

export function BookReader({ book, onClose, onAskAI }: BookReaderProps) {
  const [viewMode, setViewMode] = useState<"text" | "pdf">("text")
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null)
  const [loadingPdf, setLoadingPdf] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [fontSize, setFontSize] = useState(18)
  const [isReading, setIsReading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Matnli kontentni sahifalarga bo'lish
  const pages = useMemo(() => {
    const content = book.content || "Matn mavjud emas"
    return splitContentIntoPages(content)
  }, [book.content])
  
  const totalPages = pages.length

  // --- GITHUB'DAN PDF YUKLASH LOGIKASI ---
  useEffect(() => {
    async function loadPdf() {
      if (!book.pdfUrl || viewMode !== "pdf" || pdfBlobUrl) return

      setLoadingPdf(true)
      setError(null)

      try {
        // GitHub Raw linkidan faylni yuklab olish
        const response = await fetch(book.pdfUrl)
        
        if (!response.ok) {
          throw new Error("GitHub faylni bera olmadi. Repozitoriy 'Public' ekanligini tekshiring.")
        }

        const blob = await response.blob()
        // Brauzer xotirasida vaqtinchalik URL yaratish
        const url = URL.createObjectURL(blob)
        setPdfBlobUrl(url)
      } catch (err: any) {
        console.error("PDF yuklashda xatolik:", err)
        setError(err.message || "Faylni yuklashda xatolik yuz berdi")
      } finally {
        setLoadingPdf(false)
      }
    }

    loadPdf()

    // Komponent yopilganda xotirani tozalash
    return () => {
      if (pdfBlobUrl) {
        URL.revokeObjectURL(pdfBlobUrl)
      }
    }
  }, [viewMode, book.pdfUrl, pdfBlobUrl])

  // Agar matn bo'lmasa, avtomatik PDF rejimiga o'tish
  useEffect(() => {
    if (!book.content || book.content === "Matn yuklanmoqda...") {
      setViewMode("pdf")
    }
  }, [book.content])

  const handleTextToSpeech = () => {
    if (isReading) {
      window.speechSynthesis.cancel()
      setIsReading(false)
    } else {
      const utterance = new SpeechSynthesisUtterance(pages[currentPage - 1])
      utterance.lang = "uz-UZ"
      utterance.onend = () => setIsReading(false)
      speechRef.current = utterance
      window.speechSynthesis.speak(utterance)
      setIsReading(true)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col overflow-hidden">
      {/* Yuqori panel */}
      <div className="flex-shrink-0 border-b bg-card px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Orqaga
          </Button>

          <div className="flex bg-muted rounded-lg p-1">
            <Button 
              variant={viewMode === "text" ? "secondary" : "ghost"} 
              size="sm" 
              onClick={() => setViewMode("text")}
            >
              <BookOpen className="h-4 w-4 mr-2" /> Matn
            </Button>
            <Button 
              variant={viewMode === "pdf" ? "secondary" : "ghost"} 
              size="sm" 
              onClick={() => setViewMode("pdf")}
            >
              <FileText className="h-4 w-4 mr-2" /> PDF
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {viewMode === "text" && (
            <div className="flex items-center gap-1 border rounded-md px-1 mr-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setFontSize(Math.max(12, fontSize - 2))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-xs w-6 text-center">{fontSize}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setFontSize(Math.min(30, fontSize + 2))}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Asosiy kontent */}
      <div className="flex-1 overflow-hidden bg-muted/20 p-4">
        <div className="max-w-5xl mx-auto h-full">
          {viewMode === "text" ? (
            /* MATN REJIMI */
            <div className="h-full flex flex-col gap-4">
              <Card className="flex-1 overflow-y-auto shadow-sm">
                <CardContent className="p-8 md:p-12">
                  {currentPage === 1 && (
                    <div className="mb-10 flex flex-col md:flex-row gap-6 border-b pb-8">
                      <div className="relative h-48 w-32 flex-shrink-0 rounded-lg overflow-hidden shadow">
                        <Image src={book.cover || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                      </div>
                      <div>
                        <Badge className="mb-2">{book.category}</Badge>
                        <h1 className="text-3xl font-bold">{book.title}</h1>
                        <p className="text-muted-foreground text-lg">{book.author}</p>
                        <p className="mt-4 text-sm text-muted-foreground">{book.description}</p>
                      </div>
                    </div>
                  )}
                  <div 
                    className="prose prose-slate max-w-none" 
                    style={{ fontSize: `${fontSize}px`, lineHeight: '1.7' }}
                  >
                    {pages[currentPage - 1]?.split("\n\n").map((p, i) => <p key={i} className="mb-4">{p}</p>)}
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex items-center justify-between bg-background p-3 rounded-lg border">
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                  <ChevronLeft className="h-4 w-4 mr-1" /> Oldingi
                </Button>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">{currentPage} / {totalPages}</span>
                  <Button variant="ghost" size="icon" onClick={handleTextToSpeech}>
                    {isReading ? <Pause className="h-4 w-4 text-primary" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                  Keyingi <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          ) : (
            /* PDF REJIMI */
            <div className="w-full h-full bg-white rounded-xl shadow-2xl overflow-hidden relative border flex flex-col">
              {loadingPdf && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-20">
                  <Loader2 className="h-10 w-10 animate-spin text-primary mb-3" />
                  <p className="text-sm font-medium animate-pulse">GitHub'dan kitob yuklanmoqda...</p>
                </div>
              )}

              {error && (
                <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
                  <AlertCircle className="h-16 w-16 text-destructive mb-4" />
                  <h3 className="text-xl font-bold mb-2">Yuklashda xatolik</h3>
                  <p className="text-muted-foreground max-w-md mb-6">{error}</p>
                  <Button onClick={() => window.open(book.pdfUrl, '_blank')}>
                    <Download className="mr-2 h-4 w-4" /> Faylni qo'lda yuklab olish
                  </Button>
                </div>
              )}

              {pdfBlobUrl && (
                <iframe 
                  src={`${pdfBlobUrl}#toolbar=0&navpanes=0`} 
                  className="w-full h-full border-none"
                  title="PDF Kitobxon"
                />
              )}

              {!book.pdfUrl && !loadingPdf && (
                <div className="flex-1 flex flex-col items-center justify-center">
                   <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                   <p>Ushbu kitob uchun PDF fayl biriktirilmagan.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
