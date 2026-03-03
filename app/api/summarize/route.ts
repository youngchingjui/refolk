import { generateText } from "ai"
import { NextRequest, NextResponse } from "next/server"
import { resolveModel, DEFAULT_MODEL } from "@/lib/ai-providers"

type PersonaResponse = {
  name: string
  text: string
}

export async function POST(req: NextRequest) {
  const {
    question,
    responses,
  }: { question: string; responses: PersonaResponse[] } = await req.json()

  const personaBlocks = responses
    .map((r) => `**${r.name}:** ${r.text}`)
    .join("\n\n")

  const prompt = `A user submitted the following for feedback:

"${question}"

Here are responses from ${responses.length} different people:

${personaBlocks}

Synthesize these perspectives into a brief summary. Identify:
- What they agree on
- Where they diverge
- The most actionable insight someone should take away

Write in plain prose, no headers or bullet points. Keep it under 150 words. Don't attribute every point — synthesize, don't list.`

  const { text } = await generateText({
    model: resolveModel(DEFAULT_MODEL),
    messages: [{ role: "user", content: prompt }],
    maxOutputTokens: 512,
  })

  return NextResponse.json({ summary: text })
}
