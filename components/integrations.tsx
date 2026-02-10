"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Hash, ChevronRight, Check, X, Eye, MousePointerClick, Clock, GitPullRequest, AlertCircle, MessageSquare } from "lucide-react"

const integrations = [
  { id: "slack", name: "Slack", label: "Team chat" },
  { id: "email", name: "Email Preview", label: "Campaign stats" },
  { id: "cicd", name: "CI/CD Gate", label: "Deploy review" },
  { id: "webhook", name: "Event Hooks", label: "Auto-feedback" },
]

function SlackMockup() {
  return (
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden text-[#d1d2d3] text-sm">
      {/* Slack header */}
      <div className="px-4 py-3 border-b border-[#3f3f3f] flex items-center gap-2">
        <Hash className="w-4 h-4 text-[#9a9b9d]" />
        <span className="font-medium">product-feedback</span>
      </div>
      
      {/* Messages */}
      <div className="p-4 space-y-4">
        {/* User message */}
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-md bg-emerald-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            SK
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-white">Sarah Kim</span>
              <span className="text-xs text-[#9a9b9d]">2:34 PM</span>
            </div>
            <p className="mt-1 leading-relaxed">
              Hey <span className="px-1 py-0.5 rounded bg-[#1264a3]/30 text-[#1d9bd1]">@Maya</span> <span className="px-1 py-0.5 rounded bg-[#1264a3]/30 text-[#1d9bd1]">@Marcus</span> <span className="px-1 py-0.5 rounded bg-[#1264a3]/30 text-[#1d9bd1]">@Linda</span> — we{"'"}re thinking of adding a usage-based pricing tier alongside our flat monthly plans. Like $29/mo base + $0.10 per API call. Thoughts?
            </p>
          </div>
        </div>

        {/* Maya response */}
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-md bg-primary/20 flex items-center justify-center text-xs font-bold shrink-0">
            M
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-white">Maya Chen</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#4a154b] text-[#e8a5e9]">Persona</span>
              <span className="text-xs text-[#9a9b9d]">2:35 PM</span>
            </div>
            <p className="mt-1 leading-relaxed">
              I hate usage-based pricing. I can{"'"}t forecast my budget if costs change every month. My finance team will ask me for a number and I won{"'"}t have one. If you do this, I need a spending cap I can set myself—hard limit, no surprises.
            </p>
          </div>
        </div>

        {/* Marcus response */}
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-md bg-primary/20 flex items-center justify-center text-xs font-bold shrink-0">
            MJ
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-white">Marcus Johnson</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#4a154b] text-[#e8a5e9]">Persona</span>
              <span className="text-xs text-[#9a9b9d]">2:36 PM</span>
            </div>
            <p className="mt-1 leading-relaxed">
              Actually I{"'"}d prefer this? $29 is way more approachable than your current $99 plan. I{"'"}m not making many API calls right now anyway. Let me start cheap and scale up as I grow. That{"'"}s how I think about it.
            </p>
          </div>
        </div>

        {/* Linda response */}
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-md bg-primary/20 flex items-center justify-center text-xs font-bold shrink-0">
            L
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-white">Linda Okafor</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#4a154b] text-[#e8a5e9]">Persona</span>
              <span className="text-xs text-[#9a9b9d]">2:37 PM</span>
            </div>
            <p className="mt-1 leading-relaxed">
              The positioning matters here. If you frame it as "pay for what you use" that sounds like a utility. If you frame it as "start small, grow with us" that sounds like a partnership. Same pricing, different story. I{"'"}d test the messaging before the pricing.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function EmailMockup() {
  const personas = [
    { 
      name: "Maya Chen", 
      avatar: "M",
      opened: true, 
      readTime: "2m 34s",
      sections: ["Intro", "Feature list", "Pricing table"],
      skipped: ["Testimonials", "FAQ"],
      clicked: null,
      notes: "Scrolled past testimonials quickly. Spent 45 seconds on pricing comparison."
    },
    { 
      name: "Marcus Johnson", 
      avatar: "MJ",
      opened: true, 
      readTime: "48s",
      sections: ["Intro", "CTA button"],
      skipped: ["Feature list", "Pricing table", "Testimonials", "FAQ"],
      clicked: "CTA button",
      notes: "Skimmed quickly, clicked CTA within first minute. Mobile device."
    },
    { 
      name: "Linda Okafor", 
      avatar: "L",
      opened: false, 
      readTime: null,
      sections: [],
      skipped: [],
      clicked: null,
      notes: "Did not open. Subject line may not have signaled relevance to enterprise."
    },
  ]

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-muted/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Campaign preview</p>
            <p className="font-medium text-sm mt-0.5">Q1 Product Update Newsletter</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Open rate</p>
            <p className="font-medium text-sm mt-0.5">67%</p>
          </div>
        </div>
      </div>

      {/* Stats table */}
      <div className="divide-y divide-border">
        {personas.map((p) => (
          <div key={p.name} className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium shrink-0">
                {p.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm">{p.name}</span>
                  {p.opened ? (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      <Eye className="w-3 h-3" />
                      Opened
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      <X className="w-3 h-3" />
                      Not opened
                    </span>
                  )}
                  {p.clicked && (
                    <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-500/10 px-2 py-0.5 rounded-full">
                      <MousePointerClick className="w-3 h-3" />
                      Clicked
                    </span>
                  )}
                </div>
                
                {p.opened && (
                  <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>Read time: {p.readTime}</span>
                    </div>
                    {p.clicked && (
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <MousePointerClick className="w-3 h-3" />
                        <span>Clicked: {p.clicked}</span>
                      </div>
                    )}
                  </div>
                )}

                {p.opened && p.sections.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.sections.map((s) => (
                      <span key={s} className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700">
                        {s}
                      </span>
                    ))}
                    {p.skipped.map((s) => (
                      <span key={s} className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground line-through">
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                <p className="mt-2 text-xs text-muted-foreground italic">{p.notes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CICDMockup() {
  return (
    <div className="bg-[#0d1117] rounded-lg overflow-hidden text-[#c9d1d9] text-sm font-mono">
      {/* PR header */}
      <div className="px-4 py-3 border-b border-[#30363d] flex items-center gap-3">
        <GitPullRequest className="w-5 h-5 text-emerald-500" />
        <div>
          <span className="font-semibold text-white">feat: Update onboarding copy</span>
          <span className="text-[#8b949e] ml-2">#847</span>
        </div>
      </div>

      {/* Checks */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Check className="w-4 h-4 text-emerald-500" />
          <span className="text-[#8b949e]">build</span>
          <span className="text-xs text-emerald-500 ml-auto">passed</span>
        </div>
        <div className="flex items-center gap-3">
          <Check className="w-4 h-4 text-emerald-500" />
          <span className="text-[#8b949e]">test</span>
          <span className="text-xs text-emerald-500 ml-auto">passed</span>
        </div>
        <div className="flex items-center gap-3">
          <Check className="w-4 h-4 text-emerald-500" />
          <span className="text-[#8b949e]">lint</span>
          <span className="text-xs text-emerald-500 ml-auto">passed</span>
        </div>
        
        {/* Persona review - warning */}
        <div className="border border-yellow-500/30 rounded-md p-3 bg-yellow-500/5">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-4 h-4 text-yellow-500" />
            <span className="text-yellow-400 font-medium">refolk/maya-review</span>
            <span className="text-xs text-yellow-500 ml-auto">flagged</span>
          </div>
          <div className="mt-3 pl-7 text-[#8b949e] text-xs leading-relaxed">
            <p className="text-white font-sans">Maya flagged onboarding step 3:</p>
            <p className="mt-1 font-sans italic">{'"'}Click here to get started{'"'} — get started with what? This doesn{"'"}t tell me what happens next. I{"'"}d hesitate before clicking something vague like this.{'"'}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Check className="w-4 h-4 text-emerald-500" />
          <span className="text-[#8b949e]">refolk/marcus-review</span>
          <span className="text-xs text-emerald-500 ml-auto">approved</span>
        </div>
        <div className="flex items-center gap-3">
          <Check className="w-4 h-4 text-emerald-500" />
          <span className="text-[#8b949e]">refolk/linda-review</span>
          <span className="text-xs text-emerald-500 ml-auto">approved</span>
        </div>
      </div>

      {/* Merge blocked */}
      <div className="px-4 py-3 border-t border-[#30363d] bg-[#161b22]">
        <div className="flex items-center gap-2 text-xs text-[#8b949e]">
          <X className="w-4 h-4 text-red-500" />
          <span>Merging is blocked — 1 persona concern requires resolution</span>
        </div>
      </div>
    </div>
  )
}

function WebhookMockup() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-muted/50 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-sm font-medium">Live feed</span>
        <span className="text-xs text-muted-foreground ml-auto">product.feature.launched</span>
      </div>

      {/* Feed */}
      <div className="divide-y divide-border">
        {/* Event */}
        <div className="p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Jan 15, 2:30 PM</span>
            <ChevronRight className="w-3 h-3" />
            <span className="font-mono bg-muted px-1.5 py-0.5 rounded">feature.launched</span>
            <span className="font-medium text-foreground">AI Report Generator</span>
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-medium shrink-0">
                M
              </div>
              <div className="flex-1 bg-muted/50 rounded-lg p-3">
                <p className="text-xs font-medium">Maya Chen</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Another AI feature. Show me it{"'"}s different from the other AI tools I{"'"}ve tried. Does it actually learn from my company{"'"}s data or just generic responses? If I can{"'"}t see the difference in 5 minutes, I{"'"}m not interested.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-medium shrink-0">
                MJ
              </div>
              <div className="flex-1 bg-muted/50 rounded-lg p-3">
                <p className="text-xs font-medium">Marcus Johnson</p>
                <p className="text-sm text-muted-foreground mt-1">
                  I{"'"}d try this immediately. Spending 3 hours every week writing investor updates. If this can cut that in half, it{"'"}s worth it. Is there a way to test it before I commit to another monthly subscription?
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-medium shrink-0">
                L
              </div>
              <div className="flex-1 bg-muted/50 rounded-lg p-3">
                <p className="text-xs font-medium">Linda Okafor</p>
                <p className="text-sm text-muted-foreground mt-1">
                  The name {"'"}AI Report Generator{'"'} sounds like every other tool. I{"'"}d rename this to something that describes the outcome, not the technology. What report? For whom? That{"'"}s what I need to know.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Integrations() {
  const [activeTab, setActiveTab] = useState("slack")

  return (
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Where you already work
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-medium tracking-tight text-balance">
            Personas that show up in your workflow
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Tag a persona in Slack. Get email open predictions before you send. Block deploys until
            user-facing copy passes persona review. Set up webhooks that trigger persona reactions
            whenever you ship something new.
          </p>
        </div>

        <div className="mt-12">
          {/* Tab buttons */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {integrations.map((int) => (
              <button
                key={int.id}
                onClick={() => setActiveTab(int.id)}
                className={cn(
                  "px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors min-h-[44px]",
                  activeTab === int.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                )}
              >
                {int.name}
                <span className="text-xs opacity-70 ml-2">{int.label}</span>
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="mt-6">
            {activeTab === "slack" && <SlackMockup />}
            {activeTab === "email" && <EmailMockup />}
            {activeTab === "cicd" && <CICDMockup />}
            {activeTab === "webhook" && <WebhookMockup />}
          </div>
        </div>

        <div className="mt-12 p-6 border border-border rounded-lg bg-muted/30">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">API access included on Team and Enterprise plans.</span>
            {" "}Build custom integrations, trigger persona conversations from your own systems,
            or embed persona feedback into internal tools.
          </p>
        </div>
      </div>
    </section>
  )
}
