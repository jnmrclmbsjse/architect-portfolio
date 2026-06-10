# AI Chat: Architecture and Cost Analysis

## Overview

The portfolio site includes an AI-powered chat widget where visitors can ask questions about Junmar's experience, projects, and technical approach. The AI speaks in first person as Junmar, grounded entirely in documented experience from `content/ai-knowledge.json`. It never fabricates information.

## Architecture

```
Browser (ChatBubble)
  └─ useChat hook (manages messages, streaming, errors)
       └─ POST /api/chat  { message, history[] }
            ├─ Rate limit check (in-memory, by IP)
            ├─ Mock mode check (ENABLE_AI_CHAT env var)
            └─ Anthropic SDK → claude-sonnet-4-6 (streaming)
                 └─ ReadableStream → chunked text back to browser
```

### Data Flow Per Message

1. User types a message and hits Send (or Enter)
2. `useChat` hook appends the user message to local state
3. Frontend POSTs to `/api/chat` with `{ message, history }` where `history` is the last 18 messages
4. API route checks rate limit by IP (20 messages per hour)
5. If `ENABLE_AI_CHAT=false`, returns lorem ipsum immediately (no Anthropic call)
6. Otherwise, calls `anthropic.messages.create()` with `stream: true`
7. System prompt is rebuilt on every request via `buildSystemPrompt()`
8. API streams text chunks back as a `ReadableStream`
9. Frontend reads chunks via `reader.read()` and updates the assistant message in real time
10. Rate limit remaining count is returned via `X-RateLimit-Remaining` header

## File Reference

| File | Purpose |
|------|---------|
| `lib/ai/client.ts` | Anthropic SDK singleton. Reads `ANTHROPIC_API_KEY` from env automatically. |
| `lib/ai/system-prompt.ts` | Builds the full system prompt by serializing `content/ai-knowledge.json` with behavioral rules. |
| `lib/ai/rate-limiter.ts` | In-memory rate limiter. Map keyed by IP, 20 messages per 1-hour sliding window. |
| `app/api/chat/route.ts` | Next.js API route. POST handler with validation, rate limiting, streaming response. |
| `hooks/useChat.ts` | Client-side hook. Manages message state, streaming, loading/error/rate-limit states, abort controller. |
| `components/ai-chat/ChatBubble.tsx` | Floating button (bottom-right) + auto-peek greeting. Owns the `useChat` instance so state persists across open/close. |
| `components/ai-chat/ChatWindow.tsx` | Chat panel with header, message list, input. Receives chat state as props from ChatBubble. |
| `components/ai-chat/ChatMessage.tsx` | Renders user and assistant messages. Assistant messages go through `react-markdown` for formatting. |
| `components/ai-chat/ChatInput.tsx` | Textarea + Send button. Enter to send, Shift+Enter for newline. Disabled when loading or rate-limited. |
| `components/ai-chat/ChatDisclaimer.tsx` | One-liner: "AI-powered, responses based on Junmar's documented experience." |
| `content/ai-knowledge.json` | The single source of truth for everything the AI can say. 199 lines covering personal info, career history, projects, technical opinions, and leadership style. |

## Environment Variables

| Variable | Values | Purpose |
|----------|--------|---------|
| `ANTHROPIC_API_KEY` | `sk-ant-...` | Required for real API calls. SDK reads it automatically. |
| `ENABLE_AI_CHAT` | `true` (default) / `false` | When `false`, the API returns lorem ipsum without calling Anthropic. Use during development to avoid spending credits. |

Changing either variable requires a dev server restart.

## The System Prompt

The system prompt is the most important piece of this feature. It defines who the AI is, what it can say, and how it behaves.

### Structure

```
[Identity]       "You are Junmar Jose, a software architect..."
[Rules]          10 behavioral rules (see below)
[Knowledge Base] Full JSON dump of ai-knowledge.json, sectioned by category
```

### Behavioral Rules

1. Speak in first person ("I designed...", "In my experience...")
2. Only reference experience, projects, skills, and opinions from the knowledge base
3. If asked about something not covered, say so honestly
4. Never invent or fabricate projects, companies, skills, or metrics
5. Keep responses concise: 2-4 sentences for simple questions, longer for architecture discussions
6. Be professional but personable
7. Politely redirect off-topic questions (cooking, sports, personal life)
8. Draw from real project experience when discussing technical topics
9. Never use em dashes
10. Do not use markdown formatting (write plain conversational text)

