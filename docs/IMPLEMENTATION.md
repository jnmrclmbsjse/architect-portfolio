# Implementation Guide — Junmar Jose Portfolio

Step-by-step checklist for building the AI-native portfolio website.
Follow in order. Each phase builds on the previous one.

**Prerequisites:** Content files must be prepared before starting Phase 2.
See [Content Checklist](#phase-1-content-preparation) below.

**Reference:** Full product spec at `/.claude/plans/act-as-a-senior-zany-pascal.md`

---

## Phase 0: Project Setup

### 0.1 — Initialize Project
- [ ] Create Next.js 15 project with App Router and TypeScript
  ```bash
  npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
  ```
- [ ] Verify project runs: `npm run dev` → localhost:3000 shows default page

### 0.2 — Install Core Dependencies
- [ ] Install UI and animation libraries:
  ```bash
  npx shadcn@latest init
  npm install framer-motion next-themes
  ```
- [ ] Install AI SDK:
  ```bash
  npm install @anthropic-ai/sdk
  ```
- [ ] Install content processing:
  ```bash
  npm install next-mdx-remote gray-matter reading-time
  ```
- [ ] Install dev utilities:
  ```bash
  npm install -D @types/node
  ```

### 0.3 — Configure Design Tokens
- [ ] Set up `globals.css` with CSS variables for dark and light mode:
  - Dark: background `#0A0A0B`, surface `#141415`, border `#2A2A2D`, text `#FAFAFA` / `#A1A1AA`
  - Light: background `#FFFFFF`, surface `#F4F4F5`, border `#E4E4E7`, text `#09090B` / `#71717A`
  - Shared: accent `#3B82F6`, accent-hover `#60A5FA`, success `#10B981`
- [ ] Configure `tailwind.config.ts` to extend theme with custom colors referencing CSS variables
- [ ] Set up `next-themes` ThemeProvider in root `layout.tsx`
- [ ] Add fonts via `next/font`: JetBrains Mono (headings, code) + Inter (body)

### 0.4 — Create Folder Structure
- [ ] Create all directories:
  ```
  components/{layout,home,case-studies,playbook,ai-chat,shared,seo}
  content/{case-studies,playbook}
  lib/{ai,content}
  hooks/
  public/{diagrams}
  docs/
  ```
- [ ] Create `.env.local` with placeholder: `ANTHROPIC_API_KEY=your-key-here`

### 0.5 — Install shadcn/ui Components
- [ ] Add components needed for MVP:
  ```bash
  npx shadcn@latest add button card badge dropdown-menu sheet separator input
  ```

**Done when:** `npm run dev` works, dark/light theme toggles, fonts load correctly, folder structure exists.

---

## Phase 1: Content Preparation

> **This phase happens in a dedicated content session with Junmar.**
> Junmar shares his CV. Together we produce all content files in the exact formats the components expect.

### 1.1 — Experience & Career Data
- [ ] Create `content/experience.json` — career timeline: companies, roles, dates, highlights, stack, team sizes
- [ ] Create `content/tech-stack.json` — categorized skills: backend, frontend, mobile, infrastructure, database, integration. Each with years and confidence level.
- [ ] Finalize proof bar numbers (exact, defensible numbers for: years, platforms integrated, teams led, products shipped)

### 1.2 — Case Study Drafts
- [ ] Write `content/case-studies/development-methodology-transformation.mdx` — **PRIORITY #1**
  - Frontmatter: slug, title, subtitle, roles, stack, domain, featured, order-per-role
  - Sections: Problem, Constraints, My Role, Approach, Key Decisions, Outcome, Reflection
- [ ] Write `content/case-studies/multi-platform-integration-engine.mdx`
- [ ] Write `content/case-studies/ai-driven-saas-platform.mdx`
- [ ] Write `content/case-studies/offline-first-crm.mdx`

### 1.3 — Architecture Decision Drafts
- [ ] Write 5-7 architecture decisions in `content/playbook/`:
  - [ ] `webhook-vs-polling.mdx`
  - [ ] `queue-design-for-reliability.mdx`
  - [ ] `multi-tenant-data-isolation.mdx`
  - [ ] `api-rate-limit-strategy.mdx`
  - [ ] `monolith-vs-microservices.mdx`
  - [ ] (additional based on CV review)
- [ ] Each follows format: title (question), category, context, decision, consequences (positive/negative/neutral)

### 1.4 — AI Knowledge Base
- [ ] Create `content/ai-knowledge.json` with structured data:
  - personal info (name, location, availability, languages spoken)
  - experience array (from experience.json, enriched with narrative)
  - projects array (name, problem, solution, outcome, stack, role)
  - technical opinions (topic, position, reasoning)
  - leadership philosophy (style, team sizes, methodologies)
  - architecture decisions (summary versions of the playbook entries)

### 1.5 — Static Assets
- [ ] Prepare `public/resume.pdf` — current resume
- [ ] Create placeholder architecture diagrams (can be simple boxes + arrows)
- [ ] Write 3 "How I Work" descriptions: Architect, Lead, Build (2-3 sentences each)

**Done when:** All content files exist in `/content/`, all can be parsed as valid JSON/MDX, AI knowledge base covers all areas a recruiter might ask about.

---

## Phase 2: Layout & Navigation

### 2.1 — Root Layout
- [ ] Create `app/layout.tsx`:
  - ThemeProvider (next-themes) wrapping children
  - Font declarations (JetBrains Mono + Inter)
  - Navbar + Footer rendered on all pages
  - AI Chat provider wrapping children
- [ ] Create `components/layout/PageContainer.tsx` — max-w-7xl centered wrapper with padding

### 2.2 — Navbar
- [ ] Create `components/layout/Navbar.tsx`:
  - Logo/name (left) — links to home
  - Nav links: Playbook, Case Studies, About, Contact
  - Role filter dropdown (right area)
  - Theme toggle button (sun/moon icon)
  - AI Chat trigger button
  - Sticky on scroll
- [ ] Create `components/layout/MobileMenu.tsx`:
  - Sheet/drawer component for mobile nav
  - Same links as desktop
  - Role filter included

### 2.3 — Footer
- [ ] Create `components/layout/Footer.tsx`:
  - CTA text: "Let's build something together"
  - Contact links: Email, LinkedIn, GitHub
  - Download resume link
  - Copyright line

### 2.4 — Role Filter System
- [ ] Create `hooks/useRoleFilter.ts`:
  - State: selected role (or null for "all")
  - Sync with URL param `?role=software-architect`
  - Export: selectedRole, setRole, isFiltered
- [ ] Create `components/shared/RoleFilter.tsx`:
  - Dropdown with 5 role options + "All" default
  - Used in both Navbar and HeroSection
- [ ] Create `lib/roles.ts`:
  - Role definitions with labels, descriptions, content ordering rules
  - Helper: `getContentOrder(role, items)` — returns items sorted for selected role

**Done when:** All pages share consistent layout, navbar is sticky and responsive, role filter syncs with URL, theme toggle works.

---

## Phase 3: Homepage

### 3.1 — Hero Section
- [ ] Create `components/home/HeroSection.tsx`:
  - Tagline: "I design systems, lead teams, and build full-stack products from idea to production."
  - Role selector embedded: "I'm looking for a: [dropdown]"
  - Adaptive subtext that changes based on selected role
  - Fade-in animation on load (Framer Motion)

### 3.2 — Proof Bar
- [ ] Create `components/home/ProofBar.tsx`:
  - Stats row: years, platforms, teams led, products shipped
  - Domain tags: SaaS, E-commerce (or as determined from CV)
  - Animated counter on scroll into view (Framer Motion)
  - Read data from `content/experience.json`

### 3.3 — How I Work
- [ ] Create `components/home/HowIWork.tsx` — 3-column grid container
- [ ] Create `components/home/HowIWorkCard.tsx` — individual card:
  - Icon + title (Architect / Lead / Build)
  - 2-3 sentence description
  - Reorders based on selected role

### 3.4 — Featured Case Studies
- [ ] Create `components/shared/Card.tsx` — base card with border styling
- [ ] Create `components/case-studies/CaseStudyCard.tsx`:
  - Title, subtitle (one-line outcome), stack tags, role tag
  - Links to full case study page
- [ ] Create `components/home/FeaturedCaseStudies.tsx`:
  - Grid of 3-4 CaseStudyCards
  - Filters/reorders based on selected role
  - Section heading: "Selected Work"

### 3.5 — Playbook Preview
- [ ] Create `components/home/PlaybookPreview.tsx`:
  - 3 architecture decision cards (preview mode — title + category only)
  - Section heading: "How I Think About Complex Problems"
  - "View all decisions →" link to /playbook
  - Cards reorder based on selected role

### 3.6 — Tech Stack Section
- [ ] Create `components/home/TechStackSection.tsx`:
  - Grouped by domain: Backend, Frontend & Mobile, Infrastructure, Integrations, Databases
  - Each tool shows name + confidence badge (expert/proficient/familiar)
  - Read from `content/tech-stack.json`
- [ ] Create `components/shared/StackTag.tsx` — styled tech pill/badge

### 3.7 — Homepage Assembly
- [ ] Create `app/page.tsx` — compose all homepage sections in order
- [ ] Add Framer Motion staggered fade-in animations for sections
- [ ] Test role filter: select each role → verify content reorders meaningfully
- [ ] Test responsive: mobile, tablet, desktop

**Done when:** Homepage renders all sections, role filter changes content order, animations are smooth, responsive on all breakpoints.

---

## Phase 4: Content Pages

### 4.1 — MDX Infrastructure
- [ ] Create `lib/content/mdx.ts` — shared MDX configuration and rendering
- [ ] Create `lib/content/case-studies.ts`:
  - `getAllCaseStudies()` — reads all MDX files, returns sorted metadata
  - `getCaseStudy(slug)` — reads single MDX file, returns content + metadata
- [ ] Create `lib/content/playbook.ts`:
  - `getAllDecisions()` — reads all playbook MDX files
  - `getDecision(slug)` — reads single decision
  - `getDecisionsByCategory(category)` — filtered list

### 4.2 — Case Studies Listing
- [ ] Create `app/case-studies/page.tsx`:
  - Grid of CaseStudyCards
  - Optional: filter by domain or role
  - Section heading + intro text

### 4.3 — Individual Case Study Pages
- [ ] Create `app/case-studies/[slug]/page.tsx`:
  - Renders MDX content with custom components
  - Architecture diagram (static image/SVG)
  - Decision links that point to /playbook entries
  - Stack tags at bottom
  - Next/prev navigation between case studies
- [ ] Create `components/case-studies/CaseStudyLayout.tsx` — page layout wrapper
- [ ] Create `components/case-studies/ArchitectureDiagram.tsx` — image with caption
- [ ] Create `components/case-studies/DecisionLink.tsx` — styled link to related decision
- [ ] Generate static params for all case study slugs (SSG)

### 4.4 — Playbook Page
- [ ] Create `app/playbook/page.tsx`:
  - Grid of expandable decision cards
  - Category filter: System Design | Team Process | Integration Strategy | Stack Choices
  - Section heading: "The Playbook — How I Make Technical Decisions"
- [ ] Create `components/playbook/DecisionCard.tsx`:
  - Collapsed: question title + category tag
  - Expanded: full context, decision, consequences
  - Smooth expand/collapse animation
- [ ] Create `components/playbook/DecisionFilter.tsx`:
  - Horizontal filter buttons by category
  - "All" default

### 4.5 — About Page
- [ ] Create `app/about/page.tsx`:
  - Career narrative (2-3 paragraphs — not a resume dump)
  - Career timeline (visual, from experience.json)
  - Leadership philosophy section
  - Download resume button
  - Links to LinkedIn, GitHub

### 4.6 — Contact Page
- [ ] Create `app/contact/page.tsx`:
  - Contact links: email, LinkedIn, GitHub
  - Availability status indicator ("Available for full-time / contract / freelance")
  - Brief CTA text

**Done when:** All pages render correctly, MDX content displays properly, navigation between pages works, all content is accessible.

---

## Phase 5: AI Chat

### 5.1 — Backend
- [ ] Create `lib/ai/client.ts` — Anthropic SDK client initialization
- [ ] Create `lib/ai/system-prompt.ts`:
  - Loads `content/ai-knowledge.json`
  - Constructs system prompt with personality, rules, and knowledge base
  - Rules: never invent experience, always reference real projects, stay on-brand
- [ ] Create `lib/ai/rate-limiter.ts`:
  - In-memory rate limiting (20 messages per session)
  - Uses IP or session identifier
- [ ] Create `app/api/chat/route.ts`:
  - POST endpoint accepting message + conversation history
  - Streaming response using Claude API
  - Rate limit check before processing
  - Error handling for API failures

### 5.2 — Frontend
- [ ] Create `hooks/useChat.ts`:
  - Message state management (user + assistant messages)
  - Streaming response handler
  - Loading state
  - Error state
  - Rate limit tracking (client-side counter)
- [ ] Create `components/ai-chat/ChatBubble.tsx`:
  - Floating button (bottom-right corner)
  - Pulse animation or subtle indicator
  - Click toggles chat window
  - "Ask me anything" tooltip on hover
- [ ] Create `components/ai-chat/ChatWindow.tsx`:
  - Slide-up panel (mobile: full screen, desktop: fixed panel)
  - Header with title + close button
  - Message list (scrollable)
  - Input area at bottom
  - Disclaimer at top
- [ ] Create `components/ai-chat/ChatMessage.tsx`:
  - User messages (right-aligned, accent background)
  - Assistant messages (left-aligned, surface background)
  - Typing indicator during streaming
- [ ] Create `components/ai-chat/ChatInput.tsx`:
  - Text input + send button
  - Disabled state when rate limited
  - "Press Enter to send" hint
- [ ] Create `components/ai-chat/ChatDisclaimer.tsx`:
  - "AI-powered — based on Junmar's documented experience"
  - Small, non-intrusive

### 5.3 — Integration
- [ ] Add chat provider/context to root layout
- [ ] Test with 20+ questions covering:
  - Technical skills ("Does he know Kubernetes?")
  - Experience ("What kind of teams has he led?")
  - Availability ("Is he open to contract work?")
  - Architecture ("How would he design a multi-tenant system?")
  - Edge cases ("Can he cook?" → polite redirect)
- [ ] Verify rate limiting triggers correctly
- [ ] Verify streaming works on mobile

**Done when:** Chat opens/closes smoothly, answers are accurate and on-brand, rate limiting works, streaming renders character-by-character, mobile UX is good.

---

## Phase 6: SEO & Polish

### 6.1 — SEO
- [ ] Create `components/seo/MetaTags.tsx` — reusable per-page meta component
- [ ] Create `components/seo/JsonLd.tsx` — structured data (Person + WebSite schema)
- [ ] Add metadata to all pages:
  - Home: "Junmar Jose | Software Architect, Technical Lead & Full Stack Engineer"
  - Case Studies: individual titles with project names
  - Playbook: "The Playbook — Architecture Decisions by Junmar Jose"
  - About: "About Junmar Jose — Software Architect & Technical Lead"
- [ ] Create `app/sitemap.ts` — auto-generated sitemap
- [ ] Create `app/robots.ts` — robots.txt
- [ ] Create or source OG image (`public/og-image.png`) — 1200x630, dark themed with name + tagline

### 6.2 — Animations
- [ ] Add Framer Motion `fade-in-up` animation to each homepage section (staggered)
- [ ] Add smooth transition on role filter change (content reorder)
- [ ] Add expand/collapse animation on architecture decision cards
- [ ] Add subtle hover effects on cards and buttons
- [ ] Ensure `prefers-reduced-motion` is respected (disable animations)

### 6.3 — Performance
- [ ] Run Lighthouse audit — target > 90 on all 4 metrics
- [ ] Optimize images: use `next/image` for all images
- [ ] Ensure fonts don't cause layout shift (use `display: swap` or `next/font`)
- [ ] Verify no unnecessary client-side JS on static pages

### 6.4 — Responsive QA
- [ ] Test on iPhone SE (375px) — all content readable, chat usable
- [ ] Test on iPad (768px) — 2-column grids work
- [ ] Test on MacBook (1440px) — full layout, generous spacing
- [ ] Test on 4K (2560px) — content doesn't stretch, max-width constrains

### 6.5 — Accessibility
- [ ] All images have alt text
- [ ] Color contrast meets WCAG AA (both dark and light mode)
- [ ] Keyboard navigation works for all interactive elements
- [ ] Chat is keyboard accessible
- [ ] Role filter is screen-reader friendly

**Done when:** Lighthouse > 90, all pages have proper meta, animations are smooth and respectful, responsive on all sizes, accessible.

---

## Phase 7: Deploy

### 7.1 — Environment Setup
- [ ] Create Vercel project linked to repo
- [ ] Add environment variable: `ANTHROPIC_API_KEY`
- [ ] Configure custom domain (if available)

### 7.2 — Pre-Launch Checks
- [ ] All pages load without errors
- [ ] AI chat works in production (API key valid, rate limiting active)
- [ ] Role filter persists via URL params (shareable links work)
- [ ] Resume PDF downloads correctly
- [ ] All external links (LinkedIn, GitHub, email) work
- [ ] OG image renders correctly when sharing on LinkedIn/Twitter

### 7.3 — Launch
- [ ] Deploy to Vercel
- [ ] Verify production build
- [ ] Share URL for feedback

**Done when:** Site is live, AI chat works, all links work, shareable URLs render correctly on social media.

---

## Phase 8: Post-Launch

- [ ] Gather feedback from 2-3 recruiters
- [ ] Gather feedback from 1-2 engineering peers
- [ ] Check: does any section unintentionally brand you as "e-commerce only"?
- [ ] Add Vercel Analytics or Plausible
- [ ] Write remaining architecture decisions (target: 7-10 total)
- [ ] Add 5th case study if identified
- [ ] Begin v2 planning: Projects Panel (Hire Me OS style)
