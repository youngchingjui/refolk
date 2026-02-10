import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Pricing
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-medium tracking-tight text-balance">
            One persona costs less than one focus group participant
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            A single focus group runs $5,000–$15,000 and gives you two hours of
            feedback from 8 people. Our personas are available 24/7, respond in
            seconds, and give you perspectives that actually match your target
            audience—without the cost, scheduling, or brand risk.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 lg:gap-8">
          <div className="p-8 rounded-lg border border-border bg-card flex flex-col">
            <div>
              <h3 className="text-lg font-medium">Starter</h3>
              <p className="mt-2 text-muted-foreground text-sm">
                For testing the waters
              </p>
              <div className="mt-6">
                <span className="text-4xl font-medium">$50</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>
            <ul className="mt-8 space-y-3 flex-1">
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>3 curated personas</strong>
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Unlimited conversations</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Connect to Slack + Email</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Export conversation logs</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Community support</span>
              </li>
            </ul>
            <Button
              variant="outline"
              asChild
              className="mt-8 h-12 bg-transparent"
            >
              <Link href={process.env.NEXT_PUBLIC_STRIPE_STARTER_LINK || "#"}>
                Start getting feedback
              </Link>
            </Button>
          </div>

          <div className="p-8 rounded-lg border-2 border-primary bg-card flex flex-col relative">
            <div className="absolute -top-3 left-8 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
              Most popular
            </div>
            <div>
              <h3 className="text-lg font-medium">Team</h3>
              <p className="mt-2 text-muted-foreground text-sm">
                For product and marketing teams
              </p>
              <div className="mt-6">
                <span className="text-4xl font-medium">$300</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>
            <ul className="mt-8 space-y-3 flex-1">
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>30 curated personas</strong>
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Full roster access</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Unlimited conversations</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Team collaboration (5 seats)</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Custom persona requests</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Priority support</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>API access</span>
              </li>
            </ul>
            <Button asChild className="mt-8 h-12">
              <Link href={process.env.NEXT_PUBLIC_STRIPE_TEAM_LINK || "#"}>
                Talk to the roster
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="p-8 rounded-lg border border-border bg-card flex flex-col">
            <div>
              <h3 className="text-lg font-medium">Enterprise</h3>
              <p className="mt-2 text-muted-foreground text-sm">
                For organizations at scale
              </p>
              <div className="mt-6">
                <span className="text-4xl font-medium">Custom</span>
              </div>
            </div>
            <ul className="mt-8 space-y-3 flex-1">
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Unlimited personas</strong>
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Everything in Team</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Unlimited seats</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Custom persona development</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>SSO & advanced security</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Custom integrations</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>SLA guarantees</span>
              </li>
            </ul>
            <Button
              variant="outline"
              asChild
              className="mt-8 h-12 bg-transparent"
            >
              <Link href="#">Contact sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
