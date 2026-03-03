import { anthropic } from "@ai-sdk/anthropic"
import { openai } from "@ai-sdk/openai"
import type { LanguageModel } from "ai"

/**
 * Resolves a "provider/model-id" string into a Vercel AI SDK LanguageModel.
 *
 * Supported formats:
 *   "anthropic/claude-sonnet-4-6"
 *   "openai/gpt-4o"
 */
export function resolveModel(modelString: string): LanguageModel {
  const slashIndex = modelString.indexOf("/")
  if (slashIndex === -1) {
    throw new Error(
      `Invalid model format: "${modelString}". Expected "provider/model-id".`
    )
  }
  const provider = modelString.slice(0, slashIndex)
  const modelId = modelString.slice(slashIndex + 1)

  switch (provider) {
    case "anthropic":
      return anthropic(modelId)
    case "openai":
      return openai(modelId)
    default:
      throw new Error(`Unknown provider: "${provider}"`)
  }
}

/** Fallback model used when a route doesn't receive a model from the client. */
export const DEFAULT_MODEL = "anthropic/claude-sonnet-4-6"