### Why the Knowledge Base is Serialized as JSON

The entire `ai-knowledge.json` file is serialized with `JSON.stringify(section, null, 2)` directly into the system prompt. This is intentional:

- JSON is unambiguous. The AI cannot misinterpret structured data.
- Pretty-printed JSON (with indentation) is easy for the model to parse.
- Each section is labeled with a markdown heading (`### Personal`, `### Projects`, etc.) so the model can locate relevant data quickly.
- The knowledge base is small enough (~4,100 tokens) that this is not a cost concern.

### What the Knowledge Base Contains

- **Personal**: Name, location, availability, languages, education, honors
- **Experience summary**: Aggregate stats (9+ years, 8+ platforms, 30+ webshops, team of 11)
- **Experience**: 7 job entries with company, role, period, highlights, stack
- **Projects**: 5 detailed project entries with problem/solution/outcome/stack/roles
- **Technical opinions**: 7 opinionated positions with reasoning (e-commerce, Scrum, architecture)
- **Leadership**: Management style, scope management, conflict resolution, philosophy
- **About**: Career narrative, current focus, differentiator

## Cost Analysis

### Pricing (claude-sonnet-4-6)

| | Per 1M tokens | Per 1K tokens |
|---|---|---|
| Input | $3.00 | $0.003 |
| Output | $15.00 | $0.015 |

### Per-Request Cost Breakdown

Every API call sends:

| Component | Estimated tokens | Sent every request? | Why? |
|-----------|-----------------|---------------------|------|
| System prompt | ~4,100 | Yes | Anthropic's Messages API is stateless. There is no session. Every request must include the full system prompt. |
| Conversation history | 0-3,600 (grows) | Yes | The API has no memory between requests. The full conversation must be replayed so the model has context for the current message. We cap at 18 messages (~200 tokens each avg). |
| Current user message | ~20-50 | Yes | The new message being asked. |
| **Total input** | **~4,150-7,750** | | |
| Assistant response | ~100-300 | - | Output tokens are more expensive ($15/1M vs $3/1M). |

### Cost Per Conversation

A typical 10-message conversation (5 user + 5 assistant exchanges):

| Message # | Input tokens (cumulative) | Output tokens | Input cost | Output cost |
|-----------|--------------------------|---------------|------------|-------------|
| 1 | ~4,150 | ~200 | $0.012 | $0.003 |
| 2 | ~4,550 | ~200 | $0.014 | $0.003 |
| 3 | ~4,950 | ~200 | $0.015 | $0.003 |
| 4 | ~5,350 | ~200 | $0.016 | $0.003 |
| 5 | ~5,750 | ~200 | $0.017 | $0.003 |
| **Total** | | | **~$0.074** | **~$0.015** |
| | | | **Grand total: ~$0.09** | |

A 10-message conversation costs roughly 9 cents. A 20-message conversation (hitting the rate limit) costs roughly 25 cents.

### Monthly Cost Estimate

| Scenario | Visitors/mo | Avg messages | Monthly cost |
|----------|-------------|--------------|--------------|
| Low traffic | 50 | 5 | ~$2.25 |
| Medium traffic | 200 | 5 | ~$9 |
| High traffic | 500 | 8 | ~$36 |

These are cheap. The system prompt dominates the input cost, but at ~4,100 tokens it's manageable.

### Why the System Prompt Must Be Sent Every Time

Anthropic's Messages API is **stateless**. There is no concept of a session, thread, or persistent conversation on the server side. Every `messages.create()` call is independent. The API does not remember what you sent 30 seconds ago. This means:

1. The **system prompt** (identity + rules + knowledge base) must be included in every request
2. The **full conversation history** must be included in every request so the model knows what was already discussed
3. You pay for the system prompt tokens on every single message

This is how all LLM APIs work (OpenAI, Anthropic, Google). There is no way around it without a fundamentally different architecture.

### What Anthropic Caches Automatically

Anthropic has a feature called **prompt caching**. When the same system prompt is sent repeatedly within a short window, Anthropic may cache it server-side and charge a reduced rate for the cached portion. This happens automatically for system prompts over 1,024 tokens. Our system prompt (~4,100 tokens) qualifies. When caching kicks in:

