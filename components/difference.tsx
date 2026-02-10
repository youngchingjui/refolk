import { Check, X } from "lucide-react"

export function Difference() {
  return (
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            The difference
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-medium tracking-tight text-balance">
            Stop guessing how Persona A would feel. Ask them directly.
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8 lg:gap-16">
          <div className="p-8 rounded-lg border border-border bg-muted/30">
            <h3 className="text-lg font-medium text-muted-foreground">Traditional personas</h3>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Static documents that never change</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Abstract demographics and stereotypes</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Interpreted differently by each team member</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-muted-foreground">You read about them, then imagine their response</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-lg border-2 border-primary bg-card">
            <h3 className="text-lg font-medium">Refolk personas</h3>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                <span>Dynamic—they respond, argue, hesitate, change their mind</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                <span>Narrative-driven, grounded in a believable life story</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                <span>Consistent—the same person responds the same way</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                <span>Interactive—you talk to them, not just read about them</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
