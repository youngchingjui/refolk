export function UseCases() {
  return (
    <section className="py-20 md:py-32 px-6 bg-card border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Use cases
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-medium tracking-tight text-balance">
            What changes when you can talk to customers that don{"'"}t exist yet
          </h2>
        </div>

        <div className="mt-16 space-y-16">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-xl font-medium">Test messaging before you ship it</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Show your persona an ad, a tagline, a landing page. They{"'"}ll tell you what feels off.
                {'"'}This detergent says it{"'"}s eco-friendly but feels vague. Is it actually better, 
                or just more expensive?{'"'} You get real objections in human language, not survey data.
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-6 border border-border">
              <p className="text-sm text-muted-foreground font-medium mb-3">Example conversation</p>
              <div className="space-y-3 text-sm">
                <p><span className="font-medium">You:</span> What do you think of this headline: {'"'}The future of clean, delivered{'"'}?</p>
                <p><span className="font-medium">Persona:</span> It sounds nice but I have no idea what you{"'"}re selling. Delivered how? What{"'"}s clean? I{"'"}d scroll past this.</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-xl font-medium">Kill bad ideas before you build them</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Before your team spends three months building a feature, ask a persona: Would you actually
                use this? What would confuse you? What feels unnecessary? Refine feature prioritization 
                and reduce expensive real-world testing loops.
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-6 border border-border">
              <p className="text-sm text-muted-foreground font-medium mb-3">Example conversation</p>
              <div className="space-y-3 text-sm">
                <p><span className="font-medium">You:</span> We{"'"}re thinking of adding social features—you could see what your friends bought.</p>
                <p><span className="font-medium">Persona:</span> I don{"'"}t want my friends knowing what I buy. That feels invasive. I{"'"}d probably turn it off immediately.</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-xl font-medium">End opinion-driven debates</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                When product, marketing, and design disagree about what customers want, bring in the persona.
                Everyone can consult the same customer. The conversation shifts from {'"'}I think{'"'} to 
                {'"'}let{"'"}s ask.{'"'}
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-6 border border-border">
              <p className="text-sm text-muted-foreground font-medium mb-3">Example conversation</p>
              <div className="space-y-3 text-sm">
                <p><span className="font-medium">Designer:</span> Should the checkout be one page or multi-step?</p>
                <p><span className="font-medium">Persona:</span> I prefer seeing everything at once. When it{"'"}s split into steps I worry there{"'"}s hidden fees coming.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
