# Junmar Jose — AI-Native Portfolio Website

## Project Overview

An AI-native portfolio website positioning Junmar Jose as a Software Architect, Solutions Architect, Technical Lead, Scrum Master, and Senior Full Stack Developer. The site is a hybrid of editorial content (architecture decisions, case studies) with a role-based content filter and an AI-powered chat. It should feel like an interactive product, not a static resume.

**Core principle:** E-commerce is the proof, not the brand. The site should communicate: "This person can understand a messy business problem, design the system, lead the team, and still build the product."

## Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Animation:** Framer Motion
- **AI:** Anthropic Claude SDK (claude-sonnet-4-20250514)
- **Content:** MDX via next-mdx-remote + gray-matter
- **Theme:** next-themes (dark + light mode)
- **Fonts:** JetBrains Mono (headings/code) + Inter (body) via next/font
- **Hosting:** Vercel

## Commands

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run lint` — Run ESLint
- `npm run start` — Start production server

## Project Structure

```
app/                    → Next.js App Router pages and API routes
components/             → React components organized by feature
  layout/               → Navbar, Footer, PageContainer, MobileMenu
  home/                 → Homepage sections (Hero, ProofBar, HowIWork, etc.)
  case-studies/         → Case study cards and page layouts
  playbook/             → Architecture decision cards and filters
  ai-chat/              → Chat bubble, window, messages, input
  shared/               → Reusable components (RoleFilter, StackTag, Card, etc.)
  seo/                  → MetaTags, JsonLd
content/                → All content files
  case-studies/         → MDX files for case studies
  playbook/             → MDX files for architecture decisions
  ai-knowledge.json     → Structured data for AI system prompt
  experience.json       → Career timeline data
  tech-stack.json       → Categorized tech skills
lib/                    → Utilities and business logic
  ai/                   → Claude client, system prompt builder, rate limiter
  content/              → MDX parsing, case study helpers, playbook helpers
  roles.ts              → Role definitions and content ordering logic
hooks/                  → Custom React hooks (useRoleFilter, useChat)
public/                 → Static assets (diagrams, resume PDF, OG image)
docs/                   → IMPLEMENTATION.md and project documentation
```

## Design Rules

- **Dark mode is the default.** Light mode is also supported via next-themes toggle.
- **One accent color:** Blue (#3B82F6). No gradients, no rainbow colors.
- **Typography:** JetBrains Mono for headings, tags, and code. Inter for body text.
- **Cards use borders, not shadows.** Borders work better across both themes.
- **Animations are subtle.** Fade-in on scroll, smooth transitions. Nothing bouncing or spinning. Always respect `prefers-reduced-motion`.
- **No stock photos, no avatars, no emoji in the UI.** Use architecture diagrams, code snippets, and text.
- **Generous whitespace.** Let content breathe. Dense layouts signal junior work.

## Content Rules

- **Architecture decision titles are always questions.** "Why webhook over polling?" not "Webhook Architecture."
- **Case studies are outcome-first.** Lead with what was achieved, then explain how.
- **The AI chat never invents experience.** It only answers based on data in `content/ai-knowledge.json`. If the knowledge base doesn't cover a question, the AI should say so honestly.
- **E-commerce is proof, not identity.** It appears as one domain among several (SaaS, mobile), never as the primary label.
- **Quantify everything.** "Led a squad of 6 engineers" not "led a team."

## Component Conventions

- Use shadcn/ui components as the base. Only create custom components when shadcn doesn't cover the need.
- All components are TypeScript with explicit prop interfaces.
- Client components use `"use client"` directive. Keep server components as the default.
- Framer Motion animations go in the component that renders the animated element, not in a wrapper.

## AI Chat Rules

- Model: claude-sonnet-4-6
- System prompt is built from `content/ai-knowledge.json` in `lib/ai/system-prompt.ts`
- Rate limit: 20 messages per visitor session
- The AI speaks in first person ("I have experience with..."), representing Junmar directly
- Never fabricate projects, skills, or experience not in the knowledge base
- Politely redirect off-topic questions back to professional topics

## Role Filter System

Five roles: Software Architect, Solutions Architect, Technical Lead, Scrum Master, Senior Full Stack Developer. Selecting a role reorders homepage content (hero subtext, How I Work cards, case studies, architecture decisions). Selection persists in URL param `?role=software-architect` for shareable links.

## Key Files

- `docs/IMPLEMENTATION.md` — Step-by-step build checklist
- `.claude/plans/act-as-a-senior-zany-pascal.md` — Full product specification
- `content/ai-knowledge.json` — Source of truth for AI chat responses
- `lib/roles.ts` — Role definitions and content ordering logic
