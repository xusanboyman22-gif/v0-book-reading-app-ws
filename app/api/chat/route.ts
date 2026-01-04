import { GoogleGenAI } from "@google/genai"
import { type NextRequest, NextResponse } from "next/server"
import { uzbekBooks } from "@/lib/books-data"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

export async function POST(request: NextRequest) {
  try {
    const { message, bookContext, history } = await request.json()

    const booksInfo = uzbekBooks
      .map((b) => `"${b.title}" - ${b.author} (${b.category}, ${b.year}): ${b.description}`)
      .join("\n")

    const systemPrompt = `Sen o'zbek kitoblar haqida bilimdon AI yordamchisan. Sening vazifang:
1. Kitoblar haqida savollarga javob berish
2. Kitob tavsiya qilish
3. Matnlarni tushuntirish
4. O'zbek adabiyoti haqida ma'lumot berish

Mavjud kitoblar ro'yxati:
${booksInfo}

${bookContext ? `Hozir o'qilayotgan kitob matni: ${bookContext.slice(0, 2000)}` : ""}

Qoidalar:
- Doim o'zbek tilida javob ber
- Qisqa va aniq javoblar ber
- Foydalanuvchini hurmat bilan kutib ol
- Kitoblar haqida to'g'ri ma'lumot ber`

    const conversationHistory =
      history
        ?.map(
          (msg: { role: string; content: string }) =>
            `${msg.role === "user" ? "Foydalanuvchi" : "Yordamchi"}: ${msg.content}`,
        )
        .join("\n") || ""

    const fullPrompt = `${systemPrompt}

${conversationHistory ? `Oldingi suhbat:\n${conversationHistory}\n` : ""}
Foydalanuvchi: ${message}

Yordamchi:`

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
    })

    const aiResponse = response.text || "Kechirasiz, javob topilmadi."

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return NextResponse.json({ response: "Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring." }, { status: 200 })
  }
}
