# Refolk Project - Claude Guidelines

## Understanding This Project

**Start here:** Read `docs/user/reqs.md` to understand what this app does, why it exists, and what problems it solves.

**For technical context:** Read `docs/tech/reqs.md` to understand how we're building it.

The user requirements are the source of truth for the product vision. Everything else flows from there.

## Development Workflow

All changes to the app follow this process:

### 1. User Requirements First

- **User requirements** define WHAT we're building and WHY (problems, goals, user needs)
- Start with `docs/user/reqs.md` - the master user requirements document
- As requirements grow, split detailed sections into separate files (e.g., `docs/user/personas.md`, `docs/user/integrations.md`)
- User requirements are reviewed and approved by the user before any technical work begins

**What belongs in requirements:**

- Product vision and goals
- User problems we're solving
- Feature descriptions (from user perspective)
- Use cases and scenarios
- What success looks like

**What does NOT belong in requirements:**

- ❌ Roadmaps or timelines (belongs in GitHub Issues/Projects)
- ❌ Marketing plans (belongs in separate marketing docs)
- ❌ Tactical/temporal tasks (belongs in GitHub Issues)
- ❌ Technical implementation details (belongs in tech specs)

### 2. Technical Requirements (When Needed)

- **Tech requirements** define HOW we'll build it (architecture, tech choices, implementation)
- Start with `docs/tech/reqs.md` - the master technical requirements document
- Tech always flows from and serves user requirements
- Create detailed tech specs in `docs/tech/` when needed (e.g., `docs/tech/stripe-setup.md`)
- All tech specs must reference the user requirements they're serving

### 3. Implementation

- Code changes are made only after requirements are approved
- Keep changes focused on what was specified in the requirements
- Technical decisions should serve the user requirements

### 4. User Feedback & Iteration

- The user will share general impressions, feelings, and reactions about the current app
- Capture these as they come up and convert to GitHub issues or update requirements
- Use feedback to inform future requirements and improvements
- Don't discard vague feelings — they often point to real UX or product issues worth solving

## Project Context

- **Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Radix UI / shadcn/ui
- **Runtime:** Bun (dev server: `bun run dev`)
- **Deployment:** Vercel (auto-synced from v0.app)

## Docs Structure

```markdown
docs/
user/
reqs.md # ← START HERE: Master user requirements (WHAT & WHY)
personas.md # Detailed persona requirements (as needed)
integrations.md # Integration requirements (as needed)

tech/
reqs.md # ← Tech starting point: Master tech requirements (HOW)
stripe-setup.md # Detailed: Stripe integration
architecture.md # Detailed: System architecture (when needed)

marketing/
value-prop.md # Product positioning & messaging
pricing-strategy.md # Pricing philosophy
cta-guidelines.md # CTA principles
how-it-works-rewrite.md # Issue #2 planning
```

**Temporal/task-based documents belong in GitHub:**

- Roadmaps → GitHub Projects
- Feature prioritization → GitHub Issues with labels/milestones
- Marketing tasks → GitHub Issues
- Implementation tasks → GitHub Issues

## Requirements Flow

```markdown
docs/user/reqs.md (WHAT & WHY)
↓
docs/tech/reqs.md (HOW)
↓
Implementation (CODE)
```

**Always start with user requirements.** Tech serves user needs, not the other way around.
