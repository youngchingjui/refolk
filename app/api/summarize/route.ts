import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

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

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 512,
    messages: [{ role: "user", content: prompt }],
  })

  const summary =
    response.content[0].type === "text" ? response.content[0].text : ""

  return NextResponse.json({ summary })
}
