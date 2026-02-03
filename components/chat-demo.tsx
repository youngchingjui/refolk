"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, ImageIcon, FileText, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const personas = [
  { id: "maya", name: "Maya Chen", avatar: "M" },
  { id: "marcus", name: "Marcus Johnson", avatar: "MJ" },
  { id: "linda", name: "Linda Okafor", avatar: "L" },
]

const conversations: Record<string, Array<{ role: "user" | "twin"; content: string; attachment?: string }>> = {
  maya: [
    { role: "user", content: "Hey Maya, we're thinking about adding an AI assistant to our product. It would help users write better reports. What's your initial reaction?" },
    { role: "twin", content: "Honestly? My first thought is 'here we go again.' We've tried two AI writing tools and both were useless. The output was so generic we had to rewrite everything anyway." },
    { role: "user", content: "What would make you actually try it?" },
    { role: "twin", content: "Show me it working on MY data, not some demo. Let me try it free for a month—not 14 days, that's not enough time to really test anything. And don't make me talk to sales to get the trial." },
    { role: "user", content: "What if we showed you case studies from similar companies?" },
    { role: "twin", content: "Case studies are fine but I've seen too many that are basically ads. What I actually want is to talk to a real customer. If you can connect me with a PM at a similar-stage company who's been using it for 6+ months, that's worth more than any case study." },
  ],
  marcus: [
    { role: "user", content: "Marcus, I want to show you a new email design for our product launch. Can you take a look?", attachment: "campaign-mockup.png" },
    { role: "twin", content: "Yeah, let me see... Okay, the design is clean but the headline 'Revolutionize Your Routine' doesn't tell me anything. What am I actually getting? I don't have time to figure it out." },
    { role: "user", content: "What would make you click?" },
    { role: "twin", content: "Tell me the specific thing. 'Face wash that doesn't leave white residue on dark skin' — that's a headline I'd click. I'm not looking for revolutionary, I'm looking for 'this person gets my actual problem.'" },
    { role: "user", content: "Would you forward this to a friend?" },
    { role: "twin", content: "Not this version. If it was more specific, maybe. But you know what would really make me forward it? If there was a referral discount. I'm watching my runway and so are my founder friends. 'Send to a friend, you both get 20%' — I'd do that." },
  ],
  linda: [
    { role: "user", content: "Linda, we're debating whether to launch a TikTok strategy. What's your take?" },
    { role: "twin", content: "My gut says our buyers aren't on TikTok. They're enterprise IT directors, mostly 40+. But I've been wrong before—I didn't think LinkedIn would work for us either and now it's our best channel." },
    { role: "user", content: "How would you make the case internally?" },
    { role: "twin", content: "I'd need data I can show the CFO. 'Competitor X is doing it' isn't enough. Give me: what's the reach to our ICP, what's the cost per thousand compared to our current channels, and what's a realistic timeline to see results. If it's 18 months before we know if it's working, that's a harder sell." },
    { role: "user", content: "What would the content even look like for B2B enterprise?" },
    { role: "twin", content: "That's the part I'm not sure about. Our brand is... serious. Professional. I don't know if that translates. But maybe that's the opportunity? If everyone else in our space is doing boring whitepapers and we're doing something human, maybe that stands out. I'd want to test it small before committing real budget." },
  ],
}

export function ChatDemo() {
  const [selectedPersona, setSelectedPersona] = useState("maya")
  const [inputValue, setInputValue] = useState("")
  const [visibleMessages, setVisibleMessages] = useState(2)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentConversation = conversations[selectedPersona]

  useEffect(() => {
    setVisibleMessages(2)
  }, [selectedPersona])

  const handleSendDemo = () => {
    if (visibleMessages < currentConversation.length) {
      setVisibleMessages(prev => Math.min(prev + 2, currentConversation.length))
    }
    setInputValue("")
  }

  return (
    <section className="py-20 md:py-32 px-6 bg-card border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Try it yourself
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-medium tracking-tight text-balance">
            A conversation, not a survey
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Upload documents, images, or campaign mockups. The twin responds in character—with 
            the hesitations, skepticism, and enthusiasm of a real person with their specific history.
          </p>
        </div>

        <div className="mt-12 border border-border rounded-lg bg-background overflow-hidden max-w-3xl">
          {/* Persona selector */}
          <div className="border-b border-border p-4 flex gap-2 overflow-x-auto">
            {personas.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPersona(p.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors min-h-[44px]",
                  selectedPersona === p.id 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted hover:bg-muted/80 text-foreground"
                )}
              >
                <span className="w-6 h-6 rounded-full bg-background/20 flex items-center justify-center text-xs">
                  {p.avatar}
                </span>
                {p.name}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="p-4 space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto">
            {currentConversation.slice(0, visibleMessages).map((msg, i) => (
              <div 
                key={i}
                className={cn(
                  "flex gap-3",
                  msg.role === "user" && "flex-row-reverse"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0",
                  msg.role === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-foreground"
                )}>
                  {msg.role === "user" ? "You" : personas.find(p => p.id === selectedPersona)?.avatar}
                </div>
                <div className={cn(
                  "rounded-2xl px-4 py-3 max-w-[85%]",
                  msg.role === "user" 
                    ? "bg-primary text-primary-foreground rounded-tr-sm" 
                    : "bg-muted text-foreground rounded-tl-sm"
                )}>
                  {msg.attachment && (
                    <div className="mb-2 flex items-center gap-2 text-xs opacity-70">
                      <ImageIcon className="w-3 h-3" />
                      {msg.attachment}
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
            
            {visibleMessages < currentConversation.length && (
              <div className="text-center pt-4">
                <button 
                  onClick={() => setVisibleMessages(prev => Math.min(prev + 2, currentConversation.length))}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Continue conversation...
                </button>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center" title="Attach file">
                  <Paperclip className="w-5 h-5" />
                </button>
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center" title="Upload image">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center relative" title="Upload video">
                  <Video className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 text-[10px] bg-muted text-muted-foreground px-1 rounded">soon</span>
                </button>
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendDemo()}
                placeholder="Ask the twin anything..."
                className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground min-h-[44px]"
              />
              <Button 
                size="icon" 
                onClick={handleSendDemo}
                className="shrink-0 min-h-[44px] min-w-[44px]"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Upload PDFs, images, or paste URLs. Twins can review landing pages, ads, decks, and product mockups.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