- First request: full price ($3/1M input tokens)
- Subsequent requests within ~5 minutes: cached tokens cost $0.30/1M (90% discount)

This means in practice, a multi-message conversation where messages come within 5 minutes of each other will have the system prompt cached after the first message, reducing cost significantly.

## Rate Limiting

### Current Implementation

- **In-memory** `Map<string, { count, resetAt }>` keyed by IP address
- **20 messages per hour** per IP
- Resets when the 1-hour window expires
- Counter increments before the API call, not after
- Remaining count sent to client via `X-RateLimit-Remaining` response header

### Limitations

- **Resets on deploy**: Since the Map is in-memory, deploying a new version clears all rate limit state. On Vercel, each serverless function invocation may also have its own memory space, making the in-memory approach unreliable.
- **IP-based**: Users behind the same NAT/VPN share a limit. Conversely, users can bypass it by switching networks.
- **No client-side persistence**: The client tracks `remaining` in React state, but this resets on page refresh.

## Auto-Peek Greeting

The chat bubble shows an auto-peek greeting 3 seconds after the first page load:

> "Got questions about my work or experience? Ask away, I'm happy to chat."

- Stays visible for 10 seconds, then fades out
- Only shows once per browser session (tracked via `sessionStorage` key `portfolio-chat-peeked`)
- Clicking it opens the chat window
- Respects `prefers-reduced-motion` (fades instead of sliding)

## Input Validation

The API route validates all incoming data before processing:

- **Message length**: Max 500 characters. Returns 400 if exceeded.
- **Message type**: Must be a non-empty string. Returns 400 if missing.
- **History validation**: Every entry in the `history` array must have a valid `role` (`"user"` or `"assistant"`), a string `content` field, and content length under 2,000 characters. Returns 400 if any entry is invalid.

## Suggested Starter Questions

When the chat window opens with no messages, three clickable starter questions are shown:

1. "What's your experience with e-commerce integrations?"
2. "How do you approach leading engineering teams?"
3. "Tell me about a challenging architecture decision."

Clicking a question calls `sendMessage()` directly, triggering a real API call.

## State Management

Chat state (`useChat` hook) lives in `ChatBubble`, which is always mounted in the layout. This means:

- **Closing and reopening the chat window** preserves the conversation (ChatWindow mounts/unmounts but state stays in ChatBubble)
- **Navigating between pages** preserves the conversation (messages are persisted in `sessionStorage` and restored on mount)
- **Refreshing the page** preserves the conversation within the same browser session
- **Closing the tab** clears the conversation (`sessionStorage` is tab-scoped)
- **Clicking "Clear"** removes messages from both React state and `sessionStorage`
- **Client-side history cap**: Max 40 messages stored. When exceeded, the oldest messages are dropped.

## Improvements: Now vs Later

### Fix Before Production

1. **Rate limiter won't work on Vercel**: Vercel serverless functions don't share memory. The in-memory Map will be empty on each cold start. Options:
   - Use Vercel KV (Redis, free tier: 3,000 req/day) for rate limit state
   - Use an edge middleware with Vercel's built-in rate limiting
   - Accept the limitation for now (the 20-message client-side counter still provides soft limiting in the UI)

### Improve Later

2. **Prompt caching optimization**: We could explicitly use Anthropic's prompt caching API (`cache_control` parameter) to guarantee the system prompt is cached rather than relying on automatic caching. This would save ~$0.01 per message after the first.

3. **Smaller system prompt**: The knowledge base is serialized as pretty-printed JSON with `null, 2` indentation. Switching to `JSON.stringify(kb)` (no indentation) would save ~30% of whitespace tokens (~1,200 tokens). For even more savings, we could summarize the knowledge base into prose instead of raw JSON, or only include sections relevant to common question categories.

4. **Smarter history truncation**: Currently we send the last 18 messages. We could summarize older messages into a condensed context, reducing input tokens for long conversations while preserving context.

5. **Mobile keyboard handling**: On mobile, the soft keyboard pushes the viewport up. The chat window may need `visualViewport` API adjustments to stay properly positioned.

6. **Analytics**: Track which questions visitors ask most frequently. This data could inform which content to add to the knowledge base, or which questions to surface as suggestions.

7. **Model fallback**: If Claude is down or rate-limited on Anthropic's side, we currently return a generic 500 error. A friendlier fallback message or retry mechanism would improve reliability.
