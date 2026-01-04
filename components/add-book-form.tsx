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

// Import the service we created
import { uploadToGithub } from "@/lib/github-service"

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
      reader.onloadend = () => setCoverPreview(reader.result as string)
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
      const bookId = `book-${Date.now()}`
      
      // 1. Upload Cover Image to GitHub (if exists)
      let finalCoverUrl = "/abstract-book-cover.png"
      if (coverFile) {
        const coverPath = `library/${bookId}/cover-${coverFile.name}`
        await uploadToGithub({
          path: coverPath,
          content: await coverFile.arrayBuffer(),
          message: `Upload Cover: ${formData.title}`,
          isBinary: true
        })
        finalCoverUrl = `https://raw.githubusercontent.com/xusanboyman22-gif/v0-book-reading-app-ws/main/${coverPath}`
      }

      // 2. Upload PDF to GitHub
      const pdfPath = `library/${bookId}/${pdfFile.name}`
      await uploadToGithub({
        path: pdfPath,
        content: await pdfFile.arrayBuffer(),
        message: `Upload PDF: ${formData.title}`,
        isBinary: true
      })

      const finalPdfUrl = `https://raw.githubusercontent.com/xusanboyman22-gif/v0-book-reading-app-ws/main/${pdfPath}`

      // 3. Create Book Data
      const newBook = {
        id: bookId,
        title: formData.title,
        author: formData.author,
        cover: finalCoverUrl,
        description: formData.description,
        category: formData.category,
        pages: 0,
        year: formData.year,
        language: formData.language,
        content: "Matn yuklanmoqda...",
        pdfUrl: finalPdfUrl,
        isUserCreated: true,
        createdAt: new Date().toISOString(),
      }

      // 4. Save Metadata.json to GitHub
      await uploadToGithub({
        path: `library/${bookId}/metadata.json`,
        content: JSON.stringify(newBook, null, 2),
        message: `Add Metadata: ${formData.title}`
      })

      // Sync with local state for immediate feedback
      const localBooks = JSON.parse(localStorage.getItem("kitobxon_user_books") || "[]")
      localBooks.push(newBook)
      localStorage.setItem("kitobxon_user_books", JSON.stringify(localBooks))

      alert("Kitob muvaffaqiyatli saqlandi!")
      onBookAdded()
      onClose()
    } catch (err: any) {
      setError(err.message || "Xatolik yuz berdi")
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
                <BookPlus className="h-5 w-5" /> Yangi kitob qo'shish
              </CardTitle>
              <CardDescription>Ma'lumotlar to'g'ridan-to'g'ri GitHub repositoryga saqlanadi</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label className="mb-2 block">Muqova rasmi</Label>
                <div className="relative">
                  <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" id="cover-upload" />
                  <label htmlFor="cover-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 overflow-hidden">
                    {coverPreview ? (
                      <Image src={coverPreview} alt="Preview" fill className="object-cover" />
                    ) : (
                      <><ImageIcon className="h-10 w-10 text-muted-foreground mb-2" /><span className="text-sm">Rasm yuklash</span></>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">PDF fayl *</Label>
                <div className="relative">
                  <input type="file" accept=".pdf" onChange={handlePdfChange} className="hidden" id="pdf-upload" />
                  <label htmlFor="pdf-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50">
                    {pdfName ? (
                      <div className="flex flex-col items-center gap-2"><FileText className="h-10 w-10 text-primary" /><span className="text-sm font-medium">{pdfName}</span></div>
                    ) : (
                      <><Upload className="h-10 w-10 text-muted-foreground mb-2" /><span className="text-sm">PDF yuklash</span></>
                    )}
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="title">Kitob nomi *</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="author">Muallif *</Label>
                <Input id="author" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="category">Kategoriya *</Label>
                <Select value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val })}>
                  <SelectTrigger><SelectValue placeholder="Tanlang" /></SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c !== "Barchasi").map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>Bekor qilish</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saqlanmoqda...</> : <><BookPlus className="mr-2 h-4 w-4" /> Saqlash</>}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
