import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Personas } from "@/components/personas"
import { ChatDemo } from "@/components/chat-demo"
import { HowItWorks } from "@/components/how-it-works"
import { Integrations } from "@/components/integrations"
import { Difference } from "@/components/difference"
import { Pricing } from "@/components/pricing"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Personas />
      <ChatDemo />
      <HowItWorks />
      <Integrations />
      <Difference />
      <Pricing />
      <Footer />
    </main>
  )
}
