---
name: Junmar Jose Portfolio
description: AI-native portfolio for a hands-on architect who still ships code
colors:
  oxblood: "#7F1D1D"
  oxblood-bright: "#DC2626"
  clean-white: "#FFFFFF"
  surface-light: "#F5F5F4"
  edge-light: "#E7E5E4"
  ink-dark: "#1C1917"
  muted-ink-light: "#78716C"
  deep-stone: "#0C0A09"
  surface-dark: "#1C1917"
  edge-dark: "#292524"
  ink-light: "#FAFAF9"
  muted-ink-dark: "#A8A29E"
  system-green: "#10B981"
  system-orange: "#EA580C"
typography:
  display:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.625rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  sm: "4.8px"
  md: "6.4px"
  lg: "8px"
  xl: "11.2px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.oxblood}"
    textColor: "{colors.clean-white}"
    rounded: "{rounded.lg}"
    padding: "0 10px"
    height: "32px"
  button-primary-hover:
    backgroundColor: "color-mix(in oklch, {colors.oxblood}, transparent 20%)"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.lg}"
    padding: "0 10px"
    height: "32px"
  button-ghost-hover:
    backgroundColor: "{colors.surface-light}"
  badge-secondary:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
    height: "20px"
  card-default:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.xl}"
    padding: "16px"
---

# Design System: Junmar Jose Portfolio

## 1. Overview

**Creative North Star: "The Hands-on Builder"**

A leader who still loves the craft of writing code. The visual system communicates technical authority through restraint and precision, not through decoration or spectacle. Every design decision mirrors what the portfolio says about its author: clear thinking, clean execution, deliberate choices.

The system is light-first: clean white canvas with warm stone neutrals and a single oxblood accent. Light mode is the default because it reads as confident and open, not hiding behind dark-mode drama. The oxblood accent is personal and deliberate, immediately distinguishing this portfolio from the saturated dark-blue-tech aesthetic. Dark mode is supported as a toggle, using a brighter red variant for contrast.

This system explicitly rejects: generic dev portfolio templates (skill bars, project grids, "About Me" hero sections), corporate/enterprise aesthetic (gradients, stock photos), playful creative aesthetics (bright colors, emojis), and AI-generated landing page patterns (gradient text, hero metrics, identical card grids, cream backgrounds, section eyebrows).

**Key Characteristics:**
- Light-first with a distinctive oxblood accent
- Warm stone neutrals create cohesion with the red
- Borders define space; shadows are absent
- Information density is high but never cramped
- Typography carries hierarchy through weight and scale, not color variety
- Motion is present but invisible: it serves transitions, never draws attention to itself

## 2. Colors: The Oxblood Palette

A restrained palette. Clean white provides the canvas; a single deep red marks what matters. Color is used as signal, not as decoration. The warmth in the stone neutrals subtly echoes the red without tipping into cream/beige territory.

