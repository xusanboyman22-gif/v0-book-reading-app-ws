import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"

export async function POST(request: NextRequest) {
  try {
    const { pdfUrl } = await request.json()

    if (!pdfUrl) {
      return NextResponse.json({ error: "PDF URL topilmadi" }, { status: 400 })
    }

    // Use Gemini to extract text from PDF
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

    // Fetch the PDF
    const pdfResponse = await fetch(pdfUrl)
    const pdfBuffer = await pdfResponse.arrayBuffer()
    const base64Pdf = Buffer.from(pdfBuffer).toString("base64")

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: "application/pdf",
                data: base64Pdf,
              },
            },
            {
              text: `Bu PDF fayldan barcha matnni chiqarib ber. Matnni o'zbek tilida yoki asl tilida qoldir. Har bir sahifani yangi paragraf bilan ajrat. Faqat matnni ber, boshqa izoh qo'shma. Agar matn topilmasa, "Matn topilmadi" deb yoz.`,
            },
          ],
        },
      ],
    })

    const content = response.text || "Matn topilmadi"

    // Estimate page count based on content length
    const estimatedPageCount = Math.max(1, Math.ceil(content.length / 2000))

    return NextResponse.json({
      content,
      pageCount: estimatedPageCount,
    })
  } catch (error) {
    console.error("PDF parse error:", error)
    return NextResponse.json(
      {
        error: "PDF o'qishda xatolik",
        content: "Bu kitobning matni yuklanmadi. PDF faylni tekshiring.",
        pageCount: 1,
      },
      { status: 200 },
    )
  }
}
