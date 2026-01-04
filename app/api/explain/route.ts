import { GoogleGenAI } from "@google/genai"
import { type NextRequest, NextResponse } from "next/server"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

export async function POST(request: NextRequest) {
  try {
    const { text, bookTitle } = await request.json()

    const prompt = `Sen o'zbek tili o'qituvchisisan. Quyidagi matnni oddiy o'zbek tilida tushuntir.

Kitob: ${bookTitle}
Matn: "${text}"

Tushuntirishni qisqa va sodda qil. O'quvchi bu matnning ma'nosini tushunishi kerak. Agar qadimiy yoki kam ishlatiladigan so'zlar bo'lsa, ularni ham tushuntir.`

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    })

    const explanation = response.text || "Tushuntirish topilmadi."

    return NextResponse.json({ explanation })
  } catch (error) {
    console.error("[v0] Explain API error:", error)
    return NextResponse.json({ explanation: "Xatolik yuz berdi." }, { status: 200 })
  }
}
