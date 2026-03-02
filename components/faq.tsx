"use client"

import * as Accordion from "@radix-ui/react-accordion"
import { Plus } from "lucide-react"

const faqs = [
  {
    id: "chatgpt",
    question: "Can't I just do this with my own system prompts in ChatGPT?",
    answer:
      "You could try, but you'd be starting from scratch on every persona. To replicate even one Refolk persona, you'd need to research how people in that role actually behave, write detailed background on their boss, their budget constraints, their past experiences with vendors, and their motivations—then prompt-engineer it until it holds together. Most teams don't have the time or expertise to do that well. We've already done that work. Our personas are pre-built, tested against realistic behavior, and consistent across conversations. You just pick the ones you need and start asking questions.",
  },
  {
    id: "roleplay",
    question: "How is this different from asking AI to roleplay?",
    answer:
      "Generic roleplay prompts are shallow and drift. Ask ChatGPT to 'act like a skeptical procurement manager' and it'll give you a caricature that forgets its own position after a few exchanges. Refolk personas carry stable internal context: a specific job, a boss with particular priorities, past experiences with products like yours, budget constraints, and consistent opinions. They remember they turned down a vendor last quarter. They get annoyed by the same things twice. That consistency is what makes feedback actually useful.",
  },
  {
    id: "accuracy",
    question: "How accurate are the personas?",
    answer:
      "Our personas are built from research into how people in specific roles actually behave—not from demographic stereotypes. We study real decision-making patterns, common constraints, typical team dynamics, and the motivations that drive people in those positions. That said, they're directional signals, not scientific surveys. Use them to stress-test your assumptions, surface blind spots, and hear pushback before you build or launch. They're best treated as a rigorous thought partner, not a substitute for any real human validation you need.",
  },
  {
    id: "who",
    question: "What kind of businesses use this?",
    answer:
      "Mostly product teams, marketers, and founders who need to test ideas before they spend money on them. Product managers use personas to pressure-test feature ideas before writing a spec. Marketing teams use them to get gut-check reactions on copy before running ads. Founders use them to sharpen pitches and validate positioning. Agencies use them to validate concepts for clients without expensive research rounds. If you make decisions that depend on how a specific type of person would react—and you can't easily get those people in a room—Refolk is useful.",
  },
  {
    id: "how-built",
    question: "How do you build the personas?",
    answer:
      "We start with a real archetype: a specific role, industry, and context. Then we research how people in that role actually think—what they're responsible for, who they answer to, what pressures they're under, what's gone wrong before, and what makes them say yes or no. From that research, we write a rich narrative that gives the persona consistent motivations, constraints, and opinions. Then we test it: we give it hard questions and edge cases until it responds the way a real person in that role would. Enterprise customers can also request custom personas built around their specific target segments.",
  },
]

export function FAQ() {
  return (
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            FAQ
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-medium tracking-tight text-balance">
            Common questions
          </h2>
        </div>

        <Accordion.Root
          type="single"
          collapsible
          className="mt-12 divide-y divide-border"
        >
          {faqs.map((faq) => (
            <Accordion.Item key={faq.id} value={faq.id} className="py-6">
              <Accordion.Trigger className="group flex w-full items-start justify-between gap-6 text-left">
                <span className="text-base font-medium leading-snug group-data-[state=open]:text-foreground text-foreground">
                  {faq.question}
                </span>
                <Plus className="w-5 h-5 shrink-0 mt-0.5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-45" />
              </Accordion.Trigger>
              <Accordion.Content className="overflow-hidden">
                <p className="pt-4 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}
