"use client"

import { useState, useRef, useCallback } from "react"

const PERSONAS = [
  {
    slug: "sophie-chen",
    name: "Sophie Chen",
    age: 28,
    location: "San Diego, CA",
    occupation: "Pharmacist",
    color: "bg-violet-900/40 border-violet-700/50",
    avatarColor: "bg-violet-800",
    tagColor: "text-violet-400",
    facts: [
      "Analytical but leads with gut",
      "Skeptical of over-designed things",
      "Low-drama, takes time to open up",
      "Direct without being harsh",
    ],
  },
  {
    slug: "marcus-hayes",
    name: "Marcus Hayes",
    age: 38,
    location: "Brooklyn, NY",
    occupation: "Startup founder (2nd company)",
    color: "bg-amber-900/40 border-amber-700/50",
    avatarColor: "bg-amber-800",
    tagColor: "text-amber-400",
    facts: [
      "Ex-founder, one exit",
      "Bullshit detector is well-calibrated",
      "Cares about problem, model, distribution",
      "Allergic to jargon",
    ],
  },
  {
    slug: "priya-sharma",
    name: "Priya Sharma",
    age: 44,
    location: "Chicago, IL",
    occupation: "VP of Marketing",
    color: "bg-emerald-900/40 border-emerald-700/50",
    avatarColor: "bg-emerald-800",
    tagColor: "text-emerald-400",
    facts: [
      "15 years B2B marketing",
      "Empirical — runs tests, checks data",
      "Converts-or-doesn't thinker",
      "Skeptical of vendor pitches",
    ],
  },
]

type PersonaState = {
  slug: string
  text: string
  loading: boolean
  done: boolean
  error: string | null
}

function makeInitialPersonaStates(): PersonaState[] {
  return PERSONAS.map((p) => ({
    slug: p.slug,
    text: "",
    loading: false,
    done: false,
    error: null,
  }))
}

function TypingIndicator() {
  return (
    <div className="flex gap-1 py-1">
      <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0ms]" />
      <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:150ms]" />
      <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:300ms]" />
    </div>
  )
}

