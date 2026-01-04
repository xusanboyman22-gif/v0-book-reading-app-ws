import { Card, CardContent } from "@/components/ui/card"
import { Search, BookMarked, MessageSquareText, Volume2, HelpCircle } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Aqlli qidiruv",
    description: "Kitob nomi, muallif, mavzu bo'yicha tez topadi",
  },
  {
    icon: BookMarked,
    title: "Kitob tavsiya qilish",
    description: "O'quvchining yoshi va qiziqishiga qarab moslab beradi",
  },
  {
    icon: MessageSquareText,
    title: "Matnni tushuntirish",
    description: "Murakkab so'z va gaplarni soddalashtirib beradi",
  },
  {
    icon: Volume2,
    title: "Ovozli o'qish",
    description: "Ko'zi charchagan yoki kichik yoshdagilar uchun",
  },
  {
    icon: HelpCircle,
    title: "Savol-javob",
    description: "AI yordamchi orqali kitob haqida savollar bering",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Sun'iy intellekt imkoniyatlari</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((feature, index) => (
            <Card key={index} className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
