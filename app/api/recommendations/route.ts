import { GoogleGenAI } from "@google/genai"
import { type NextRequest, NextResponse } from "next/server"
import { uzbekBooks } from "@/lib/books-data"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

export async function POST(request: NextRequest) {
  try {
    const { preferences, readBooks } = await request.json()

    const booksInfo = uzbekBooks
      .map((b) => `ID: ${b.id}, "${b.title}" - ${b.author} (${b.category}, ${b.year})`)
      .join("\n")

    const prompt = `Sen kitob tavsiya qiluvchi AI san. Quyidagi ma'lumotlarga asoslanib, foydalanuvchiga 3 ta kitob tavsiya qil.

Mavjud kitoblar:
${booksInfo}

Foydalanuvchi qiziqishlari: ${preferences || "umumiy"}
O'qilgan kitoblar: ${readBooks?.join(", ") || "yo'q"}

Faqat kitob ID larini vergul bilan ajratib yoz, boshqa hech narsa yozma. Masalan: 1,3,5`

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    })

    const text = response.text || ""
    const recommendedIds = text.match(/\d+/g)?.map(Number).slice(0, 3) || [1, 2, 3]

    const recommendedBooks = recommendedIds.map((id) => uzbekBooks.find((b) => b.id === id)).filter(Boolean)

    return NextResponse.json({ recommendations: recommendedBooks })
  } catch (error) {
    console.error("[v0] Recommendations API error:", error)
    return NextResponse.json({ recommendations: uzbekBooks.slice(0, 3) })
  }
}
