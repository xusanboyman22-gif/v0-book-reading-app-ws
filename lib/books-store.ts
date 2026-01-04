"use client"

import type { Book } from "./types"

const STORAGE_KEY = "kitobxon_user_books"

export function getUserBooks(): Book[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export function saveUserBook(book: Book): void {
  const books = getUserBooks()
  books.push(book)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
}

export function deleteUserBook(bookId: string): void {
  const books = getUserBooks().filter((b) => b.id !== bookId)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
}
