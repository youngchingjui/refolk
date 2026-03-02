import Anthropic from "@anthropic-ai/sdk"
import { readFileSync } from "fs"
import { join } from "path"
import { NextRequest } from "next/server"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function loadPersonaSystemPrompt(personaSlug: string): string {
  const personasDir = join(process.cwd(), "personas")
  const backstory = readFileSync(
    join(personasDir, `${personaSlug}.md`),
    "utf-8"
  )
  const responseStyle = readFileSync(
    join(personasDir, "_response-style.md"),
    "utf-8"
  )
  return `${backstory}\n\n${responseStyle}`
}

export async function POST(req: NextRequest) {
  const { persona, messages } = await req.json()

  const systemPrompt = loadPersonaSystemPrompt(persona)

  const stream = client.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: systemPrompt,
    messages,
  })

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(event.delta.text))
        }
      }
      controller.close()
    },
    cancel() {
      stream.abort()
    },
  })

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
