import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-balance">
          Talk to your customers before they exist
        </h1>
        
        <p className="mt-6 md:mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
          Digital Customer Twins are AI-powered representations of your customers that you can actually 
          converse with. Ask them questions. Test your messaging. Understand their objections. 
          Before you spend a dollar on research or a month building the wrong thing.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild className="h-12 px-8 text-base">
            <Link href="#pricing">
              Start building twins
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="h-12 px-8 text-base bg-transparent">
            <Link href="#how-it-works">
              See how it works
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
