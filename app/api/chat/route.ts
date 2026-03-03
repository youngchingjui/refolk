import { generateText } from "ai"
import type { ModelMessage, ImagePart, TextPart } from "ai"
import { readFileSync } from "fs"
import { join } from "path"
import { NextRequest, NextResponse } from "next/server"
import { resolveModel, DEFAULT_MODEL } from "@/lib/ai-providers"

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

/**
 * The demo page sends messages using Anthropic's native content-block format
 * (e.g. `{ type: "image", source: { type: "base64", media_type, data } }`).
 * This helper normalises those into the AI SDK's CoreMessage format so all
 * routes go through the unified gateway.
 */
function normaliseMessages(rawMessages: unknown[]): ModelMessage[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (rawMessages as any[]).map((m) => {
    if (typeof m.content === "string") {
      return { role: m.role, content: m.content } as ModelMessage
    }

    if (Array.isArray(m.content)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const content = m.content.map((block: any): ImagePart | TextPart => {
        // Anthropic SDK image block → AI SDK ImagePart
        if (block.type === "image" && block.source?.type === "base64") {
          return {
            type: "image",
            image: Buffer.from(block.source.data as string, "base64"),
            mediaType: block.source.media_type as string,
          }
        }
        // Text block (same shape in both SDKs)
        return { type: "text", text: block.text as string }
      })
      return { role: m.role, content } as ModelMessage
    }

    return m as ModelMessage
  })
}

export async function POST(req: NextRequest) {
  const { persona, model, messages } = await req.json()

  const systemPrompt = loadPersonaSystemPrompt(persona)
  const resolvedModel = resolveModel(model ?? DEFAULT_MODEL)

  const { text } = await generateText({
    model: resolvedModel,
    system: systemPrompt,
    messages: normaliseMessages(messages),
    maxOutputTokens: 1024,
  })

  // Preserve the response shape the demo page expects: { response: { text } }
  return NextResponse.json({ response: { text } })
}