### Primary
- **Oxblood** (#7F1D1D): The brand color. Deep burgundy that reads as premium and deliberate. Used in light mode for interactive elements (buttons, links, focus rings) and emphasis points. 10:1 contrast ratio on white.
- **Oxblood Bright** (#DC2626): The dark-mode variant. Same red family, shifted brighter for legibility on dark surfaces. ~5:1 contrast on stone-950.

### Neutral
- **Clean White** (#FFFFFF): Default page background. The primary canvas.
- **Surface Light** (#F5F5F4): Card backgrounds, elevated containers in light mode. Stone-100: warm gray, not cool zinc.
- **Edge Light** (#E7E5E4): Borders, dividers in light mode. Stone-200.
- **Ink Dark** (#1C1917): Primary text in light mode. Stone-900: warm near-black.
- **Muted Ink Light** (#78716C): Secondary text, descriptions in light mode. Stone-500.
- **Deep Stone** (#0C0A09): Page background in dark mode. Stone-950.
- **Surface Dark** (#1C1917): Card backgrounds in dark mode. Stone-900.
- **Edge Dark** (#292524): Borders in dark mode. Stone-800.
- **Ink Light** (#FAFAF9): Primary text in dark mode. Stone-50.
- **Muted Ink Dark** (#A8A29E): Secondary text in dark mode. Stone-400.

### System
- **System Green** (#10B981): Success states, confidence indicators.
- **System Orange** (#EA580C): Error states, destructive actions. Orange-red to avoid confusion with the oxblood brand accent.

### Named Rules
**The One Accent Rule.** Oxblood is the only saturated brand color. If a new element "needs color," it doesn't. It needs hierarchy via size, weight, or position. Oxblood marks interaction and emphasis; everything else is neutral.

## 3. Typography

**Display Font:** Sora (with system-ui, sans-serif fallback)
**Body Font:** Inter (with system-ui, sans-serif fallback)
**Label/Mono Font:** JetBrains Mono (with monospace fallback)

**Character:** Sora brings geometric precision with a human touch at display sizes. Its slight softness prevents the technical-portfolio-as-terminal cliche. Inter disappears at body sizes, which is the point: the content speaks, not the typeface. JetBrains Mono is reserved strictly for code snippets, tech tags, and metadata labels, not as decoration.

### Hierarchy
- **Display** (Sora, 700, clamp(2rem, 5vw, 3.75rem), line-height 1.1, -0.02em tracking): Page-level headings only. The hero `h1` and section titles.
- **Headline** (Sora, 600, clamp(1.5rem, 3vw, 2.25rem), line-height 1.2, -0.01em tracking): Section subheadings, card titles in prominent positions.
- **Title** (Sora, 500, 1.125rem, line-height 1.4): Card headings, subsection titles, navigation labels.
- **Body** (Inter, 400, 1rem/1.6): All prose. Max line length 65-75ch.
- **Label** (JetBrains Mono, 400, 0.625rem, +0.02em tracking): Tech tags, badges, metadata, timestamps. The monospace signals "data" vs "prose."

### Named Rules
**The Mono Boundary Rule.** JetBrains Mono never appears at body size or above. It marks small structured data (tags, versions, dates), not headings or prose. The moment mono creeps into headings, the site looks like a terminal cosplay.

## 4. Elevation

This system is flat by design. Depth is communicated through tonal layering (background → surface → elevated surface) and structural borders, not through shadows.

Cards use `ring-1 ring-foreground/10` in light mode and dark mode alike. This creates visible containment without the visual weight of a drop shadow. The navbar uses `backdrop-blur-sm` for depth on scroll, with a bottom border.

### Named Rules
**The No-Shadow Rule.** Shadows are not part of this system's vocabulary. Elevation is expressed through background-color stepping and border presence. If a new element "needs" a shadow, it needs a background-color shift instead.

## 5. Components

### Buttons
- **Shape:** Rounded-lg (8px radius). Decisive but not pill-shaped.
- **Primary:** Oxblood background, white text. Height 32px, horizontal padding 10px. Compact and purposeful.
- **Hover:** Oxblood at 80% opacity (subtle feedback, no color shift).
- **Focus:** 3px ring in oxblood at 50% opacity, with border-color shift.
- **Ghost:** Transparent background, foreground text. Hover reveals muted surface.
- **Secondary:** Muted background, foreground text. For de-emphasized actions.

### Badges/Tags
- **Style:** Full pill radius (rounded-4xl). Height 20px. Secondary uses muted background.
- **Tech tags (StackTag):** JetBrains Mono at 10px, secondary variant. The monospace + small size signals "structured data."
- **Domain/role badges:** Same pill shape, variant colors for categorization.

### Cards
- **Corner Style:** Rounded-xl (11.2px radius). Slightly softer than buttons to signal "container" vs "action."
- **Background:** Surface color (one step above page background).
- **Border:** ring-1 ring-foreground/10. Structural, not decorative.
- **Internal Padding:** 16px (--card-spacing). Generous enough to breathe, tight enough to feel intentional.
- **No shadows.** Ever.

### Navigation
- **Navbar:** Sticky, 64px height. Background with backdrop-blur on scroll. Bottom border for grounding.
- **Links:** Muted foreground text at 14px. Hover transitions to full foreground color. No underlines, no weight changes.
- **Active state:** Full foreground color (no special indicator needed, the page content confirms location).
- **Mobile:** Sheet slide-out from right. Same link style, stacked vertically.

### Inputs
- **Style:** Border-input color, background transparent. Rounded-lg.
- **Focus:** Ring treatment matching buttons: oxblood ring, border-color shift.
- **Placeholder:** Muted foreground color at same contrast requirements as body text.

### Role Filter (Signature Component)
Dropdown trigger styled as a compact outlined button. The selected role name displays in the trigger; chevron indicates expandability. Menu items are full-width with whitespace-nowrap to prevent text wrapping. This component is the portfolio's primary interactive differentiator.

## 6. Do's and Don'ts

### Do:
- **Do** use borders (ring/border) to define card boundaries, never shadows.
- **Do** let whitespace create section rhythm. Generous padding between sections (96px+), tighter within.
- **Do** use Oxblood exclusively for interactive elements and focal emphasis.
- **Do** keep body text at 65-75ch max width for readability.
- **Do** respect `prefers-reduced-motion` with instant transitions as fallback.
- **Do** use Sora only at title size and above; Inter everywhere else.
- **Do** keep animations under 500ms with ease-out curves (quart/quint). Subtle and purposeful.
- **Do** default to light mode. Dark mode is a toggle, not the identity.

### Don't:
- **Don't** use skill percentage bars, progress rings, or any "rate yourself" UI. Show proof through case studies, not self-assessment graphics.
- **Don't** use stock photography, avatars, or decorative illustrations. The content IS the visual interest.
- **Don't** use gradient text, glassmorphism, or hero-metric templates. These are the AI-generated landing page tells.
- **Don't** use cream/sand/beige backgrounds, em dashes in copy, or eyebrow labels above every section heading.
- **Don't** add multiple accent colors. If something "needs" a second color, it needs better hierarchy instead.
- **Don't** use corporate language ("synergy," "leverage," "solutions") or overly casual copy (emojis, exclamation marks).
- **Don't** use identical card grids with icon + heading + text repeated without variation.
- **Don't** use border-left stripes as decorative accents on cards or callouts.
- **Don't** round cards beyond 12-16px. No 24/32/40px radius on containers.
- **Don't** pair both a border AND a wide drop shadow on the same element.
- **Don't** default to dark mode. The dark-mode-tech aesthetic is saturated; light-first is the identity.
