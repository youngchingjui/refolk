import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-balance">
            Your customers already have opinions about your product. Now you can hear them.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Every day you wait is another day building on assumptions. Start talking to 
            your twins today.
          </p>
          <Button size="lg" asChild className="mt-8 h-12 px-8 text-base">
            <Link href="#pricing">
              Build your first twin
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-medium tracking-tight">
              twins
            </Link>
            <span className="text-sm text-muted-foreground">
              © 2026 Twins, Inc.
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
