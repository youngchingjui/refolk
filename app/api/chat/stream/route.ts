import { streamText } from "ai"
import { readFileSync } from "fs"
import { join } from "path"
import { NextRequest } from "next/server"
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

export async function POST(req: NextRequest) {
  const { persona, model, messages } = await req.json()

  const systemPrompt = loadPersonaSystemPrompt(persona)
  const resolvedModel = resolveModel(model ?? DEFAULT_MODEL)

  const result = streamText({
    model: resolvedModel,
    system: systemPrompt,
    messages,
    maxOutputTokens: 1024,
  })

  return result.toTextStreamResponse()
}
