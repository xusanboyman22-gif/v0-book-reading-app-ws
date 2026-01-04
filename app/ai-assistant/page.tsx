"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { AIChat } from "@/components/ai-chat"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { uzbekBooks } from "@/lib/books-data"
import { Lightbulb, MessageSquareText, Sparkles, Star, TrendingUp } from "lucide-react"
import Image from "next/image"

export default function AIAssistantPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [recommendations, setRecommendations] = useState<Array<{ id: string; reason: string }>>([])
  const [isLoadingRecs, setIsLoadingRecs] = useState(false)

  const getRecommendations = async () => {
    setIsLoadingRecs(true)
    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preferences: "klassik adabiyot, tarix, she'riyat",
          readBooks: [],
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setRecommendations(data.recommendations || [])
      }
    } catch {
      console.error("Failed to get recommendations")
    }
    setIsLoadingRecs(false)
  }

  const recommendedBooks = recommendations
    .map((rec) => {
      const book = uzbekBooks.find((b) => b.id === rec.id)
      return book ? { ...book, reason: rec.reason } : null
    })
    .filter(Boolean)

  const featuredFeatures = [
    {
      icon: MessageSquareText,
      title: "Savol-javob",
      description: "Kitoblar haqida istalgan savolni bering",
    },
    {
      icon: Lightbulb,
      title: "Tavsiyalar",
      description: "Sizga mos kitoblarni topamiz",
    },
    {
      icon: Sparkles,
      title: "Matn tushuntirish",
      description: "Murakkab matnlarni soddalashtiramiz",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">AI Kitob Yordamchi</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Sun'iy intellekt yordamida kitoblar haqida savollar bering, tavsiyalar oling va o'zbek adabiyotini kashf
            eting.
          </p>
        </div>

        {/* Features */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {featuredFeatures.map((feature, index) => (
            <Card key={index} className="border-border/50">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* AI Chat */}
          <div>
            <AIChat />
          </div>

          {/* Recommendations */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  AI Kitob Tavsiyalari
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Sizning qiziqishlaringizga qarab shaxsiy tavsiyalar oling
                </p>
                <Button onClick={getRecommendations} disabled={isLoadingRecs}>
                  {isLoadingRecs ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Yuklanmoqda...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Tavsiya olish
                    </>
                  )}
                </Button>

                {recommendedBooks.length > 0 && (
                  <div className="mt-6 space-y-4">
                    {recommendedBooks.map((book: any) => (
                      <div key={book.id} className="flex gap-4 rounded-lg border border-border p-3">
                        <div className="relative h-20 w-14 flex-shrink-0 overflow-hidden rounded">
                          <Image
                            src={book.cover || "/placeholder.svg"}
                            alt={book.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground truncate">{book.title}</h4>
                          <p className="text-sm text-muted-foreground">{book.author}</p>
                          {book.reason && <p className="mt-1 text-xs text-primary line-clamp-2">{book.reason}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Popular Books */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-accent" />
                  Mashhur kitoblar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {uzbekBooks.slice(0, 4).map((book) => (
                  <div
                    key={book.id}
                    className="flex items-center gap-3 rounded-lg border border-border p-2 hover:bg-muted/50 transition-colors"
                  >
                    <div className="relative h-14 w-10 flex-shrink-0 overflow-hidden rounded">
                      <Image src={book.cover || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground truncate">{book.title}</h4>
                      <p className="text-xs text-muted-foreground">{book.author}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs flex-shrink-0">
                      {book.category}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
