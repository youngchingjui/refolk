export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 px-6 bg-card border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            How it works
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-medium tracking-tight text-balance">
            More than a persona. A person.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Traditional personas are flat documents. Ours are coherent individuals with a history,
            values, anxieties, and decision-making patterns that persist across every interaction.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
              1
            </div>
            <h3 className="text-lg font-medium">Define the identity</h3>
            <p className="text-muted-foreground leading-relaxed">
              Name, age, location, job, family structure. The basics that anchor every decision 
              they{"'"}ll make. But this is just the foundation.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
              2
            </div>
            <h3 className="text-lg font-medium">Build the backstory</h3>
            <p className="text-muted-foreground leading-relaxed">
              Childhood context. Formative experiences. Career trajectory. Relationship history. 
              This is what gives the persona psychological realism—the texture that makes responses feel human.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
              3
            </div>
            <h3 className="text-lg font-medium">Layer in values and patterns</h3>
            <p className="text-muted-foreground leading-relaxed">
              What do they care about deeply? What are they cynical about? How do they shop? 
              What triggers impulse versus hesitation? These behavioral patterns shape every response.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
              4
            </div>
            <h3 className="text-lg font-medium">Set contextual states</h3>
            <p className="text-muted-foreground leading-relaxed">
              Toggle mood, time pressure, financial stress, or social influence. Ask how they{"'"}d 
              react to your ad after a long workday. Or when money is tight this month.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
              5
            </div>
            <h3 className="text-lg font-medium">Start the conversation</h3>
            <p className="text-muted-foreground leading-relaxed">
              Show them ads, taglines, landing pages. Pitch features. Test tone. Get immediate 
              qualitative feedback, emotional reactions, and objections phrased in human language.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
              6
            </div>
            <h3 className="text-lg font-medium">Iterate without cost</h3>
            <p className="text-muted-foreground leading-relaxed">
              Run the same test with different personas. Change variables. They{"'"}re available
              24/7, respond in seconds, and never get tired of your questions.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
