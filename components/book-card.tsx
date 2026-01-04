"use client"

import type { Book } from "@/lib/books-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText } from "lucide-react"
import Image from "next/image"
import { calculatePages } from "@/lib/page-utils"

interface BookCardProps {
  book: Book
  onClick: () => void
}

export function BookCard({ book, onClick }: BookCardProps) {
  const actualPages = calculatePages(book.content)

  return (
    <Card
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Image
          src={book.cover || "/placeholder.svg"}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <CardContent className="p-4">
        <Badge variant="secondary" className="mb-2 text-xs">
          {book.category}
        </Badge>
        <h3 className="mb-1 line-clamp-1 font-semibold text-foreground group-hover:text-primary transition-colors">
          {book.title}
        </h3>
        <p className="mb-3 text-sm text-muted-foreground">{book.author}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            {actualPages} sahifa
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {book.year}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
