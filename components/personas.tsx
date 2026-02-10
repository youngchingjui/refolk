"use client"

import { useState } from "react"
import { ChevronDown, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const personas = [
  {
    id: "maya",
    name: "Maya Chen",
    subtitle: "34, female, product lead at Series B fintech, married, 2 kids",
    avatar: "M",
    shortBio: "Skeptical of new tools—burned twice by vendors who overpromised. Needs proof before she'll champion anything internally.",
    backstory: `Maya grew up in a household where money was discussed openly—her parents ran a small restaurant and she saw firsthand what happens when cash flow gets tight. She studied engineering but moved into product because she loved the human side of building things.

She's been burned twice by shiny tools that promised transformation and delivered nothing. The first was a "customer insights platform" that cost $40k/year and sat unused. The second was an AI writing tool that produced generic garbage.

Now she's the skeptic in every vendor meeting. She asks hard questions. She wants case studies with numbers, not testimonials. When she does find a tool that works, she becomes its biggest internal champion—but earning that trust takes time.

She has two kids under 5, so her time is fragmented. She does deep work between 5-7am before they wake up. She reads product updates on her phone while waiting at soccer practice.`
  },
  {
    id: "marcus",
    name: "Marcus Johnson", 
    subtitle: "28, male, bootstrapped DTC founder, single, Brooklyn",
    avatar: "MJ",
    shortBio: "First-time founder running lean. Makes fast decisions but watches every dollar. Knows his customers by name.",
    backstory: `Marcus left his consulting job 18 months ago to start a skincare line focused on men with darker skin tones—a market he felt was underserved after years of buying products that left white residue or didn't match his needs.

He bootstrapped with savings and a small loan from his parents. Every dollar matters. He's doing most things himself: product development, marketing, customer service. He hired his first employee three months ago.

He's naturally optimistic and moves fast, but there's a constant low-level anxiety about runway. He has maybe 8 months left if revenue stays flat. He makes buying decisions quickly when he sees clear value, but he's allergic to subscriptions that feel like they could balloon.

His customers DM him directly on Instagram. He reads every message. He knows their names. This closeness to customers is his advantage, but it doesn't scale.`
  },
  {
    id: "linda",
    name: "Linda Okafor",
    subtitle: "52, female, VP Marketing at enterprise SaaS, divorced, grandmother",
    avatar: "L",
    shortBio: "20+ years in marketing. Trusts her gut but learned that 'I just know' doesn't work in exec meetings anymore.",
    backstory: `Linda has been in marketing since before Google existed. She's seen channels come and go—she ran direct mail campaigns, then email, then social, now she's figuring out what AI means for her team.

She has strong instincts about what resonates with customers. Her gut is usually right. But her company has become increasingly data-driven, and she's learned that "I just know" doesn't fly in executive meetings anymore.

She manages a team of 12 and a budget of $4M. She's protective of her team and skeptical of tools that claim to replace human judgment. But she's also aware that her younger reports are faster with new technology, and she doesn't want to become the person who "doesn't get it."

She has two grown kids and recently became a grandmother. Work-life balance matters more to her now than it did in her 30s when she was grinding for promotions. She leaves at 5:30pm most days and doesn't apologize for it.`
  }
]

export function Personas() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Meet the personas
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-medium tracking-tight text-balance">
            Real people with real histories
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            These aren{"'"}t archetypes or marketing segments. Each persona has a childhood, a career
            trajectory, anxieties, and patterns of behavior that shape how they respond to everything you show them.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {personas.map((persona) => (
            <div 
              key={persona.id}
              className="border border-border rounded-lg bg-card overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(expandedId === persona.id ? null : persona.id)}
                className="w-full p-6 flex items-start gap-4 text-left min-h-[88px]"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium shrink-0">
                  {persona.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{persona.name}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{persona.subtitle}</p>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{persona.shortBio}</p>
                </div>
                <ChevronDown 
                  className={cn(
                    "w-5 h-5 text-muted-foreground shrink-0 transition-transform mt-1",
                    expandedId === persona.id && "rotate-180"
                  )}
                />
              </button>
              
              {expandedId === persona.id && (
                <div className="px-6 pb-6 pt-2 border-t border-border">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Full backstory
                  </p>
                  <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {persona.backstory}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Build your own - subtle secondary option */}
          <div className="border border-dashed border-border rounded-lg bg-transparent">
            <button
              className="w-full p-6 flex items-start gap-4 text-left min-h-[88px] opacity-70 hover:opacity-100 transition-opacity"
            >
              <div className="w-12 h-12 rounded-full border border-dashed border-muted-foreground/40 flex items-center justify-center shrink-0">
                <Plus className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-muted-foreground">Build your own persona</h3>
                <p className="text-sm text-muted-foreground mt-0.5">Create a custom persona for your specific audience</p>
                <p className="text-sm text-muted-foreground/70 mt-2 leading-relaxed">
                  Upload customer interviews, support tickets, survey responses. We{"'"}ll help you construct a persona from real data.
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