export default function PanelPage() {
  const [question, setQuestion] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [personaStates, setPersonaStates] = useState<PersonaState[]>(
    makeInitialPersonaStates()
  )
  const [summary, setSummary] = useState("")
  const [summaryLoading, setSummaryLoading] = useState(false)

  // We accumulate text outside of state for use in summary generation
  const accumulated = useRef<string[]>(PERSONAS.map(() => ""))

  const allDone = personaStates.every((p) => p.done || p.error)
  const anyLoading = personaStates.some((p) => p.loading)

  const handleSubmit = useCallback(async () => {
    const q = question.trim()
    if (!q) return

    // Reset everything
    accumulated.current = PERSONAS.map(() => "")
    setPersonaStates(makeInitialPersonaStates().map((p) => ({ ...p, loading: true })))
    setSummary("")
    setSummaryLoading(false)
    setSubmitted(true)

    const messages = [{ role: "user" as const, content: q }]

    const promises = PERSONAS.map(async (persona, idx) => {
      try {
        const res = await fetch("/api/chat/stream", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ persona: persona.slug, messages }),
        })

        if (!res.ok || !res.body) {
          throw new Error(`Request failed: ${res.status}`)
        }

        const reader = res.body.getReader()
        const decoder = new TextDecoder()

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          accumulated.current[idx] += chunk
          setPersonaStates((prev) =>
            prev.map((p, i) =>
              i === idx ? { ...p, text: p.text + chunk } : p
            )
          )
        }

        setPersonaStates((prev) =>
          prev.map((p, i) =>
            i === idx ? { ...p, loading: false, done: true } : p
          )
        )
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Something went wrong"
        setPersonaStates((prev) =>
          prev.map((p, i) =>
            i === idx ? { ...p, loading: false, done: true, error: msg } : p
          )
        )
      }
    })

    await Promise.all(promises)

    // Generate summary
    const responses = PERSONAS.map((p, i) => ({
      name: p.name,
      text: accumulated.current[i],
    })).filter((r) => r.text.trim())

    if (responses.length > 1) {
      setSummaryLoading(true)
      try {
        const res = await fetch("/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: q, responses }),
        })
        const data = await res.json()
        setSummary(data.summary || "")
      } catch {
        // summary is optional — just skip it
      } finally {
        setSummaryLoading(false)
      }
    }
  }, [question])

  function handleReset() {
    setQuestion("")
    setSubmitted(false)
    setPersonaStates(makeInitialPersonaStates())
    setSummary("")
    setSummaryLoading(false)
    accumulated.current = PERSONAS.map(() => "")
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <a href="/" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
            ← refolk
          </a>
          <span className="text-zinc-700">/</span>
          <span className="text-sm text-zinc-300">Panel</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-600">
            {PERSONAS.length} personas
          </span>
        </div>
      </header>

      {/* Persona overview strip (collapsed when submitted) */}
      {!submitted && (
        <div className="border-b border-zinc-800 px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PERSONAS.map((p) => (
            <div
              key={p.slug}
              className={`rounded-xl border p-4 ${p.color}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-9 h-9 rounded-full ${p.avatarColor} flex items-center justify-center text-sm font-semibold text-white shrink-0`}
                >
                  {p.name[0]}
                </div>
                <div>
                  <p className="font-medium text-sm text-white">{p.name}</p>
                  <p className={`text-xs ${p.tagColor}`}>
                    {p.age} · {p.location}
                  </p>
                </div>
              </div>
              <p className="text-xs text-zinc-400 mb-2">{p.occupation}</p>
              <ul className="space-y-1">
                {p.facts.map((f, i) => (
                  <li key={i} className="text-xs text-zinc-500 flex gap-1.5">
                    <span className="text-zinc-700 mt-0.5 shrink-0">—</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Compact persona strip when submitted */}
      {submitted && (
        <div className="border-b border-zinc-800 px-6 py-2 flex items-center gap-4 shrink-0">
          {PERSONAS.map((p, i) => (
            <div key={p.slug} className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full ${p.avatarColor} flex items-center justify-center text-xs font-semibold text-white`}
              >
                {p.name[0]}
              </div>
              <span className="text-xs text-zinc-400">{p.name.split(" ")[0]}</span>
              {personaStates[i].loading && (
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse" />
              )}
              {personaStates[i].done && !personaStates[i].error && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              )}
              {personaStates[i].error && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              )}
            </div>
          ))}
          <button
            onClick={handleReset}
            className="ml-auto text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            New question
          </button>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Input area */}
        {!submitted ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
            <div className="w-full max-w-2xl">
              <h1 className="text-2xl font-semibold text-white mb-2 text-center">
                Ask the panel
              </h1>
              <p className="text-sm text-zinc-500 text-center mb-8">
                Share an idea, piece of content, or question. All three personas
                respond simultaneously.
              </p>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault()
                    handleSubmit()
                  }
                }}
                placeholder="What do you think of this landing page headline: 'Stop guessing what customers want'"
                rows={5}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 resize-none outline-none focus:ring-1 focus:ring-zinc-600"
                autoFocus
              />
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-zinc-600">
                  ⌘ + Enter to submit
                </p>
                <button
                  onClick={handleSubmit}
                  disabled={!question.trim()}
                  className="px-5 py-2 bg-white text-zinc-900 text-sm font-medium rounded-lg hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Ask all three →
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Responses */
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {/* Question recap */}
            <div className="max-w-5xl mx-auto mb-6">
              <p className="text-xs text-zinc-600 uppercase tracking-widest mb-2">
                Your question
              </p>
              <p className="text-sm text-zinc-300 bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 whitespace-pre-wrap">
                {question}
              </p>
            </div>

            {/* Persona response cards */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              {PERSONAS.map((persona, idx) => {
                const state = personaStates[idx]
                return (
                  <div
                    key={persona.slug}
                    className={`rounded-xl border flex flex-col ${persona.color}`}
                  >
                    {/* Card header */}
                    <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/5">
                      <div
                        className={`w-7 h-7 rounded-full ${persona.avatarColor} flex items-center justify-center text-xs font-semibold text-white shrink-0`}
                      >
                        {persona.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {persona.name}
                        </p>
                        <p className={`text-xs ${persona.tagColor} truncate`}>
                          {persona.occupation}
                        </p>
                      </div>
                      {state.loading && (
                        <span className="text-xs text-zinc-600">typing</span>
                      )}
                      {state.done && !state.error && (
                        <span className="text-xs text-zinc-600">done</span>
                      )}
                    </div>

                    {/* Card body */}
                    <div className="px-4 py-3 flex-1 min-h-[160px]">
                      {state.error ? (
                        <p className="text-xs text-red-400">{state.error}</p>
                      ) : state.text ? (
                        <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap">
                          {state.text}
                          {state.loading && (
                            <span className="inline-block w-0.5 h-4 bg-zinc-500 ml-0.5 animate-pulse align-text-bottom" />
                          )}
                        </p>
                      ) : state.loading ? (
                        <TypingIndicator />
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Summary */}
            {(summaryLoading || summary) && (
              <div className="max-w-5xl mx-auto">
                <div className="rounded-xl border border-zinc-700/50 bg-zinc-900/60">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
                    <div className="w-5 h-5 rounded-full bg-zinc-700 flex items-center justify-center">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="text-zinc-400"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                    </div>
                    <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                      Panel summary
                    </p>
                  </div>
                  <div className="px-4 py-4">
                    {summaryLoading ? (
                      <TypingIndicator />
                    ) : (
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        {summary}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Wait message before summary */}
            {anyLoading && !summaryLoading && !summary && (
              <div className="max-w-5xl mx-auto">
                <p className="text-xs text-zinc-700 text-center">
                  Summary will appear when everyone has responded
                </p>
              </div>
            )}

            {/* New question button at bottom */}
            {allDone && !summaryLoading && (
              <div className="max-w-5xl mx-auto mt-8 flex justify-center">
                <button
                  onClick={handleReset}
                  className="px-5 py-2 border border-zinc-700 text-zinc-400 text-sm rounded-lg hover:border-zinc-600 hover:text-zinc-300 transition-colors"
                >
                  Ask another question
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
