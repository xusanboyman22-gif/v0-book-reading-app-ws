import { type NextRequest, NextResponse } from "next/server"
import { uzbekBooks } from "@/lib/books-data"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyCYkivW_PQEE3ayBSYTXw1mtnQiDMau7GM"

export async function POST(request: NextRequest) {
  try {
    const { preferences, readBooks } = await request.json()

    const booksInfo = uzbekBooks
      .map((b) => `ID: ${b.id}, Nomi: "${b.title}", Muallif: ${b.author}, Kategoriya: ${b.category}, Yil: ${b.year}`)
      .join("\n")

    const prompt = `Sen kitob tavsiya qiluvchi AI san. Quyidagi ma'lumotlar asosida 3 ta kitob tavsiya qil.

Mavjud kitoblar:
${booksInfo}

Foydalanuvchi haqida:
- Qiziqishlari: ${preferences || "ko'rsatilmagan"}
- Oldin o'qigan kitoblari: ${readBooks?.join(", ") || "ko'rsatilmagan"}

Javobni JSON formatida ber:
{
  "recommendations": [
    {"id": "kitob_id", "reason": "nima uchun tavsiya qilyapsan"}
  ]
}

Faqat JSON qaytar, boshqa hech narsa yo'q.`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 512,
          },
        }),
      },
    )

    if (!response.ok) {
      return NextResponse.json({ recommendations: [] }, { status: 200 })
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}"

    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        return NextResponse.json(parsed)
      }
    } catch {
      // If parsing fails, return empty recommendations
    }

    return NextResponse.json({ recommendations: [] })
  } catch (error) {
    console.error("Recommend API error:", error)
    return NextResponse.json({ recommendations: [] }, { status: 200 })
  }
}
