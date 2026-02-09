# Twins - User Requirements

**Last updated:** 2026-02-09

## What This Document Is

This document defines WHAT we're building and WHY - the user requirements that drive all technical and product decisions.

**Roadmaps, marketing plans, and tasks belong in GitHub Issues, not here.**

---

## Product Vision

### What It Is

A service that provides pre-built, curated digital customer personas that respond like real people. Users can interact with these personas to get feedback, test ideas, and validate decisions - without the cost, time, or risk of real user research.

### Why It Exists

**The Problem:**

- Teams make product and marketing decisions based on guesses, internal opinions, or expensive/slow user research
- Traditional personas are static documents that don't help you understand real reactions
- Real user research (focus groups, interviews) is expensive ($5K-$15K per round), slow (weeks), risky (brand exposure), and limited in scale

**The Solution:**

- Pre-built personas with deep context (motivations, constraints, team dynamics) that respond authentically
- Available 24/7, respond in seconds, no scheduling or recruiting
- Zero brand risk - test anything privately
- Fraction of the cost of traditional research

### What Makes It Different

**Not generic ChatGPT:** These aren't simple prompts. Each persona has:

- Rich internal context (boss, reports, motivations, past experiences, constraints)
- Consistent perspectives that persist across conversations
- Behavioral accuracy - they respond like real people in that segment would

**Pre-built, not DIY:** Users don't build personas. We've already done the hard work of researching, testing, and refining. Users just pick the personas they need and start asking questions.

---

## Core User Requirements

### 1. Pre-Built Persona Roster

**What:** A curated collection of realistic customer personas, already built and tested.

**Why:** The value is "we've done the work for you" - no setup, no prompt engineering, just start using.

**Requirements:**

- Each persona has deep internal context (job, motivations, constraints, team dynamics, past experiences)
- Personas respond consistently across conversations
- Responses feel authentic, not like generic AI
- Personas match real population segments (validated against real behavior)

**User Value:** Pick the perspectives you need and start getting feedback immediately.

### 2. Easy Interaction via Familiar Channels

**What:** Users can interact with personas through channels they already use (Slack, Email, etc.)

**Why:** Reduces friction. Don't make users learn a new tool - meet them where they work.

**Requirements:**

- Email integration: user emails persona, gets response
- Slack integration: personas available in Slack channels
- Responses feel natural in each channel
- No complex setup - just connect and start

**User Value:** Email Maya your deck. Ask Alex about your pricing page in Slack. Use your existing workflow.

### 3. Tiered Access to Personas

**What:** Different subscription tiers give access to different numbers of personas.

**Why:** Simple pricing model that scales with value. More perspectives = higher tier.

**Requirements:**

- **Starter:** Access to 3 curated personas
- **Team:** Access to 50+ curated personas
- **Enterprise:** Unlimited personas + custom persona development
- Unlimited conversations with your accessible personas
- Easy to understand which tier gives what

**User Value:** Clear, predictable pricing. Start small (3 personas) or go big (50+ personas).

### 4. Instant, Realistic Feedback

**What:** When users share ideas/content with a persona, they get realistic, nuanced feedback that reflects real human thinking.

**Why:** The whole point is to get useful feedback that helps make better decisions.

**Requirements:**

- Responses reflect the persona's context (motivations, constraints, pressures)
- Feedback is specific and actionable, not generic
- Personas can push back, express skepticism, ask clarifying questions
- Responses feel like talking to a real person in that role

**User Value:** Get real talk from realistic perspectives before you build the wrong thing or launch the wrong campaign.

---

## Use Cases

### Use Case 1: Test Messaging Before Launch

**User Need:** Know if marketing copy will resonate before spending on ads.

**How They Use It:**

1. Draft new landing page headline
2. Email it to Alex (tech-skeptical small business owner persona)
3. Get his reaction: "This sounds nice but I have no idea what you're selling..."
4. Revise based on feedback
5. Test revised version with multiple personas

**Success:** Launch with messaging that's been validated against realistic customer perspectives.

### Use Case 2: Validate Product Ideas

**User Need:** Know if a feature is worth building before spending engineering time.

**How They Use It:**

1. Describe new feature idea in Slack
2. Ask Maya (PM persona) and Sarah (budget-conscious founder persona) for their take
3. Maya: "I like it but my VP will ask about ROI..."
4. Sarah: "I wouldn't pay extra for this. What I need is better Slack integration."
5. Adjust roadmap based on feedback

**Success:** Build features customers actually want, skip the ones they don't.

### Use Case 3: End Internal Debates

**User Need:** Team disagrees about what customers want. Need objective input.

**How They Use It:**

1. Product, marketing, and design debating one-page vs multi-step checkout
2. Ask relevant persona
3. Persona: "I prefer seeing everything at once. Split steps make me worry about hidden fees."
4. Team aligns around real customer perspective

**Success:** Decisions based on customer perspective, not who argues loudest.

### Use Case 4: Get Second Opinion on Presentations

**User Need:** Want feedback on a deck before presenting to stakeholders.

**How They Use It:**

1. Email pitch deck to Maya (PM persona)
2. Maya reviews from her context: "Problem slide is compelling, but I don't see competitive moat. My VP will ask about that."
3. Add competitive positioning slide
4. Re-send for validation

**Success:** Present with confidence, having tested with a realistic audience.

---

## What Success Looks Like

### For Users

- "I can get useful feedback in minutes instead of weeks"
- "These personas respond like real people, not like generic AI"
- "I'm making better decisions because I'm testing ideas first"
- "This costs a fraction of what we used to spend on user research"

### For the Product

- Users interact with personas regularly (not one-and-done)
- Feedback from personas influences real product/marketing decisions
- Users can clearly articulate the difference vs ChatGPT or traditional personas
- Retention is high - users renew because they get ongoing value

---

## Out of Scope (For Now)

These are potential future features, not current requirements:

- **Custom persona building by users** - Team/Enterprise can request custom personas, but DIY persona building is not the core flow
- **Census/polling at scale** - Running surveys across hundreds of twins (future premium feature)
- **Analytics/reporting dashboard** - Tracking patterns across conversations
- **API access for developers** - Team tier and above (future)

---

## Notes

- Requirements will evolve based on real user feedback
- As requirements grow, detailed sections can be split into separate files under `docs/requirements/`
- Prioritization and roadmap live in GitHub Issues, not here
- Marketing plans live in separate docs or GitHub Issues
