"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X, BookPlus, FileText, ImageIcon, Loader2 } from "lucide-react"
import Image from "next/image"

interface AddBookFormProps {
  onClose: () => void
  onBookAdded: () => void
  categories: string[]
}

export function AddBookForm({ onClose, onBookAdded, categories }: AddBookFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfName, setPdfName] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    year: new Date().getFullYear(),
    language: "O'zbek",
  })

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Faqat rasm fayllari qabul qilinadi")
        return
      }
      setCoverFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setError(null)
    }
  }

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Faqat PDF fayllari qabul qilinadi")
        return
      }
      setPdfFile(file)
      setPdfName(file.name)
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.title || !formData.author || !formData.category) {
      setError("Iltimos, barcha majburiy maydonlarni to'ldiring")
      return
    }

    if (!pdfFile) {
      setError("Iltimos, PDF fayl yuklang")
      return
    }

    setIsSubmitting(true)

    try {
      // Upload cover image if provided
      let coverUrl = "/abstract-book-cover.png"
      if (coverFile) {
        const coverFormData = new FormData()
        coverFormData.append("file", coverFile)
        const coverResponse = await fetch("/api/upload", {
          method: "POST",
          body: coverFormData,
        })
        if (coverResponse.ok) {
          const coverData = await coverResponse.json()
          coverUrl = coverData.url
        }
      }

      // Upload PDF and parse it
      const pdfFormData = new FormData()
      pdfFormData.append("file", pdfFile)
      const pdfResponse = await fetch("/api/upload", {
        method: "POST",
        body: pdfFormData,
      })

      if (!pdfResponse.ok) {
        throw new Error("PDF yuklashda xatolik")
      }

      const pdfData = await pdfResponse.json()

      // Parse PDF content
      const parseResponse = await fetch("/api/parse-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pdfUrl: pdfData.url }),
      })

      let content = "Bu kitobning matni yuklanmoqda..."
      let pageCount = 1

      if (parseResponse.ok) {
        const parseData = await parseResponse.json()
        content = parseData.content || content
        pageCount = parseData.pageCount || 1
      }

      // Save book to localStorage (or could be API)
      const newBook = {
        id: `user-${Date.now()}`,
        title: formData.title,
        author: formData.author,
        cover: coverUrl,
        description: formData.description,
        category: formData.category,
        pages: pageCount,
        year: formData.year,
        language: formData.language,
        content: content,
        pdfUrl: pdfData.url,
        isUserCreated: true,
        createdAt: new Date().toISOString(),
      }

      // Save to localStorage
      const existingBooks = JSON.parse(localStorage.getItem("kitobxon_user_books") || "[]")
      existingBooks.push(newBook)
      localStorage.setItem("kitobxon_user_books", JSON.stringify(existingBooks))

      onBookAdded()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xatolik yuz berdi")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4 overflow-auto">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader className="sticky top-0 bg-card z-10 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookPlus className="h-5 w-5" />
                Yangi kitob qo'shish
              </CardTitle>
              <CardDescription>PDF fayl va ma'lumotlarni kiriting</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Cover Image and PDF Upload */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Cover Image */}
              <div>
                <Label className="mb-2 block">Muqova rasmi</Label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                    className="hidden"
                    id="cover-upload"
                  />
                  <label
                    htmlFor="cover-upload"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors overflow-hidden"
                  >
                    {coverPreview ? (
                      <Image
                        src={coverPreview || "/placeholder.svg"}
                        alt="Cover preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <>
                        <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Rasm yuklash</span>
                      </>
                    )}
                  </label>
                  {coverPreview && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={() => {
                        setCoverPreview(null)
                        setCoverFile(null)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* PDF Upload */}
              <div>
                <Label className="mb-2 block">PDF fayl *</Label>
                <div className="relative">
                  <input type="file" accept=".pdf" onChange={handlePdfChange} className="hidden" id="pdf-upload" />
                  <label
                    htmlFor="pdf-upload"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
                  >
                    {pdfName ? (
                      <div className="flex flex-col items-center gap-2 p-4">
                        <FileText className="h-10 w-10 text-primary" />
                        <span className="text-sm text-center text-foreground font-medium break-all px-2">
                          {pdfName}
                        </span>
                        <span className="text-xs text-muted-foreground">PDF yuklangan</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">PDF yuklash</span>
                      </>
                    )}
                  </label>
                  {pdfName && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={() => {
                        setPdfFile(null)
                        setPdfName("")
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="title">Kitob nomi *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Masalan: O'tkan kunlar"
                  required
                />
              </div>

              <div>
                <Label htmlFor="author">Muallif *</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Masalan: Abdulla Qodiriy"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Kategoriya *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Kategoriya tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .filter((c) => c !== "Barchasi")
                      .map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="year">Yil</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: Number.parseInt(e.target.value) || new Date().getFullYear() })
                  }
                  min={1000}
                  max={new Date().getFullYear()}
                />
              </div>

              <div>
                <Label htmlFor="language">Til</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => setFormData({ ...formData, language: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Til tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="O'zbek">O'zbek</SelectItem>
                    <SelectItem value="Rus">Rus</SelectItem>
                    <SelectItem value="Ingliz">Ingliz</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="description">Tavsif</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Kitob haqida qisqacha ma'lumot..."
                  rows={3}
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Bekor qilish
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Yuklanmoqda...
                  </>
                ) : (
                  <>
                    <BookPlus className="mr-2 h-4 w-4" />
                    Kitob qo'shish
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
