export interface BookPage {
  pageNumber: number
  content: string
}

export interface Book {
  id: string
  title: string
  author: string
  description: string
  coverUrl: string
  category: string
  pages: BookPage[]
  totalPages: number
  year: number
  language: string
  pdfUrl?: string
  createdAt: string
}

export interface UserBook extends Book {
  isUserCreated: true
}
