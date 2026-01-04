"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, User, BookOpen, Lightbulb, HelpCircle } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface AIChatProps {
  initialQuestion?: string
  bookContext?: string
}

export function AIChat({ initialQuestion, bookContext }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Assalomu alaykum! Men sizning kitob yordamchingizman. Kitoblar haqida savollar bering, tavsiyalar oling yoki matnlarni tushuntirishni so'rang. 📚",
    },
  ])
  const [input, setInput] = useState(initialQuestion || "")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (initialQuestion) {
      handleSend(initialQuestion)
    }
  }, [])

  const handleSend = async (messageText?: string) => {
    const text = messageText || input.trim()
    if (!text) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          bookContext,
          history: messages.slice(-6),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.response,
        }
        setMessages((prev) => [...prev, assistantMessage])
      } else {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Kechirasiz, javob berishda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.",
        }
        setMessages((prev) => [...prev, assistantMessage])
      }
    } catch {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Internet aloqasi bilan muammo. Iltimos, aloqani tekshiring.",
      }
      setMessages((prev) => [...prev, assistantMessage])
    }

    setIsLoading(false)
  }

  const suggestedQuestions = [
    { icon: BookOpen, text: "Qaysi kitobni o'qishni maslahat berasiz?" },
    { icon: Lightbulb, text: "Bolalar uchun qaysi kitob yaxshi?" },
    { icon: HelpCircle, text: "O'zbek klassik adabiyoti haqida gapirib bering" },
  ]

  return (
    <Card className="flex h-[600px] flex-col">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <span className="text-lg">AI Kitob Yordamchi</span>
            <p className="text-sm font-normal text-muted-foreground">Kitoblar haqida savollar bering</p>
          </div>
        </CardTitle>
      </CardHeader>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
              <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                  message.role === "user" ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
                }`}
              >
                {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div
                className={`rounded-2xl px-4 py-2 max-w-[80%] ${
                  message.role === "user" ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-2xl bg-muted px-4 py-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-foreground/50" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-foreground/50 [animation-delay:0.2s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-foreground/50 [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}

          {messages.length === 1 && (
            <div className="mt-4 space-y-2">
              <p className="text-xs text-muted-foreground mb-2">Tavsiya etilgan savollar:</p>
              {suggestedQuestions.map((q, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left h-auto py-2 bg-transparent"
                  onClick={() => handleSend(q.text)}
                >
                  <q.icon className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{q.text}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      <CardContent className="border-t border-border p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Savolingizni yozing..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
