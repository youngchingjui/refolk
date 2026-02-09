# Technical Requirements

**Last updated:** 2026-02-09

## What This Document Is

This document defines HOW we're building the product - the technical requirements, architecture decisions, and implementation approach.

**Always start with [User Requirements](../user/reqs.md) first** - tech serves user needs, not the other way around.

---

## Current Technical Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS v4, Radix UI / shadcn/ui
- **Runtime:** Bun
- **Deployment:** Vercel (auto-synced from v0.app)
- **Current State:** Static marketing landing page - no backend, no database, no auth, no real AI integration yet

---

## Technical Requirements (Phase 0 - Marketing Site)

### 1. Landing Page
- **Status:** In progress
- **Tech:** Next.js static site, Tailwind CSS
- **Requirements:**
  - Responsive design
  - Fast load times
  - SEO optimized
  - GitHub Issues: #1-4, #8

### 2. Payment Integration
- **Status:** Ready to implement
- **Tech:** Stripe Payment Links (no backend needed initially)
- **Documentation:** [Stripe Setup Guide](./stripe-setup.md)
- **Requirements:**
  - Two payment links (Starter $50/mo, Team $300/mo)
  - Environment variables for payment link URLs
  - Manual onboarding via email (for now)

---

## Technical Requirements (Future - Product)

### 3. Persona System (Core Product)
- **Status:** Not yet scoped
- **User Requirement:** [Pre-Built Persona Roster](../user/reqs.md#1-pre-built-persona-roster)
- **Technical Needs:**
  - Persona data storage (context, backstory, constraints, motivations)
  - AI integration for response generation
  - Consistency mechanism (persona maintains perspective)
  - Validation system (responses match persona context)

**To be detailed when we start building.**

### 4. Email Integration
- **Status:** Not yet scoped
- **User Requirement:** [Easy Interaction via Familiar Channels](../user/reqs.md#2-easy-interaction-via-familiar-channels)
- **Technical Needs:**
  - Inbound email handling (webhook or IMAP)
  - Email-to-persona routing
  - AI response generation as persona
  - Outbound email sending
  - Email accounts for each persona (e.g., maya@domain.com)

**To be detailed when we start building.**

### 5. Slack Integration
- **Status:** Not yet scoped
- **User Requirement:** [Easy Interaction via Familiar Channels](../user/reqs.md#2-easy-interaction-via-familiar-channels)
- **Technical Needs:**
  - Slack app/bot integration
  - Persona availability in channels
  - Real-time response generation
  - User authentication and authorization

**To be detailed when we start building.**

### 6. Subscription Management
- **Status:** Not yet scoped
- **User Requirement:** [Tiered Access to Personas](../user/reqs.md#3-tiered-access-to-personas)
- **Technical Needs:**
  - User accounts and authentication
  - Subscription tier tracking (Starter = 3 personas, Team = 50+)
  - Stripe webhooks for subscription events
  - Access control (which personas user can interact with)
  - Team/seat management

**To be detailed when we start building.**

---

## Detailed Technical Documentation

- **[Stripe Payment Integration](./stripe-setup.md)** - Payment links setup and configuration

More technical docs will be added here as we build.

---

## Technical Principles

### 1. Start Simple, Iterate
- Use managed services over custom infrastructure when possible
- Stripe Payment Links before custom billing system
- Manual onboarding before automated flows
- Validate with real users before scaling

### 2. User Requirements Drive Tech Decisions
- Every technical choice should serve a user requirement
- Don't build tech for tech's sake
- Reference user requirements in all tech specs

### 3. Optimize for Learning
- We're in validation phase - optimize for speed and learning
- Build minimum viable versions
- Instrument to understand user behavior
- Be willing to throw away and rebuild

---

## Notes

- This document will grow as we move from marketing site to product
- Each major feature should get its own detailed tech spec document
- All tech specs should reference the user requirements they're serving
- Track implementation tasks in GitHub Issues, not here
